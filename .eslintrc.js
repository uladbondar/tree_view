module.exports = {
  extends: ['react-app', 'react-app/jest', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
  },
  overrides: [
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
};
