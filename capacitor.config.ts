import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'conversao-facil',
  webDir: 'dist',
  plugins: {
    AdMob: {
      appId: {
        android: 'ca-app-pub-3940256099942544~3347511713',
        ios: 'ca-app-pub-3940256099942544~1458002511',
      },
    },
  },
};

export default config;
