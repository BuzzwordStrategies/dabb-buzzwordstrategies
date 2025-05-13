import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  // Parse URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const bundleID = urlParams.get('bundleID');
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! We've sent a confirmation to your email.
        </p>
        
        <p className="text-gray-600 mb-8">
          Your services will be activated within the next 24-48 hours.
        </p>
        
        <Link 
          to="/" 
          className="inline-block bg-[#FFBA38] hover:bg-[#D4941E] text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Success;