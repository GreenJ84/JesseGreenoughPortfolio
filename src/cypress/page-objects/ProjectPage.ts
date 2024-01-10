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
  openDetailModal: (item: Cypress.Chainable<JQuery<HTMLElement>>) => void;
  closeDetailModal: () => void;

  constructor() {
    this.pageContainer = () => {
      return cy.get("#pageContainer");
    };

    this.projectsFilter = () => {
      return cy.get("#projectsFilter");
    };
    this.filterSelect = (filter) => {
      return cy
        .get("#projectsFilter")
        .children("div")
        .eq(filter)
        .children("select")
        .first();
    };
    this.getFilterOptionsLength = async (filter) => {
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
    this.filterProjects = (filter, sIdx) => {
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
    this.getProjectsLength = () => {
      return new Promise((resolve) => {
        cy.get("#projectsList")
          .children("li")
          .its("length")
          .then((length) => {
            expect(length).to.be.greaterThan(0);
            cy.log(`${length} projects`);
            resolve(length);
          });
      });
    };
    this.projectItem = (idx) => {
      return cy.get("#projectsList").children().eq(idx);
    };

    this.projectDetailModal = () => {
      return cy.get("#projectDetailModal");
    };
    this.modalUnderlay = () => {
      return cy.get("#modalUnderlay");
    };
    this.openDetailModal = (itemCard) => {
      itemCard
        .children()
        .first()
        .realHover({ position: "center", scrollBehavior: "center" })
        .wait(4000)
        .find("#projectDetailCard")
        .should("be.visible")
        .first()
        .children("button")
        .first()
        .realClick({ position: "center", scrollBehavior: "center" })
        .wait(2000);
    };

    this.closeDetailModal = () => {
      cy.get("#projectDetailModal")
        .should("be.visible")
        .find("button#modalClose")
        .first()
        .realClick();
    };
  }
}
