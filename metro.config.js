const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@screens': path.resolve(__dirname, 'src/screens'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
