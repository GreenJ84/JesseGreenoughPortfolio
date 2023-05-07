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

  it("The Github card is being displayed", () => {
    cy.get("#githubCard")
      .should("be.visible")
      .children()
      .should("have.length", 2)
      .first()
      .should("have.text", "Days I Code")
      .next()
      .should("be.visible")
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

  it("The Technical skills containers in the languages section works correctly", () => { 
    mainPage.languages
      .should("be.visible")
      .find("#languages")
      .children()
      .eq(Math.floor(Math.random() * 14))
      .should("have.length", 3)
      .and("be.visible");
  })

  it("The Technical skills containers in the frameworks section works correctly", () => { 
    mainPage.framework
      .should("be.visible")
      .find("#frameworks")
      .children()
      .eq(Math.floor(Math.random() * 17))
      .should("have.length", 3)
      .and("be.visible");
  })

  it("The Technical skills containers in the databases section works correctly", () => { 
    mainPage.databases
      .should("be.visible")
      .find("#databases")
      .children()
      .eq(Math.floor(Math.random() * 6))
      .should("have.length", 3)
      .and("be.visible");
  })

  it("The Technical skills containers in the developer tools section works correctly", () => {
    mainPage.developerTools
      .within(() => {
        cy.get("ul")
          .eq(0)
          .children()
          .eq(Math.floor(Math.random() * 4))
          .should("have.length", 3)
          .and("be.visible");

        cy.get("ul")
          .eq(1)
          .children()
          .eq(Math.floor(Math.random() * 12))
          .should("have.length", 3)
          .and("be.visible");

        cy.get("ul")
          .eq(2)
          .children()
          .eq(Math.floor(Math.random() * 5))
          .should("have.length", 3)
          .and("be.visible");

        cy.get("ul")
          .eq(3)
          .children()
          .eq(Math.floor(Math.random() * 9))
          .should("have.length", 3)
          .and("be.visible");

        cy.get("ul")
          .eq(4)
          .children()
          .eq(Math.floor(Math.random() * 6))
          .should("have.length", 3)
          .and("be.visible");
      });
  })
})

describe("Developer Socials are rendering as expected and missing in the footer", () => {
  before(() => {
    mainPage = new MainPage()
  });
  beforeEach(setUpStandard);

  it("The Developer Socials section component and title are rendering correctly", () => { 
    mainPage.developerSocials
      .should("be.visible")
      .and("have.length", 2)
      .find("p")
      .should("have.length", 2)
      .and("have.text", "Feel free to connect with me!");
  })

  it("The Developer Socials section list, logos, and links are rendering", () => {
    mainPage.developerSocials
      .find("ul")
      .within(() => {
        cy.get("li")
          .should("have.length", 4)
          .eq(0)
          .find("a")
          .should("have.attr", "href")
          .and("include", "https://www.linkedin.com")
          .children()
          .should("have.length", 1)
        
        cy.get("li")
          .eq(1)
          .find("a")
          .should("have.attr", "href")
          .and("include", "https://twitter.com")
          .children()
          .should("have.length", 1)
        
        cy.get("li")
          .eq(3)
          .find("a")
          .should("have.attr", "href")
          .and("include", "https://www.linkedin.com")
          .children()
          .should("have.length", 1)
        
        cy.get("li")
          .eq(4)
          .find("a")
          .should("have.attr", "href")
          .and("include", "https://www.instagram.com")
          .children()
          .should("have.length", 1)
      })
  });
})