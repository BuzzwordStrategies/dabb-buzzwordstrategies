import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Checkout Canceled</h1>
        
        <p className="text-gray-600 mb-8">
          No worries! You can modify your bundle and try again whenever you're ready.
        </p>
        
        <Link 
          to="/" 
          className="inline-block bg-[#FFBA38] hover:bg-[#D4941E] text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Return to Bundle Builder
        </Link>
      </div>
    </div>
  );
};

export default Cancel;