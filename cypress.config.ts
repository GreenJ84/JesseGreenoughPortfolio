import { defineConfig } from 'cypress'

export default defineConfig({
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  responseTimeout: 10000,
  pageLoadTimeout: 10000,
  video: true,
  videoUploadOnPasses: false,
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  env: {},
})
