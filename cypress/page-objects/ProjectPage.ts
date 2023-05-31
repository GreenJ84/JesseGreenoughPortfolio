/// <reference types="cypress" />

export class ProjectPage {
  pageContainer: () => Cypress.Chainable<JQuery<HTMLElement>>;
  projectsContainer: () => Cypress.Chainable<JQuery<HTMLElement>>;

  projectsFilter: () => Cypress.Chainable<JQuery<HTMLElement>>;
  filterProjects: (filter: number, choice: number) => void;

  projectsTitle: () => Cypress.Chainable<JQuery<HTMLElement>>;
  projectsList: () => Cypress.Chainable<JQuery<HTMLElement>>;
  projectItem: (idx: number) => Cypress.Chainable<JQuery<HTMLElement>>;

  constructor() {
    this.pageContainer = () => {
      return cy.get('#pageContainer');
    }
    this.projectsContainer = () => {
      return cy.get('#projectsContainer');
    }


    this.projectsFilter = () => {
      return cy.get('#projectsFilter');
    }
    this.filterProjects = (fIdx: number, sIdx: number) => {
      cy.get('#projectsFilter').children("div").eq(fIdx).children("select").first().select(sIdx);;
    }


    this.projectsTitle = () => {
      return cy.get('#projectsTitle');
    }
    this.projectsList = () => {
      return cy.get('#projectsList');
    }
    this.projectItem = (idx: number) => {
      cy.get('#projectsList').children().then(($children) => {
        idx %= $children.length;
      });
      return cy.get('#projectsList').children().eq(idx);
    }
  }
}