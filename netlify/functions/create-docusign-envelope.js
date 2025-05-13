const docusign = require('docusign-esign');
const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  console.log('DocuSign function called');
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const data = JSON.parse(event.body);
    const { 
      bundleID, 
      bundleName, 
      subLength, 
      finalMonthly, 
      selectedServices, 
      customerEmail, 
      customerName 
    } = data;

    // Validate required fields
    if (!customerEmail || !customerName) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ error: 'Customer email and name are required' }) 
      };
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    // Store pending order in Supabase
    const { error: dbError } = await supabase
      .from('pending_orders')
      .insert({
        bundle_id: bundleID,
        bundle_name: bundleName,
        sub_length: subLength,
        final_monthly: finalMonthly,
        selected_services: selectedServices,
        customer_email: customerEmail,
        customer_name: customerName,
        status: 'pending_signature',
        created_at: new Date().toISOString()
      });

    if (dbError) {
      console.error('Supabase error:', dbError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to store order data' })
      };
    }

    // DocuSign configuration
    const INTEGRATION_KEY = process.env.DOCUSIGN_INTEGRATION_KEY;
    const USER_ID = process.env.DOCUSIGN_USER_ID;
    const ACCOUNT_ID = process.env.DOCUSIGN_ACCOUNT_ID;
    const TEMPLATE_ID = process.env.DOCUSIGN_TEMPLATE_ID;
    const SECRET_KEY = process.env.DOCUSIGN_PRIVATE_KEY.replace(/\\n/g, '\n');
    
    // Use demo or production depending on environment
    const BASE_URL = process.env.NODE_ENV === 'production' 
      ? 'https://www.docusign.net/restapi'
      : 'https://demo.docusign.net/restapi';

    // Create DocuSign API client
    const dsApiClient = new docusign.ApiClient();
    dsApiClient.setBasePath(BASE_URL);
    
    // Configure JWT authentication
    dsApiClient.setOAuthBasePath(process.env.NODE_ENV === 'production' 
      ? 'account.docusign.com' 
      : 'account-d.docusign.com');
    
    // Get JWT access token
    try {
      const jwtToken = await dsApiClient.requestJWTUserToken(
        INTEGRATION_KEY,
        USER_ID,
        'signature',
        SECRET_KEY,
        3600
      );
      
      const accessToken = jwtToken.body.access_token;
      dsApiClient.addDefaultHeader('Authorization', 'Bearer ' + accessToken);
    } catch (authError) {
      console.error('DocuSign authentication error:', authError);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'DocuSign authentication failed', 
          details: authError.message 
        })
      };
    }
    
    // Create envelope definition
    const envelopeDefinition = new docusign.EnvelopeDefinition();
    envelopeDefinition.templateId = TEMPLATE_ID;
    envelopeDefinition.status = 'sent';
    
    // Create tabs for the template
    const textTabs = [
      { tabLabel: 'bundleID', value: bundleID || '' },
      { tabLabel: 'bundleName', value: bundleName || 'Custom Bundle' },
      { tabLabel: 'subLength', value: subLength.toString() || '3' },
      { tabLabel: 'finalMonthly', value: finalMonthly || '0.00' },
      { tabLabel: 'selectedServices', value: selectedServices || '' }
    ];
    
    // Create template role with customer details
    const signer = new docusign.TemplateRole();
    signer.roleName = 'Client'; // Must match the role in your DocuSign template
    signer.email = customerEmail;
    signer.name = customerName;
    signer.clientUserId = bundleID; // Use bundle ID for embedded signing
    signer.tabs = { textTabs: textTabs };
    
    // Add the signer to the envelope
    envelopeDefinition.templateRoles = [signer];
    
    // Create the Envelopes API instance
    const envelopesApi = new docusign.EnvelopesApi(dsApiClient);
    
    // Create the envelope
    try {
      const envelopeResult = await envelopesApi.createEnvelope(ACCOUNT_ID, { envelopeDefinition });
      
      // Update Supabase with envelope ID
      await supabase
        .from('pending_orders')
        .update({ docusign_envelope_id: envelopeResult.envelopeId })
        .eq('bundle_id', bundleID);
      
      // Create a recipient view for embedded signing
      const returnUrl = `${process.env.URL || 'https://www.buzzwordstrategies.com'}/.netlify/functions/docusign-success?bundleID=${bundleID}`;
      
      const viewRequest = new docusign.RecipientViewRequest();
      viewRequest.returnUrl = returnUrl;
      viewRequest.authenticationMethod = 'none';
      viewRequest.email = customerEmail;
      viewRequest.userName = customerName;
      viewRequest.clientUserId = bundleID;
      
      const recipientViewResult = await envelopesApi.createRecipientView(
        ACCOUNT_ID, 
        envelopeResult.envelopeId, 
        { recipientViewRequest: viewRequest }
      );

      return {
        statusCode: 200,
        body: JSON.stringify({ url: recipientViewResult.url })
      };
    } catch (envelopeError) {
      console.error('DocuSign envelope error:', envelopeError);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Failed to create DocuSign envelope', 
          details: envelopeError.message 
        })
      };
    }
  } catch (error) {
    console.error('General error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'An unexpected error occurred', 
        details: error.message 
      })
    };
  }
};