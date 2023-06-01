/** @format */

/// <reference types="cypress" />

export class ProjectPage {
  pageContainer: () => Cypress.Chainable<JQuery<HTMLElement>>;
  projectsContainer: () => Cypress.Chainable<JQuery<HTMLElement>>;

  projectsFilter: () => Cypress.Chainable<JQuery<HTMLElement>>;
  filterSelect: (
    filter: number
  ) => Cypress.Chainable<JQuery<HTMLSelectElement>>;
  getFilterLength: (filter: number) => Promise<number>;
  filterProjects: (filter: number, choice: number) => void;

  projectsTitle: () => Cypress.Chainable<JQuery<HTMLElement>>;
  projectsList: () => Cypress.Chainable<JQuery<HTMLElement>>;
  projectItem: (idx: number) => Cypress.Chainable<JQuery<HTMLElement>>;

  constructor() {
    this.pageContainer = () => {
      return cy.get("#pageContainer");
    };
    this.projectsContainer = () => {
      return cy.get("#projectsContainer");
    };

    this.projectsFilter = () => {
      return cy.get("#projectsFilter");
    };
    this.filterSelect = (filter: number) => {
      return cy
        .get("#projectsFilter")
        .children("div")
        .eq(filter)
        .children("select")
        .first();
    };
    this.getFilterLength = async (filter: number) => {
      return new Promise((resolve) => {
        let filterLength = 0;
        cy.get("#projectsFilter")
          .children("div")
          .eq(filter)
          .children("select")
          .first()
          .children("option")
          .its("length")
          .then((length) => {
            expect(length).to.be.greaterThan(0);
            cy.log(`${length} projects selected`);
            filterLength = length;
            expect(filterLength).to.be.greaterThan(0);
            resolve(filterLength);
          });
      });
    };
    this.filterProjects = (filter: number, sIdx: number) => {
      cy.get("#projectsFilter")
        .children("div")
        .eq(filter)
        .children("select")
        .first()
        .select(sIdx);
    };

    this.projectsTitle = () => {
      return cy.get("#projectsTitle");
    };
    this.projectsList = () => {
      return cy.get("#projectsList");
    };
    this.projectItem = (idx: number) => {
      cy.get("#projectsList")
        .children()
        .then(($children) => {
          idx %= $children.length;
        });
      return cy.get("#projectsList").children().eq(idx);
    };
  }
}
