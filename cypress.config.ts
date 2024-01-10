/** @format */

import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 10000,
  requestTimeout: 5000,
  responseTimeout: 5000,
  pageLoadTimeout: 10000,
  video: true,
  fileServerFolder: "src/",
  videosFolder: "cypress/videos",
  screenshotsFolder: "cypress/screenshots",
  fixturesFolder: "cypress/fixtures",
  chromeWebSecurity: false,
  env: {
    NODE_TLS_REJECT_UNAUTHORIZED: "0",
    // Full spectrum of viewports for testing
    FULL_SPECTRUM: false,
    // Layout tests to run across all pages
    ALL_PAGE: false,
  },
  numTestsKeptInMemory: 5,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000/",
    specPattern: "src/cypress/e2e/**/*.cy.{ts,tsx}",
    excludeSpecPattern: "src/cypress/e2e/examples/*.cy.{ts,tsx}",
    supportFile: "src/cypress/support/e2e.ts",
    slowTestThreshold: 10000,
    testIsolation: false,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  watchForFileChanges: false,
});
