/** @format */

/// <reference types="cypress" />

export class ExperiencePage {
  // Main Layout
  pageContainer: () => Cypress.Chainable<JQuery<HTMLElement>>;
  experienceToggle: () => Cypress.Chainable<JQuery<HTMLElement>>;
  toggleExperienceSections: (idx: number) => Cypress.Chainable<JQuery<HTMLElement>>;

  // Education Section
  educationContainer: () => Cypress.Chainable<JQuery<HTMLElement>>;
  educationInto: () => Cypress.Chainable<JQuery<HTMLElement>>;

  degreeContainer: () => Cypress.Chainable<JQuery<HTMLElement>>;
  degreeList: () => Cypress.Chainable<JQuery<HTMLElement>>;

  certificateContainer: () => Cypress.Chainable<JQuery<HTMLElement>>;
  certificationList: () => Cypress.Chainable<JQuery<HTMLElement>>;
  certificationFilter: () => Cypress.Chainable<JQuery<HTMLElement>>;
  filterCertifications: (filterIdx: number, selectionIdx: number) => void;

  // Work Section
  workContainer: () => Cypress.Chainable<JQuery<HTMLElement>>;
  workInto: () => Cypress.Chainable<JQuery<HTMLElement>>; 
  workToggle: () => Cypress.Chainable<JQuery<HTMLElement>>;
  workList: () => Cypress.Chainable<JQuery<HTMLElement>>;


  constructor() {
    // Main Layout
    this.pageContainer = () => {
      return cy.get("#experienceContainer");
    };
    this.experienceToggle = () => { 
      return cy.get("#experienceToggle");
    }
    this.toggleExperienceSections = (idx) => {
      return cy.get("#experienceToggle").children("button").eq(idx).click();
    };


    // Education Section
    this.educationContainer = () => { 
      return cy.get("#educationContainer");
    }
    this.educationInto = () => { 
      return cy.get("#educationIntro");
    }

    this.degreeContainer = () => { 
      return cy.get("#degreeContainer");
    }
    this.degreeList = () => { 
      return cy.get("#degreeList");
    }

    this.certificateContainer = () => { 
      return cy.get("#certificationContainer");
    }
    this.certificationList = () => { 
      return cy.get("#certificationList");
    }
    this.certificationFilter = () => {
      return cy.get("#certificationFilter");
    }
    this.filterCertifications = (fIdx, sIdx) => {
      cy.get("#certificationFilter").children("div").eq(fIdx).children("select").first().select(sIdx);
    }


    // Work Section
    this.workContainer = () => { 
      return cy.get("#workContainer");
    }
    this.workInto = () => { 
      return cy.get("#workIntro");
    }
    this.workToggle = () => { 
      return cy.get("#workToggle");
    }
    this.workList = () => { 
      return cy.get("#workList");
    }
  }
}
