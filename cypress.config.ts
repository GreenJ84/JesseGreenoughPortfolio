/** @format */

import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  responseTimeout: 10000,
  pageLoadTimeout: 10000,
  video: true,
  videoUploadOnPasses: false,
  videosFolder: "cypress/videos",
  screenshotsFolder: "cypress/screenshots",
  fixturesFolder: "cypress/fixtures",
  chromeWebSecurity: false,
  env: {
    NODE_TLS_REJECT_UNAUTHORIZED: "0"
  },
  numTestsKeptInMemory: 5,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000/",
    specPattern: "cypress/e2e/**/*.cy.{ts,tsx}",
    excludeSpecPattern: "cypress/e2e/examples/*.cy.{ts,tsx}",
    slowTestThreshold: 10000,
    testIsolation: true,
  },
});