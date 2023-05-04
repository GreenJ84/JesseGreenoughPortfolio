/** @format */

/// <reference types="cypress" />

import { before } from 'mocha';

import { MainPage } from "../../page-objects/MainPage";
import { BASEURL } from "../../support/e2e";


describe("Ensuring HomePage Layout conformity", () => {
  let mainPage: MainPage;
  before(() => {
    cy.visit(BASEURL);
    mainPage = new MainPage()
  });
  
  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.visit(BASEURL);
  });

  it("home navigation should have all six navigation tags", () => {
    cy.get("#nav")
      .should("be.visible")
      .children()
      .should("have.length", 6);
  });

  it("The introdutory titles should be correct and visible", () => {
    mainPage.homeTop
      .find(".HomeTop_homeHeader__m6NJl")
      .should("be.visible")
      .contains("I'M JESSE GREENOUGH")
      .next()
      .children()
      .should("have.length", 3);
  });

  it("The introdutory image should be correct and visible", () => {
    mainPage.homeTop
      .find("#homeDeveloperLogo")
      .should("be.visible")
      .and("have.attr", "src")
      .and("include", "home-main.svg");
  });

  it("The Language section should have the correct number of languages", () => {
    mainPage.languages
      .find("#languages")
      .children()
      .should("have.length", 14);
  });

  it("The Framework section should have the correct number of frameworks", () => {
    mainPage.framework
      .find("#frameworks")
      .children()
      .should("have.length", 17);
  });

  it("The Database section should have the correct number of databases", () => {
    mainPage.databases
      .find("#databases")
      .children()
      .should("have.length", 6);
  });

  it("The Developer tool section should have the correct number of developer tools", () => {
    mainPage.developerTools
      .within(() => {
        cy.get("h1")
          .should("have.text", "Development Tools");

      cy.get("h5")
        .eq(0)
        .contains("Governance/Planning")
        .next()
        .children()
        .should("have.length", 4);

      cy.get("h5")
        .eq(1)
        .contains("Development")
        .next()
        .children()
        .should("have.length", 12);

      cy.get("h5")
        .eq(2)
        .contains("Runtime")
        .next()
        .children()
        .should("have.length", 5);

      cy.get("h5")
        .eq(3)
        .contains("DevOps/Serving")
        .next()
        .children()
        .should("have.length", 9);

      cy.get("h5")
        .eq(4)
        .contains("Extras")
        .next()
        .children()
        .should("have.length", 6);
    });
  });
});
