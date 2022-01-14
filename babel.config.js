module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@style': './src/application/style',
          '@asset': './src/application/asset',
          '@reducer': './src/application/reducer',
          '@navigation': './src/application/navigation',
          '@application': './src/application',
          '@common': './src/presentation/common',
          '@presentation': './src/presentation',
          '@swagger/auth': './swagger/auth',
          '@swagger/content': './swagger/content',
        },
      },
    ],
    'react-native-reanimated/plugin', // Reanimated plugin has to be listed last.
  ],
};
