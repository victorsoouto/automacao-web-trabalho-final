const { defineConfig } = require("cypress");

const mochawesome = require("cypress-mochawesome-reporter/plugin");

module.exports = defineConfig({
  video: false,
  screenshotOnRunFailure: true,

  reporter: "cypress-mochawesome-reporter",

  reporterOptions: {
    charts: true,
    reportPageTitle: "Automation Exercise - Testes E2E",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },

  e2e: {
    baseUrl: "https://www.automationexercise.com",

    setupNodeEvents(on, config) {
      mochawesome(on);
      return config;
    }
  }
});
