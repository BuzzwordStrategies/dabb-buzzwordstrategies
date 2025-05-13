import React from 'react';
import { BundleProvider } from '../contexts/BundleContext';
import ServiceSelector from '../components/ServiceSelector';
import TierCards from '../components/TierCards';
import SubscriptionSlider from '../components/SubscriptionSlider';
import CartSummary from '../components/CartSummary';
import OrderSummary from '../components/OrderSummary';
import TierDetailsModal from '../components/TierDetailsModal';

const Builder = () => {
  return (
    <BundleProvider>
      <div className="builder-container">
        <div className="logo-header">
          <img 
            src="https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/ab4663d3-4840-47f0-88cf-a5b1144ed31a/Remove+background+project+%281%29.png?format=1000w" 
            alt="Buzzword Strategies Logo"
          />
        </div>
        
        <CartSummary />
        
        <div className="builder-wrapper">
          <ServiceSelector />
          <TierCards />
          <SubscriptionSlider />
          <OrderSummary />
        </div>
        
        <TierDetailsModal />
      </div>
    </BundleProvider>
  );
};

export default Builder;