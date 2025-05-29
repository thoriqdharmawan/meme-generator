module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@features': './src/features',
          '@contexts': './src/contexts',
          '@constants': './src/constants',
          '@types': './src/types',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
