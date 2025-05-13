import React, { useContext } from 'react';
import { BundleContext } from '../contexts/BundleContext';
import { features } from '../utils/productData';

const TierDetailsModal = () => {
  const { isModalOpen, modalService, modalTier, closeTierModal } = useContext(BundleContext);
  
  if (!isModalOpen) return null;
  
  // Define detailed feature descriptions for the modal
  const serviceFeatures = features[modalService]?.[modalTier] || [];
  
  return (
    <div className="tier-modal" style={{ display: isModalOpen ? 'block' : 'none' }}>
      <div className="modal-content">
        <span className="close-modal" onClick={closeTierModal}>&times;</span>
        <div className="modal-header">
          <h2>{modalService} - {modalTier} Tier</h2>
        </div>
        
        <div className="modal-body">
          <p>Detailed features for the {modalTier} tier of {modalService}:</p>
          
          <ul className="feature-list">
            {serviceFeatures.map((feature, index) => (
              <li key={index} className="feature-item">
                <span className="feature-check">✓</span> {feature}
              </li>
            ))}
          </ul>
          
          <p className="modal-note">
            Note: All {modalService} packages include our standard support and regular reporting.
          </p>
        </div>
        
        <button 
          onClick={closeTierModal}
          className="modal-close-btn"
          style={{
            marginTop: '20px',
            padding: '8px 16px',
            background: '#333',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TierDetailsModal;