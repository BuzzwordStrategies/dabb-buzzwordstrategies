import React, { useContext, useEffect, useRef } from 'react';
import { BundleContext } from '../contexts/BundleContext';
import { getSubscriptionDiscount } from '../utils/pricingCalculator';

const SubscriptionSlider = () => {
  const { subscriptionLength, setSubscriptionLength } = useContext(BundleContext);
  const sliderRef = useRef(null);
  
  // Update the slider fill based on the selected value
  useEffect(() => {
    if (sliderRef.current) {
      const percentage = ((subscriptionLength - 3) / 21) * 100;
      sliderRef.current.style.background = `linear-gradient(to right, #FFBA38 0%, #FFBA38 ${percentage}%, #BBBBBB ${percentage}%, #BBBBBB 100%)`;
    }
  }, [subscriptionLength]);
  
  const discount = getSubscriptionDiscount(subscriptionLength);
  
  return (
    <div className="slider-wrap">
      <label htmlFor="subSlider">
        Subscription Length: <span>{subscriptionLength}</span> months –
        <span> {discount}% off</span>
      </label>
      <input
        ref={sliderRef}
        id="subSlider"
        type="range"
        min="3"
        max="24"
        step="3"
        value={subscriptionLength}
        onChange={(e) => setSubscriptionLength(parseInt(e.target.value))}
      />
      <div className="slider-marks">
        <span>3</span>
        <span>12</span>
        <span>24</span>
      </div>
    </div>
  );
};

export default SubscriptionSlider;