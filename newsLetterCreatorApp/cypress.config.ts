import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {

        // Where your tests are located
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    // Base URL of your Angular app (assuming it runs on localhost:4200)
    baseUrl: 'http://localhost:4200',
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
