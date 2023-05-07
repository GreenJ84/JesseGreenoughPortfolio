/** @format */

/// <reference types="cypress" />

import { before } from 'mocha';

import { MainPage } from "../../page-objects/MainPage";
import { BASEURL } from "../../support/e2e";

let mainPage: MainPage;
const setUpStandard = () => {
  cy.viewport(1280, 800);
  cy.visit(BASEURL);
}


describe("Home page Introduction visable and as expected", () => {
  before(() => {
    mainPage = new MainPage()
  });
  beforeEach(setUpStandard);

  //! Move to navigation testing
  // it("home navigation should have all six navigation tags", () => {
  //   cy.get("#nav")
  //     .should("be.visible")
  //     .children()
  //     .should("have.length", 6);
  // });
  it("The Greeting is rendering correctly", () => {
    mainPage.homeTop
      .find("h1")
      .first()
      .should("be.visible")
      .contains("Hi There!")
      .children()
      .should("have.length", 2);
  });

  it("The Developers Name is rendering correctly", () => {
    mainPage.homeTop
      .find("#developerName")
      .should("be.visible")
      .contains("I'M JESSE GREENOUGH")
      .next()
      .children()
      .should("have.length", 3);
  });

  it("The TypeWrite section has all components rendering", () => {
    mainPage.homeTop
      .find("#developerName")
      .should("be.visible")
      .next()
      .children()
      .should("have.length", 3);
  });

  it("The Home developer logo should be correct and visible", () => {
    mainPage.homeTop
      .find("#homeDeveloperLogo")
      .should("be.visible")
      .and("have.attr", "src")
      .and("include", "home-main.svg");
  });

});

describe("Technical Sections are rendering as expected", () => {
  before(() => {
    mainPage = new MainPage();
  });
  beforeEach(setUpStandard);

  it("The Language section titles and lists are rendering correctly", () => {
    mainPage.languages
      .should("be.visible")
      .and("have.length", 2)
      .children()
      .first()
      .should("have.text", "Programming Languages")
      .find("#languages")
      .children()
      .should("have.length", 14);
  });

  it("The Framework section titles and lists are rendering correctly", () => {
    mainPage.framework
      .should("be.visible")
      .and("have.length", 2)
      .children()
      .first()
      .should("have.text", "Programming Frameworks")
      .find("#frameworks")
      .children()
      .should("have.length", 17);
  });

  it("The Database section titles and lists are rendering correctly", () => {
    mainPage.databases
      .should("be.visible")
      .and("have.length", 2)
      .children()
      .first()
      .should("have.text", "Databases")
      .find("#databases")
      .children()
      .should("have.length", 6);
  });

  it("The Developer tools section titles and lists are rendering correctly", () => {
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

describe("Technical Skills blocks are rendering as expected", () => {
  before(() => {
    mainPage = new MainPage()
  });
  beforeEach(setUpStandard);
})

describe("Developer Socials are rendering as expected and missing in the footer", () => {
  before(() => {
    mainPage = new MainPage()
  });
  beforeEach(setUpStandard);
})