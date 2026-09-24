import React, { useEffect, useState } from 'react';

import { AdService } from '../services/AdService';
import { AdContext, AdContextType } from './ad-context';

interface AdProviderProps {
  children: React.ReactNode;
}

export const AdProvider: React.FC<AdProviderProps> = ({ children }) => {
  const [showBanner, setShowBanner] = useState(true);
  const [isAdFree, setIsAdFree] = useState(false);

  useEffect(() => {
    const adService = AdService.getInstance();
    adService.initialize();
    setIsAdFree(adService.isAdsDisabled());
    setShowBanner(!adService.isAdsDisabled());
  }, []);

  const value: AdContextType = { showBanner, isAdFree };

  return (
    <AdContext.Provider value={value}>
      {children}
    </AdContext.Provider>
  );
};