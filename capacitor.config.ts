
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.belleza.casa',
  appName: 'app-bellezaV2',
  webDir: 'www',
  plugins: {
    CapacitorFirebaseAuth: {
      providers: ["facebook.com", "phone"],
      languageCode: "es",
      nativeAuth: true,
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#CE0B7C',
    },
    PushNotifications: {
      presentationOptions: ['alert', 'sound'],
    },
  },
};

export default config;
