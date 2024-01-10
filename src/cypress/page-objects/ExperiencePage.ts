/** @format */

/// <reference types="cypress" />

export class ExperiencePage {
  // Main Layout
  pageContainer: () => Cypress.Chainable<JQuery<HTMLElement>>;
  getCardContainer: (idx: number) => Cypress.Chainable<JQuery<HTMLElement>>;


  constructor() {
    // Main Layout
    this.pageContainer = () => {
      return cy.get("#experienceContainer");
    };
    this.getCardContainer = (idx: number) => {
      return this.pageContainer().children("article").eq(idx);
    };
  }
}
