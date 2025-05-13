import React, { useContext } from 'react';
import { BundleContext } from '../contexts/BundleContext';
import { products } from '../utils/productData';

const ServiceSelector = () => {
  const { selectedTiers, currentService, setCurrentService } = useContext(BundleContext);
  
  return (
    <div className="service-tags">
      {products.map(service => (
        <div 
          key={service}
          className={`tag ${service === currentService ? 'active' : ''} ${selectedTiers[service] ? 'selected' : ''}`}
          onClick={() => setCurrentService(service)}
        >
          {service}
        </div>
      ))}
    </div>
  );
};

export default ServiceSelector;