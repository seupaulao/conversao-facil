import { createContext } from 'react';

export interface AdContextType {
  showBanner: boolean;
  isAdFree: boolean;
}

export const AdContext = createContext<AdContextType | undefined>(undefined);