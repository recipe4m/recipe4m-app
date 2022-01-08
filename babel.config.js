module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
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
          '@reducer': './src/application/reducer',
          '@navigation': './src/application/navigation',
          '@application': './src/application',
          '@presentation/common': './src/presentation/common',
          '@presentation': './src/presentation',
        },
      },
    ],
  ],
};
