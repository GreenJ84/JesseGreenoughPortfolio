/** @format */

/// <reference types="cypress" />

export class ProjectPage {
  pageContainer: () => Cypress.Chainable<JQuery<HTMLElement>>;
  projectsContainer: () => Cypress.Chainable<JQuery<HTMLElement>>;

  projectsFilter: () => Cypress.Chainable<JQuery<HTMLElement>>;
  filterSelect: (
    filter: number
  ) => Cypress.Chainable<JQuery<HTMLSelectElement>>;
  getFilterOptionsLength: (filter: number) => Promise<number>;
  filterProjects: (filter: number, choice: number) => void;

  projectsTitle: () => Cypress.Chainable<JQuery<HTMLElement>>;
  projectsList: () => Cypress.Chainable<JQuery<HTMLElement>>;
  getProjectsLength: () => Promise<number>;
  projectItem: (idx: number) => Cypress.Chainable<JQuery<HTMLElement>>;

  projectDetailModal: () => Cypress.Chainable<JQuery<HTMLElement>>;
  modalUnderlay: () => Cypress.Chainable<JQuery<HTMLElement>>;
  closeDetailModal: () => void;

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
    this.getFilterOptionsLength = async (filter: number) => {
      return new Promise((resolve) => {
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
            resolve(length);
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
    this.getProjectsLength = async () => {
      return new Promise((resolve) => { 
        cy.get("#projectsList")
          .children("li")
          .its("length")
          .then((length) => {
            expect(length).to.be.greaterThan(0);
            cy.log(`${length} projects`);
            resolve(length);
          });
      })
    }
    this.projectItem = (idx: number) => {
      return cy.get("#projectsList").children().eq(idx);
    };

    this.projectDetailModal = () => {
      return cy.get("#projectDetailModal");
    }
    this.modalUnderlay = () => { 
      return cy.get("#modalUnderlay");
    }
    this.closeDetailModal = () => {
      cy.get("#projectDetailModal").should("be.visible").find("button#modalClose").first().realClick();
    }
  }
}
