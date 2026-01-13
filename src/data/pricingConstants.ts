export type PriceConfig = {
  basePrice: number;
  label: string;
  description?: string;
};

export type PricingStructure = {
  services: Record<string, PriceConfig>;
  projectTypes: Record<string, PriceConfig>;
  features: Record<string, PriceConfig>;
};

export const PRICING_CONFIG: PricingStructure = {
  services: {
    web: {
      label: 'Web Development',
      basePrice: 1000, // Starting at "$Spark" package level
      description: 'Professional websites and web applications',
    },
    mobile: {
      label: 'Mobile App',
      basePrice: 5000, // Starting at "$Orbit" package level
      description: 'Native iOS and Android applications',
    },
    backend: {
      label: 'Backend / API',
      basePrice: 4000,
      description: 'Scalable server-side infrastructure',
    },
    other: {
      label: 'Consulting / Other',
      basePrice: 2000,
      description: 'Specialized consulting or custom solutions',
    },
  },
  projectTypes: {
    // Web Project Types
    'Marketing/Landing': { label: 'Marketing Website', basePrice: 500 },
    'E-commerce': { label: 'E-commerce Store', basePrice: 3500 },
    'SaaS / Web App': { label: 'SaaS Platform', basePrice: 4500 },
    'Blog/CMS': { label: 'Blog / CMS', basePrice: 1200 },

    // Mobile Project Types
    'iOS': { label: 'iOS App', basePrice: 500 }, // Added on top of base mobile
    'Android': { label: 'Android App', basePrice: 500 },
    'Tablet': { label: 'Tablet Optimization', basePrice: 1000 },
    'Wearables': { label: 'Wearable App', basePrice: 2000 },

    // Backend/Other Project Types
    'API Development': { label: 'API Development', basePrice: 1500 },
    'Database Design': { label: 'Database Architecture', basePrice: 1000 },
    'Cloud Setup': { label: 'Cloud Infrastructure', basePrice: 1000 },
    'Security Audit': { label: 'Security Audit', basePrice: 2000 },
  },
  features: {
    // Core Features
    'User Authentication': { label: 'User Authentication', basePrice: 1200 },
    'Push Notifications': { label: 'Push Notifications', basePrice: 800 },
    'Payments': { label: 'Payment Integration', basePrice: 2000 },
    'Admin Dashboard': { label: 'Admin Dashboard', basePrice: 2500 },
    'Analytics': { label: 'Advanced Analytics', basePrice: 800 },
    'Social Integration': { label: 'Social Media Integration', basePrice: 600 },
    
    // Advanced Features
    'Map / Location': { label: 'Maps & Geolocation', basePrice: 1500 },
    'File Uploads': { label: 'File Upload & Storage', basePrice: 1000 },
    'Camera / Media': { label: 'Camera & Media Manipulation', basePrice: 1500 },
    'Bluetooth / BLE': { label: 'Bluetooth / BLE', basePrice: 3000 },
    'Offline Mode': { label: 'Offline Capabilities', basePrice: 2000 },
    'Chat / Messaging': { label: 'Real-time Chat', basePrice: 3500 },
    'AI Integration': { label: 'AI / LLM Integration', basePrice: 4000 },
    'Calendar / Booking': { label: 'Calendar & Booking System', basePrice: 2500 },
  },
};

/**
 * Helper to calculate estimated range based on selections
 */
export const calculateEstimate = (
  serviceType: string,
  projectTypes: string[],
  selectedFeatures: string[]
) => {
  let min = 0;
  
  // 1. Base Service Price
  if (serviceType && PRICING_CONFIG.services[serviceType]) {
    min += PRICING_CONFIG.services[serviceType].basePrice;
  }

  // 2. Project Types
  projectTypes.forEach(type => {
    if (PRICING_CONFIG.projectTypes[type]) {
      min += PRICING_CONFIG.projectTypes[type].basePrice;
    }
  });

  // 3. Features (First 3 cheapest are free)
  const sortedFeatures = [...selectedFeatures].sort((a, b) => {
    const priceA = PRICING_CONFIG.features[a]?.basePrice || 0;
    const priceB = PRICING_CONFIG.features[b]?.basePrice || 0;
    return priceA - priceB;
  });

  sortedFeatures.forEach((feature, index) => {
    if (PRICING_CONFIG.features[feature]) {
      // First 3 features are included (free)
      if (index >= 3) {
        min += PRICING_CONFIG.features[feature].basePrice;
      }
    }
  });

  // Calculate Max (typically 20% buffer for complexity)
  const max = Math.round(min * 1.2);

  return { min, max };
};
