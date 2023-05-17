/** @format */

/// <reference types="cypress" />

export class HomePage {
  homeTop: Function;
  developerInto: Function;
  languages: Function;
  framework: Function;
  databases: Function;
  developerTools: Function;
  developerSocials: Function;

  constructor() {
    this.homeTop = () => {
      return cy.get("#homeIntro");
    };
    this.developerInto = () => {
      return cy.get("#developerIntro");
    };
    this.languages = () => {
      return cy.get("#development-languages");
    };
    this.framework = () => {
      return cy.get("#development-frameworks");
    };
    this.databases = () => {
      return cy.get("#development-databases");
    };
    this.developerTools = () => {
      return cy.get("#developer-tools");
    };
    this.developerSocials = () => {
      return cy.get("#developerSocial");
    };
  }

  testSkillContainer(skill: Cypress.Chainable<JQuery<HTMLElement>>) {
    skill.should("be.visible").children().should("have.length", 3);

    skill
      .eq(2)
      .should("have.attr", "min", "0")
      .and("have.attr", "low", "2")
      .and("have.attr", "high", "4")
      .and("have.attr", "max", "5")
      .and("have.attr", "optimum", "5");
  }

  testSkillContainerStyle(skill: Cypress.Chainable<JQuery<HTMLElement>>) {
    skill
      .should("have.css", "position", "relative")
      .and("have.css", "display", "flex")
      .and("have.css", "flex-direction", "column")
      .and("have.css", "align-items", "center")
      .and("have.css", "justify-content", "center")
      .and("have.css", "text-align", "center")
      .and("have.css", "list-style", "outside none none");
  }
}
