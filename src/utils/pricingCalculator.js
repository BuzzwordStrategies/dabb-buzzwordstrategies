import { pricing } from './productData';

// Bundle discount based on number of services
export const getBundleDiscount = (serviceCount) => {
  if (serviceCount <= 1) return 0;
  if (serviceCount === 2) return 1;
  if (serviceCount === 3) return 2.5;
  if (serviceCount === 4) return 4;
  if (serviceCount === 5) return 5.5;
  if (serviceCount === 6) return 7;
  if (serviceCount === 7) return 8.5;
  return 10; // 8 or more services
};

// Subscription length discount
export const getSubscriptionDiscount = (months) => {
  if (months === 3) return 0;
  if (months === 6) return 2;
  if (months === 9) return 3.5;
  if (months === 12) return 5;
  if (months === 15) return 6.5;
  if (months === 18) return 8;
  if (months === 21) return 9;
  if (months === 24) return 10;
  return 0;
};

// Calculate final price
export const calculateFinalPrice = (selectedTiers, subscriptionLength) => {
  const selectedServices = Object.entries(selectedTiers).filter(([_, tier]) => tier);
  const serviceCount = selectedServices.length;
  
  // Calculate base price
  const basePrice = selectedServices.reduce(
    (sum, [service, tier]) => sum + pricing[service][tier], 
    0
  );
  
  // Apply discounts
  const bundleDiscount = getBundleDiscount(serviceCount);
  const subDiscount = getSubscriptionDiscount(subscriptionLength);
  
  // Calculate final price
  const afterBundleDiscount = basePrice * (1 - bundleDiscount / 100);
  const finalPrice = afterBundleDiscount * (1 - subDiscount / 100);
  
  return {
    basePrice,
    bundleDiscount,
    subDiscount,
    finalPrice,
    savings: basePrice - finalPrice
  };
};