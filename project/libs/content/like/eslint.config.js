const baseConfig = require('../../../eslint.config');

module.exports = [
  ...baseConfig,
  {
    files: ['**/like.repository.ts'],
    rules: {
      camelcase: 'off',
    },
  },
];
