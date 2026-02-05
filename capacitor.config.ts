import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.pokerai.app',
    appName: 'Poker AI & Game Locator',
    webDir: 'dist',
    server: {
        androidScheme: 'https'
    }
};

export default config;
