/// <reference types="cypress" />

import { BASEURL } from "../support/e2e";
export class HomePage {
    homeTop: Cypress.Chainable<JQuery<HTMLElement>>;
    developerInto: Cypress.Chainable<JQuery<HTMLElement>>;
    languages: Cypress.Chainable<JQuery<HTMLElement>>;
    framework: Cypress.Chainable<JQuery<HTMLElement>>;
    databases: Cypress.Chainable<JQuery<HTMLElement>>;
    developerTools: Cypress.Chainable<JQuery<HTMLElement>>;
    developerSocials: Cypress.Chainable<JQuery<HTMLElement>>;

    constructor(url: string) {
        cy.visit(url);
        this.homeTop = cy.get("#homeIntro");
        this.developerInto = cy.get("#developerIntro");
        this.languages = cy.get("#development-languages");
        this.framework = cy.get("#development-frameworks");
        this.databases = cy.get("#development-databases");
        this.developerTools = cy.get("#developer-tools");
        this.developerSocials = cy.get("#developerSocial");
    }

    testSkillContainer(skill: Cypress.Chainable<JQuery<HTMLElement>>) {
        skill
            .should("have.length", 3)
            .and("be.visible")
            .find('meter')
            .should('have.attr', 'min', '0')
            .and('have.attr', 'low', '2')
            .and('have.attr', 'high', '4')
            .and('have.attr', 'max', '5')
            .and('have.attr', 'optimum', '5')
    }

    hoverSkillContainer(skill: Cypress.Chainable<JQuery<HTMLElement>>) { 
        skill
            .should('have.css', 'border', '1.7px solid rgba(14, 215, 165, 0.924)')
            .should('have.css', 'list-style', 'none')
            .trigger('mouseover')
            .should('have.css', 'border', '2.2px solid rgba(14, 215, 165, 0.924)')
            .should('have.css', 'transform', 'matrix(1.35, 0, 0, 1.35, 0, 0)')
            .should('have.css', 'background-color', 'rgb(12, 43, 33)')
            .should('have.css', 'box-shadow', '0px 4px 3px 2px rgb(6, 255, 19)')
            .trigger('mouseout')
            .should('have.css', 'border', '1.7px solid rgba(14, 215, 165, 0.924)')
            .should('have.css', 'transform', 'none')
            .should('have.css', 'box-shadow', '0px 2px 3px 3px rgb(36, 94, 36)');
    }
}
