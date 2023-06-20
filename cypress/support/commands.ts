/** @format */

/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************


// Education Page Commands
Cypress.Commands.add(
  "getDegreeImg",
  { prevSubject: true },
  (subject: Cypress.Chainable<JQuery<HTMLLIElement>>) => {
    return subject.find("a").first().find("img").first();
  }
);
Cypress.Commands.add(
  "getDegreeCard",
  { prevSubject: true },
  (subject: Cypress.Chainable<JQuery<HTMLLIElement>>) => {
    return subject.find("div").first();
  }
);


declare global {
  namespace Cypress {
    interface Chainable {
      // Education Page
      getDegreeImg(): Chainable<JQuery<HTMLImageElement>>;
      getDegreeCard(): Chainable<JQuery<HTMLDivElement>>;
    }
  }
}

export {};
