import { AdMob, AdMobRewardItem, BannerAdOptions, BannerAdPosition, BannerAdSize, RewardAdOptions } from '@capacitor-community/admob';

const BANNER_AD_UNIT_ID = 'ca-app-pub-3940256099942544/6300978111';  // Test ID
const REWARDED_AD_UNIT_ID = 'ca-app-pub-3940256099942544/5224354917';  // Test ID

const CONVERSION_COUNT_KEY = 'conversionCount';
const AD_FREE_UNTIL_KEY = 'adFreeUntil';

export class AdService {
  private static instance: AdService;
  private isAdFree = false;
  private conversionCount = 0;
  private onRewardCallback?: () => void;
  private onShowRewardedCallback?: () => void;

  private constructor() {
    this.loadState();
  }

  static getInstance(): AdService {
    if (!AdService.instance) {
      AdService.instance = new AdService();
    }
    return AdService.instance;
  }

  setOnRewardCallback(callback: () => void) {
    this.onRewardCallback = callback;
  }

  setOnShowRewardedCallback(callback: () => void) {
    this.onShowRewardedCallback = callback;
  }

  async initialize() {
    await AdMob.initialize();
    this.checkAdFreeStatus();
    if (!this.isAdFree) {
      this.showBanner();
    }
  }

  private loadState() {
    this.conversionCount = parseInt(localStorage.getItem(CONVERSION_COUNT_KEY) || '0', 10);
    const adFreeUntil = parseInt(localStorage.getItem(AD_FREE_UNTIL_KEY) || '0', 10);
    this.isAdFree = Date.now() < adFreeUntil;
  }

  private saveState() {
    localStorage.setItem(CONVERSION_COUNT_KEY, this.conversionCount.toString());
    localStorage.setItem(AD_FREE_UNTIL_KEY, (this.isAdFree ? Date.now() + 60 * 60 * 1000 : '0').toString());
  }

  private checkAdFreeStatus() {
    const adFreeUntil = parseInt(localStorage.getItem(AD_FREE_UNTIL_KEY) || '0', 10);
    this.isAdFree = Date.now() < adFreeUntil;
    if (!this.isAdFree) {
      this.showBanner();
    } else {
      this.hideBanner();
    }
  }

  private async showBanner() {
    const options: BannerAdOptions = {
      adId: BANNER_AD_UNIT_ID,
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      isTesting: true,
    };
    await AdMob.showBanner(options);
  }

  private async hideBanner() {
    await AdMob.hideBanner();
  }

  incrementConversion() {
    if (this.isAdFree) return;
    this.conversionCount++;
    this.saveState();
    if (this.conversionCount % 7 === 0) {
      this.onShowRewardedCallback?.();
    }
  }

  showRewardedAd() {
    this.prepareRewardedAd();
  }

  private async prepareRewardedAd() {
    const options: RewardAdOptions = {
      adId: REWARDED_AD_UNIT_ID,
      isTesting: true,
    };
    try {
      await AdMob.prepareRewardVideoAd(options);
      await AdMob.showRewardVideoAd();
    } catch (error) {
      console.error('Rewarded ad failed:', error);
    }
  }

  grantReward() {
    this.isAdFree = true;
    this.conversionCount = 0;
    this.saveState();
    this.hideBanner();
    this.onRewardCallback?.();
  }

  isAdsDisabled(): boolean {
    return this.isAdFree;
  }
}