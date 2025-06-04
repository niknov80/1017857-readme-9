const baseConfig = require('../../../eslint.config');

module.exports = [
  ...baseConfig,
  {
    files: ['**/user-subscription.repository.ts'],
    rules: {
      camelcase: 'off',
    },
  },
];
