import React, { useContext } from 'react';
import { BundleContext } from '../contexts/BundleContext';

const CartSummary = () => {
  const { selectedTiers, finalPrice } = useContext(BundleContext);
  
  const selectedServices = Object.entries(selectedTiers)
    .filter(([_, tier]) => tier);
  
  return (
    <div className="top-cart-summary">
      <div className="cart-items">
        {selectedServices.length === 0 ? (
          <div className="empty-cart">No services selected yet</div>
        ) : (
          selectedServices.map(([service, tier]) => (
            <div key={service} className="cart-item">
              {service}: {tier}
            </div>
          ))
        )}
      </div>
      <div className="cart-total">${finalPrice.toFixed(2)} / month</div>
    </div>
  );
};

export default CartSummary;