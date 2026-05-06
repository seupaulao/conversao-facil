import React, { createContext, useContext, useEffect, useState } from 'react';

import { AdService } from '../services/AdService';

interface AdContextType {
  showBanner: boolean;
  conversionCount: number;
  isAdFree: boolean;
  showRewardedModal: () => void;
  showSuccessModal: () => void;
}

const AdContext = createContext<AdContextType | undefined>(undefined);

export const useAdContext = () => {
  const context = useContext(AdContext);
  if (!context) {
    throw new Error('useAdContext must be used within an AdProvider');
  }
  return context;
};

interface AdProviderProps {
  children: React.ReactNode;
}

export const AdProvider: React.FC<AdProviderProps> = ({ children }) => {
  const [showBanner, setShowBanner] = useState(true);
  const [conversionCount, setConversionCount] = useState(0);
  const [isAdFree, setIsAdFree] = useState(false);
  const [showRewardedModalFlag, setShowRewardedModalFlag] = useState(false);
  const [showSuccessModalFlag, setShowSuccessModalFlag] = useState(false);

  useEffect(() => {
    const adService = AdService.getInstance();
    adService.initialize();
    setIsAdFree(adService.isAdsDisabled());
    setShowBanner(!adService.isAdsDisabled());
  }, []);

  const showRewardedModal = () => {
    setShowRewardedModalFlag(true);
  };

  const showSuccessModal = () => {
    setShowSuccessModalFlag(true);
  };

  const value: AdContextType = {
    showBanner,
    conversionCount,
    isAdFree,
    showRewardedModal,
    showSuccessModal,
  };

  return (
    <AdContext.Provider value={value}>
      {children}
    </AdContext.Provider>
  );
};