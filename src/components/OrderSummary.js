import React, { useContext, useState } from 'react';
import { BundleContext } from '../contexts/BundleContext';

const OrderSummary = () => {
  const { selectedTiers, finalPrice, savings, bundleName, setBundleName } = useContext(BundleContext);
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePurchase = async () => {
    setIsLoading(true);
    
    try {
      // Get user details
      const customerName = prompt('Please enter your name:');
      const customerEmail = prompt('Please enter your email:');
      
      if (!customerName || !customerEmail) {
        alert('Name and email are required to proceed.');
        setIsLoading(false);
        return;
      }
      
      // Generate bundle ID
      const bundleID = "bwb-" + Date.now() + "-" + Math.random().toString(36).substring(2, 9);
      
      // Format the selected services for DocuSign
      const selectedServices = Object.entries(selectedTiers)
        .filter(([_, tier]) => tier)
        .map(([service, tier]) => `${service}: ${tier}`)
        .join(', ');
      
      // Call the DocuSign function
      const response = await fetch('/.netlify/functions/create-docusign-envelope', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bundleID,
          bundleName: bundleName || 'My Bundle',
          subLength: subscriptionLength,
          finalMonthly: finalPrice.toFixed(2),
          selectedServices,
          customerName,
          customerEmail
        })
      });
      
      const data = await response.json();
      
      if (data.url) {
        // Redirect to DocuSign
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create DocuSign envelope');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message || 'Something went wrong'}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const noServicesSelected = Object.keys(selectedTiers).filter(service => selectedTiers[service]).length === 0;
  
  return (
    <div className="summary">
      <div className="summary-price">${finalPrice.toFixed(2)}</div>
      <div className="summary-label">Final Monthly Price</div>
      {savings > 0 && (
        <div className="savings-bubble">You're saving ${savings.toFixed(2)} per month</div>
      )}
      
      <input
        id="bundleName"
        type="text"
        placeholder="Name your bundle"
        value={bundleName}
        onChange={(e) => setBundleName(e.target.value)}
      />
      
      <button 
        className="buy-button" 
        onClick={handlePurchase}
        disabled={isLoading || noServicesSelected}
      >
        {isLoading ? 'Processing...' : 'Buy My Bundle'}
      </button>
    </div>
  );
};

export default OrderSummary;