/** @format */

/// <reference types="cypress" />

import { HomePage } from "../page-objects/HomePage";
import { BASEURL, viewports, setUpStandard } from "../support/e2e";

let homePage: HomePage;
const HOMEURL = `${BASEURL}/`;

describe("Home Page render testing at all viewport sizes", () => {
  before(() => {
    homePage = new HomePage();
    cy.window().then((win) => {
      win.localStorage.setItem("theme", "dark");
    });
  });
  // let viewport = viewports[0]
  viewports.forEach((viewport) => {
    describe(`Home page Introduction visable and rendering as expected at size: ${
      typeof viewport == "string"
        ? viewport
        : `${viewport.width} x ${viewport.height}`
    }`, () => {
      before(() => setUpStandard(viewport));
      beforeEach(() => { cy.visit(HOMEURL); cy.wait(1000); });

      //! Move to navigation testing
      // it("home navigation should have all six navigation tags", () => {
      //   cy.get("#nav")
      //     .should("be.visible")
      //     .children()
      //     .should("have.length", 6);
      // });

      it("Main Page greeting section is rendering correctly", () => {
        homePage.homeTop()
          .children()
          .should("have.length", 2)
          .first()
          .children()
          .should("have.length", 3)
        
        homePage.homeTop()
          .children()
          .last()
          .children()
          .should("have.length", 1)
      });

      it("Main Page greeting section has the correct css and image background rendering", () => {
        homePage.homeTop()
          .should("have.css", "z-index", "-1")
          .and("have.css", "background-size", "cover, cover")
          .and("have.css", "background-repeat", "no-repeat, no-repeat")
          .and("have.css", "background-position", "50% 0%, 50% 0%")
          .and("have.css", "background-image")
          .and("contain", `url("${BASEURL}/assets/home-bg.jpg")`)
      });

      it("The Titles are rendering correctly", () => {
        homePage.homeTop()
          .children()
          .first()
          .find("h1")
          .first()
          .children()
          .should("have.length", 1);

        homePage.homeTop()
          .children()
          .first()
          .find("h1")
          .last()
          .children()
          .should("have.length", 1);
      });

      it("The Developers Name is rendering correctly", () => {
        homePage.homeTop()
          .children()
          .first()
          .find("#developerName")
          .should("be.visible")
          .contains("I'M JESSE GREENOUGH")
      });

      it("The TypeWrite section has all components rendering", () => {
        homePage.homeTop()
          .children()
          .first()
          .find("div")
          .first()
          .should("be.visible")
          .children()
          .should("have.length", 3);
      });

      it("The Home developer logo should be correct and visible", () => {
        homePage.homeTop()
          .children()
          .last()
          .find("#homeDeveloperLogo")
          .should("be.visible")
          .and("have.attr", "src", "/assets/home-main.svg");
      });
    });

    describe(`The Developer's Introduction section is rendering correctly at size: at size: ${
      typeof viewport == "string"
        ? viewport
        : `${viewport.width} x ${viewport.height}`
      }`, () => {
      before(() => setUpStandard(viewport));
      beforeEach(() => { cy.visit(HOMEURL); cy.wait(1000); });

      it("The Developer's Introduction section has all components rendering", () => {
        homePage.developerInto()
          .should("be.visible")
          .children()
          .should("have.length", 3);
      });

      it("The Developer's intro Title is rendering correctly", () => {
        homePage.developerInto()
          .find("h2")
          .should("be.visible")
          .and("have.length", 1)
          .and("contain", "LET ME INTRODUCE MYSELF")
          .children()
          .should("have.length", 1);
      });
      
      it("The Developer's intro Image is rendering correctly", () => { 
        homePage.developerInto()
          .children()
          .eq(1)
          .should("be.visible")
          .children()
          .should("have.length", 1)
          .first()
          .should("be.visible")
          .and("have.attr", "src", "/assets/avatar.svg")
          .and("have.attr", "alt", "Human Avatar Icon");
      });

      it("The Developer's intro Text is rendering correctly", () => { 
        homePage.developerInto()
          .find("p")
          .should("be.visible")
          .should('contain', 'Coding Dojo')
          .should('contain', 'TypeScript')
          .should('contain', 'JavaScript')
          .should('contain', 'Python')
          .should('contain', 'Rust')
          .should('contain', 'Java')
          .should('contain', 'React.js')
          .should('contain', 'Next.js')
          .find("b")
          .should("have.length", 11)
      });
    });

    describe(`Each Technical Section is rendering and as expected at size: ${
      typeof viewport == "string"
        ? viewport
        : `${viewport.width} x ${viewport.height}`
    }`, () => {
      before(() => setUpStandard(viewport));
      beforeEach(() => { cy.visit(HOMEURL); cy.wait(1000); });

      it("The Language section titles and lists are rendering correctly", () => {
        homePage.languages()
          .should("be.visible")
          .children()
          .should("have.length", 2)
          .first()
          .should("have.text", "Programming Languages")

        homePage.languages()
          .find("#languages")
          .children()
          .should("have.length", 14);
      });

      it("The Framework section titles and lists are rendering correctly", () => {
        homePage.framework()
          .should("be.visible")
          .children()
          .should("have.length", 2)
          .first()
          .should("have.text", "Programming Frameworks")

        homePage.framework()
          .find("#frameworks")
          .children()
          .should("have.length", 17);
      });

      it("The Database section titles and lists are rendering correctly", () => {
        homePage.databases()
          .should("be.visible")
          .children()
          .should("have.length", 2)
          .first()
          .should("have.text", "Databases")

        homePage.databases()
          .find("#databases")
          .children()
          .should("have.length", 6);
      });

      it(`The Github card is being displayed`, () => {
        cy.window().then((win) => {
          cy.log("" + win.innerWidth);
          if (win.innerWidth > 1000) {
            cy.get("#githubCard")
              .should("be.visible")
              .children()
              .should("have.length", 2)
              .first()
              .should("have.text", "Days I Code")
              .next()
              .should("be.visible");
          } else {
            cy.get("#githubCard").should("not.exist");
          }
        });
      });

      it("The Developer tools section titles and lists are rendering correctly", () => {
        homePage.developerTools()
          .should("be.visible")
          .find("h3")
          .should("have.text", "Development Tools");

        homePage.developerTools()
          .find("h4")
          .eq(0)
          .contains("Governance/Planning")
          .next()
          .children()
          .should("have.length", 4);

        homePage.developerTools()
          .find("h4")
          .eq(1)
          .contains("Development")
          .next()
          .children()
          .should("have.length", 12);

        homePage.developerTools()
          .find("h4")
          .eq(2)
          .contains("Runtime")
          .next()
          .children()
          .should("have.length", 5);

        homePage.developerTools()
          .find("h4")
          .eq(3)
          .contains("DevOps/Serving")
          .next()
          .children()
          .should("have.length", 9);

        homePage.developerTools()
          .find("h4")
          .eq(4)
          .contains("Extras")
          .next()
          .children()
          .should("have.length", 6);
      });
    });

    describe(`Technical Skills containers are rendering as expected within each section at size: ${
      typeof viewport == "string"
        ? viewport
        : `${viewport.width} x ${viewport.height}`
    }`, () => {
      before(() => setUpStandard(viewport));
      beforeEach(() => { cy.visit(HOMEURL); cy.wait(1000); });

      it("The Language Technical skills containers renders correctly", () => {
        homePage.testSkillContainer(
          homePage.languages()
            .should("be.visible")
            .find("#languages")
            .children()
            .eq(Math.floor(Math.random() * 14))
        );
      });

      it("The Language Technical skills container is interactive", () => {
        homePage.testSkillContainerStyle(
          homePage.languages()
            .should("be.visible")
            .find("#languages")
            .children()
            .eq(Math.floor(Math.random() * 14))
        );
      });

      it("The Framework Technical skills containers renders correctly", () => {
        homePage.testSkillContainer(
          homePage.framework()
            .should("be.visible")
            .find("#frameworks")
            .children()
            .eq(Math.floor(Math.random() * 17))
        );
      });

      it("The Framework Technical skills containers is interactive", () => {
        homePage.testSkillContainerStyle(
          homePage.framework()
            .should("be.visible")
            .find("#frameworks")
            .children()
            .eq(Math.floor(Math.random() * 17))
        );
      });

      it("The Database Technical skills containers renders correctly", () => {
        homePage.testSkillContainer(
          homePage.databases()
            .should("be.visible")
            .find("#databases")
            .children()
            .eq(Math.floor(Math.random() * 6))
        );
      });

      it("The Database Technical skills containers is interactive", () => {
        homePage.testSkillContainerStyle(
          homePage.databases()
            .should("be.visible")
            .find("#databases")
            .children()
            .eq(Math.floor(Math.random() * 6))
        );
      });

      it("The Developer Tool Technical skills containers renders correctly", () => {
        homePage.developerTools().within(() => {
          let container: Cypress.Chainable<JQuery<HTMLElement>>;
          container = cy
            .get("ul")
            .eq(0)
            .children()
            .eq(Math.floor(Math.random() * 4));
          homePage.testSkillContainer(container);

          container = container = cy
            .get("ul")
            .eq(1)
            .children()
            .eq(Math.floor(Math.random() * 12));
          homePage.testSkillContainer(container);

          container = cy
            .get("ul")
            .eq(2)
            .children()
            .eq(Math.floor(Math.random() * 5));
          homePage.testSkillContainer(container);

          container = cy
            .get("ul")
            .eq(3)
            .children()
            .eq(Math.floor(Math.random() * 9));
          homePage.testSkillContainer(container);

          container = cy
            .get("ul")
            .eq(4)
            .children()
            .eq(Math.floor(Math.random() * 6));
          homePage.testSkillContainer(container);
        });
      });

      it("The Developer Tool Technical skills containers are interactive", () => {
        homePage.developerTools().within(() => {
          let container: Cypress.Chainable<JQuery<HTMLElement>>;
          container = cy
            .get("ul")
            .eq(0)
            .children()
            .eq(Math.floor(Math.random() * 4));
          homePage.testSkillContainerStyle(container);

          container = container = cy
            .get("ul")
            .eq(1)
            .children()
            .eq(Math.floor(Math.random() * 12));
          homePage.testSkillContainerStyle(container);

          container = cy
            .get("ul")
            .eq(2)
            .children()
            .eq(Math.floor(Math.random() * 5));
          homePage.testSkillContainerStyle(container);

          container = cy
            .get("ul")
            .eq(3)
            .children()
            .eq(Math.floor(Math.random() * 9));
          homePage.testSkillContainerStyle(container);

          container = cy
            .get("ul")
            .eq(4)
            .children()
            .eq(Math.floor(Math.random() * 6));
          homePage.testSkillContainerStyle(container);
        });
      });
    });

    describe(`Developer Socials are rendering as expected and missing in the footer at size: ${
      typeof viewport == "string"
        ? viewport
        : `${viewport.width} x ${viewport.height}`
    }`, () => {
      before(() => setUpStandard(viewport));
      beforeEach(() => { cy.visit(HOMEURL); cy.wait(1000); });

      it("The Developer Socials section component and title are rendering correctly", () => {
        homePage.developerSocials()
          .should("be.visible")
          .children()
          .should("have.length", 2)
        
        homePage.developerSocials()
          .find("p")
          .should("have.length", 1)
          .and("have.text", "Feel free to connect with me!");
      });

      it("The Developer Socials section list, logos, and links are rendering correctly", () => {
        homePage.developerSocials().find("ul").within(() => {
          cy.get("li")
            .should("have.length", 4)
            .eq(0)
            .find("a")
            .should("have.attr", "href", "https://github.com/GreenJ84")
            .children()
            .should("have.length", 1);

          cy.get("li")
            .eq(1)
            .find("a")
            .should("have.attr", "href", "https://twitter.com/GoodGreens84")
            .children()
            .should("have.length", 1);

          cy.get("li")
            .eq(2)
            .find("a")
            .should("have.attr", "href", "https://www.linkedin.com/in/jessegreenough/")
            .children()
            .should("have.length", 1);

          cy.get("li")
            .eq(3)
            .find("a")
            .should("have.attr", "href", "https://www.instagram.com/jesse.greenough/")
            .children()
            .should("have.length", 1);
        });
      });
    });
  });
});
