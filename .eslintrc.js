module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    curly: [0, 'multi-or-nest'],
    'prettier/prettier': ['error', { endOfLine: 'auto ' }],
  },
  globals: {
    NodeJS: true,
  },
};
