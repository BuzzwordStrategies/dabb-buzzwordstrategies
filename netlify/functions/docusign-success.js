const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  console.log('DocuSign success function called');

  // Get query parameters from the URL
  const { bundleID } = event.queryStringParameters;

  if (!bundleID) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Bundle ID is required' }),
    };
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    // Retrieve bundle data from Supabase using bundleID
    const { data: orderData, error } = await supabase
      .from('pending_orders')
      .select('*')
      .eq('bundle_id', bundleID)
      .single();

    if (error || !orderData) {
      console.error('Supabase retrieval error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to retrieve order data' }),
      };
    }

    // Update order status in Supabase
    await supabase
      .from('pending_orders')
      .update({ status: 'signed' })
      .eq('bundle_id', bundleID);

    // Extract necessary data from Supabase response
    const { 
      bundle_name, 
      final_monthly, 
      sub_length, 
      selected_services, 
      customer_email 
    } = orderData;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: customer_email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            recurring: { interval: 'month' },
            unit_amount: Math.round(parseFloat(final_monthly) * 100), // Convert to cents
            product_data: {
              name: bundle_name || 'Custom Bundle',
              description: `${sub_length}-month subscription | ${selected_services}`,
              metadata: { bundleID },
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.URL || 'https://www.buzzwordstrategies.com'}/success?bundleID=${bundleID}`,
      cancel_url: `${process.env.URL || 'https://www.buzzwordstrategies.com'}/cancel`,
    });

    // Redirect to Stripe checkout
    return {
      statusCode: 303,
      headers: {
        Location: session.url,
      },
      body: '',
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || 'Failed to create checkout session',
      }),
    };
  }
};