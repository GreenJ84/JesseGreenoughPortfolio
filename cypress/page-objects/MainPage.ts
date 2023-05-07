/// <reference types="cypress" />

import { BASEURL } from "../support/e2e";
export class MainPage{
    homeTop: Cypress.Chainable<JQuery<HTMLElement>>;
    homeDesctription: Cypress.Chainable<JQuery<HTMLElement>>;
    languages: Cypress.Chainable<JQuery<HTMLElement>>;
    framework: Cypress.Chainable<JQuery<HTMLElement>>;
    databases: Cypress.Chainable<JQuery<HTMLElement>>;
    developerTools: Cypress.Chainable<JQuery<HTMLElement>>;
    socialSection: Cypress.Chainable<JQuery<HTMLElement>>;

    constructor() {
        cy.visit(BASEURL);
        this.homeTop = cy.get("#homeIntro");
        this.homeDesctription = cy.get("#developerIntro");
        this.languages = cy.get("#development-languages");
        this.framework = cy.get("#development-frameworks");
        this.databases = cy.get("#development-databases");
        this.developerTools = cy.get("#developer-tools");
        this.socialSection = cy.get("#developerSocial");
    }
}
