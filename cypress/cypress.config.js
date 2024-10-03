import { TEST_URL } from '../constants';

const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: TEST_URL,
  },
})