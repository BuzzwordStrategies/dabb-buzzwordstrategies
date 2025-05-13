import React, { createContext, useState, useEffect } from 'react';
import { calculateFinalPrice } from '../utils/pricingCalculator';
import { products } from '../utils/productData';

export const BundleContext = createContext();

export const BundleProvider = ({ children }) => {
  // State variables
  const [selectedTiers, setSelectedTiers] = useState({});
  const [currentService, setCurrentService] = useState(products[0]);
  const [subscriptionLength, setSubscriptionLength] = useState(3);
  const [bundleName, setBundleName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState('');
  const [modalTier, setModalTier] = useState('');
  
  // Load saved bundle from localStorage on initial render
  useEffect(() => {
    const saved = localStorage.getItem('buzzwordBundle');
    if (saved) {
      try {
        const { selectedTiers: savedTiers, subLength, bundleName } = JSON.parse(saved);
        setSelectedTiers(savedTiers || {});
        setSubscriptionLength(subLength || 3);
        setBundleName(bundleName || '');
        
        // Set first selected service as current, or first in list if none selected
        const firstSelectedService = Object.keys(savedTiers || {}).find(s => products.includes(s));
        setCurrentService(firstSelectedService || products[0]);
      } catch (e) {
        console.error("Error loading saved bundle:", e);
      }
    }
  }, []);
  
  // Save bundle to localStorage when it changes
  useEffect(() => {
    // Calculate final price
    const { finalPrice } = calculateFinalPrice(selectedTiers, subscriptionLength);
    
    const bundleData = {
      selectedTiers,
      subLength: subscriptionLength,
      bundleName,
      finalMonthly: parseFloat(finalPrice.toFixed(2))
    };
    
    localStorage.setItem('buzzwordBundle', JSON.stringify(bundleData));
  }, [selectedTiers, subscriptionLength, bundleName]);
  
  // Update tier selection
  const updateTier = (service, tier) => {
    setSelectedTiers(prev => ({
      ...prev,
      [service]: tier === prev[service] ? null : tier
    }));
  };
  
  // Open the tier details modal
  const openTierModal = (service, tier) => {
    setModalService(service);
    setModalTier(tier);
    setIsModalOpen(true);
  };
  
  // Close the tier details modal
  const closeTierModal = () => {
    setIsModalOpen(false);
  };
  
  // Get pricing and discount information
  const pricingInfo = calculateFinalPrice(selectedTiers, subscriptionLength);
  
  return (
    <BundleContext.Provider 
      value={{
        selectedTiers,
        updateTier,
        currentService,
        setCurrentService,
        subscriptionLength,
        setSubscriptionLength,
        bundleName,
        setBundleName,
        isModalOpen,
        modalService,
        modalTier,
        openTierModal,
        closeTierModal,
        ...pricingInfo
      }}
    >
      {children}
    </BundleContext.Provider>
  );
};