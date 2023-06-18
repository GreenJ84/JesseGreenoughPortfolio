/** @format */

/// <reference types="cypress" />

export class EducationPage {
  pageContainer: () => Cypress.Chainable<JQuery<HTMLElement>>;
  degreeContainer: () => Cypress.Chainable<JQuery<HTMLElement>>;
  degreeList: () => Cypress.Chainable<JQuery<HTMLElement>>;
  certificationContainer: () => Cypress.Chainable<JQuery<HTMLElement>>;

  constructor() {
    this.pageContainer = () => cy.get("#educationContainer");
    this.degreeContainer = () => cy.get("#degreeContainer");
    this.degreeList = () => cy.get("#degreeList");
    this.certificationContainer = () => cy.get("#certificationContainer");
  }
}

// Degree
Cypress.Commands.add(
  "getDegreeImg",
  { prevSubject: true },
  (subject: Cypress.Chainable<JQuery<HTMLLIElement>>) => {
    return subject.children("a").first();
  }
);
Cypress.Commands.add(
  "getDegreeCard",
  { prevSubject: true },
  (subject: Cypress.Chainable<JQuery<HTMLLIElement>>) => {
    return subject.children("div").first();
  }
);
