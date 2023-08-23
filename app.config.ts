import type { ConfigContext, ExpoConfig } from '@expo/config';

// import { ClientEnv, Env } from './env';
import { ClientEnv } from './env';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'expo-base',
  // ... the rest config
  slug: 'expo-base',
  version: '1.0.0',
  orientation: 'default',
  icon: './src/assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './src/assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    // bundleIdentifier: Env.BUNDLE_ID,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './src/assets/adaptive-icon.png',
      backgroundColor: '#fff',
    },
  },
  extra: {
    ...ClientEnv,
  },
  // .. sentry config and other stuff here
});
