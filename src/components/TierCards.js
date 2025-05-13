import React, { useContext } from 'react';
import { BundleContext } from '../contexts/BundleContext';
import { pricing, features, logos } from '../utils/productData';

const TierCards = () => {
  const { currentService, selectedTiers, updateTier, openTierModal } = useContext(BundleContext);
  
  if (!currentService) return null;
  
  const tiers = ["Base", "Standard", "Premium"];
  
  return (
    <div className="tier-row">
      {tiers.map(tier => {
        const isSelected = selectedTiers[currentService] === tier;
        const serviceFeatures = features[currentService]?.[tier] || ["", "", ""];
        
        return (
          <div 
            key={tier}
            className={`tier-card ${isSelected ? 'selected' : ''}`}
            onClick={() => updateTier(currentService, tier)}
          >
            <button 
              className="tier-details-btn"
              onClick={(e) => {
                e.stopPropagation();
                openTierModal(currentService, tier);
              }}
            >
              i
            </button>
            
            <img 
              src={logos[currentService][tier]} 
              alt={`${currentService} ${tier}`}
              style={{
                maxWidth: '60px',
                filter: tier === 'Standard' ? 'drop-shadow(0 0 12px #FFBA38)' : 'none'
              }}
            />
            
            <h3>{tier}</h3>
            <div className="tier-price">${pricing[currentService][tier]}</div>
            
            <div className="features">
              {serviceFeatures.map((feature, idx) => (
                <span key={idx} style={{ color: '#FFBA38' }}>
                  ✓ {feature}
                </span>
              ))}
            </div>
            
            <span 
              className="view-details-text"
              onClick={(e) => {
                e.stopPropagation();
                openTierModal(currentService, tier);
              }}
            >
              View all features
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TierCards;