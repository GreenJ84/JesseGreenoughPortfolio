/** @format */

/// <reference types="cypress" />

export class EducationPage {
  getPageContainer: () => Cypress.Chainable<JQuery<HTMLElement>>;

  getDegreeContainer: () => Cypress.Chainable<JQuery<HTMLElement>>;
  getDegreeList: () => Cypress.Chainable<JQuery<HTMLElement>>;

  getCertificationContainer: () => Cypress.Chainable<JQuery<HTMLElement>>;
  getCertificationFilters: () => Cypress.Chainable<JQuery<HTMLElement>>;
  getCertificationFilter: (filterIdx: number) => Cypress.Chainable<JQuery<HTMLSelectElement>>;
  getFilterOptionsLength: (filter: number) => Promise<number>;
  filterCertifications: (filterIdx: number, selectionIdx: number) => void;
  getCertificationList: () => Cypress.Chainable<JQuery<HTMLElement>>;

  constructor() {
    this.getPageContainer = () => cy.get("#educationContainer");

    this.getDegreeContainer = () => cy.get("#degreeContainer");
    this.getDegreeList = () => cy.get("#degreeList");

    this.getCertificationContainer = () => cy.get("#certificationContainer");

    this.getCertificationFilters = () => cy.get("#certificationFilters");

    this.getCertificationFilter = (filterIdx: number) => this.getCertificationFilters().children("div").eq(filterIdx).children("select").first();

    this.getFilterOptionsLength = async (filterIdx: number) => {
      return new Promise((resolve) => {
        this.getCertificationFilters()
          .children("div")
          .eq(filterIdx)
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
    this.filterCertifications = (filterIdx: number, selectionIdx: number) => {
      this.getCertificationFilters()
        .children("div")
        .eq(filterIdx)
        .children("select")
        .first()
        .select(selectionIdx);
    };

    this.getCertificationList = () => cy.get("#certificationList");
  }
}
