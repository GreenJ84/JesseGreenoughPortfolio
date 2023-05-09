/** @format */

/// <reference types="cypress" />

import { HomePage } from "../page-objects/HomePage";
import { BASEURL, viewports, setUpStandard } from "../support/e2e";

let homePage: HomePage;
const HOMEURL = `${BASEURL}/`;

describe("Home Page render testing at all viewport sizes", () => {
  before(() => {
    homePage = new HomePage(HOMEURL);
    cy.window().then((win) => {
      win.localStorage.setItem("theme", "dark");
    });
    cy.visit(HOMEURL);
  });

  viewports.forEach((viewport) => {
    describe(`Home page Introduction visable and rendering as expected at size: ${
      typeof viewport == "string"
        ? viewport
        : `${viewport.width} x ${viewport.height}`
    }`, () => {
      before(() => setUpStandard(viewport));

      //! Move to navigation testing
      // it("home navigation should have all six navigation tags", () => {
      //   cy.get("#nav")
      //     .should("be.visible")
      //     .children()
      //     .should("have.length", 6);
      // });
      it("Main Page greeting section has the correct css and image background rendering", () => {
        homePage.homeTop
          .should("have.css", "margin", "auto")
          .and("have.css", "z-index", "-1")
          .and("have.css", "background-image")
          .and("contain", "url(/assets/home-bg.jpg)")
          .and("have.css", "background-size", "cover")
          .and("have.css", "background-repeat", "no-repeat")
          .and("have.css", "background-position", "center");
      });

      it("The Greeting is rendering correctly", () => {
        homePage.homeTop
          .find("h1")
          .first()
          .should("be.visible")
          .contains("Hi There!")
          .children()
          .should("have.length", 2);
      });

      it("The Developers Name is rendering correctly", () => {
        homePage.homeTop
          .find("#developerName")
          .should("be.visible")
          .contains("I'M JESSE GREENOUGH")
          .next()
          .children()
          .should("have.length", 3);
      });

      it("The TypeWrite section has all components rendering", () => {
        homePage.homeTop
          .find("#developerName")
          .should("be.visible")
          .next()
          .children()
          .should("have.length", 3);
      });

      it("The Home developer logo should be correct and visible", () => {
        homePage.homeTop
          .find("#homeDeveloperLogo")
          .should("be.visible")
          .and("have.attr", "src", "home-main.svg");
      });
    });

    describe(`The Developer's Introduction section is rendering correctly at size: at size: ${
      typeof viewport == "string"
        ? viewport
        : `${viewport.width} x ${viewport.height}`
      }`, () => {
      before(() => setUpStandard(viewport));

      it("The Developer's Introduction section has all components rendering", () => {
        homePage.developerInto
          .should("be.visible")
          .children()
          .should("have.length", 3);
      });

      it("The Developer's intro Title and Image are rendering correctly", () => { 
        homePage.developerInto
          .find("h2")
          .should("be.visible")
          .and("have.length", 1)
          .and("contain", "LET ME INTRODUCE MYSELF")
          .next()
          .should("be.visible")
          .children()
          .should("have.length", 1)
          .find("img")
          .should("be.visible")
          .and("have.attr", "src", "/assets/avatar.svg")
          .and("have.attr", "alt", "Human Avatar Icon");
      });

      it("The Developer's intro Text is rendering correctly", () => { 
        homePage.developerInto
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

      it("The Language section titles and lists are rendering correctly", () => {
        homePage.languages
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
        homePage.framework
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
        homePage.databases
          .should("be.visible")
          .and("have.length", 2)
          .children()
          .first()
          .should("have.text", "Databases")
          .find("#databases")
          .children()
          .should("have.length", 6);
      });

      it(`The Github card is being displayed`, () => {
        cy.window().then((win) => {
          cy.log("" + win.innerWidth);
          if (win.innerWidth > 1000) {
            cy.get("#githubCard")
              .debug()
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
        homePage.developerTools.within(() => {
          cy.get("h1").should("have.text", "Development Tools");

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

    describe(`Technical Skills containers are rendering as expected within each section at size: ${
      typeof viewport == "string"
        ? viewport
        : `${viewport.width} x ${viewport.height}`
    }`, () => {
      before(() => setUpStandard(viewport));

      it("The Language Technical skills containers renders correctly", () => {
        homePage.testSkillContainer(
          homePage.languages
            .should("be.visible")
            .find("#languages")
            .children()
            .eq(Math.floor(Math.random() * 14))
        );
      });

      it("The Language Technical skills container is interactive", () => {
        homePage.hoverSkillContainer(
          homePage.languages
            .should("be.visible")
            .find("#languages")
            .children()
            .eq(Math.floor(Math.random() * 14))
        );
      });

      it("The Framework Technical skills containers renders correctly", () => {
        homePage.testSkillContainer(
          homePage.framework
            .should("be.visible")
            .find("#frameworks")
            .children()
            .eq(Math.floor(Math.random() * 17))
        );
      });

      it("The Framework Technical skills containers is interactive", () => {
        homePage.hoverSkillContainer(
          homePage.framework
            .should("be.visible")
            .find("#frameworks")
            .children()
            .eq(Math.floor(Math.random() * 17))
        );
      });

      it("The Database Technical skills containers renders correctly", () => {
        homePage.testSkillContainer(
          homePage.databases
            .should("be.visible")
            .find("#databases")
            .children()
            .eq(Math.floor(Math.random() * 6))
        );
      });

      it("The Database Technical skills containers is interactive", () => {
        homePage.hoverSkillContainer(
          homePage.databases
            .should("be.visible")
            .find("#databases")
            .children()
            .eq(Math.floor(Math.random() * 6))
        );
      });

      it("The Developer Tool Technical skills containers renders correctly", () => {
        homePage.developerTools.within(() => {
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
        homePage.developerTools.within(() => {
          let container: Cypress.Chainable<JQuery<HTMLElement>>;
          container = cy
            .get("ul")
            .eq(0)
            .children()
            .eq(Math.floor(Math.random() * 4));
          homePage.hoverSkillContainer(container);

          container = container = cy
            .get("ul")
            .eq(1)
            .children()
            .eq(Math.floor(Math.random() * 12));
          homePage.hoverSkillContainer(container);

          container = cy
            .get("ul")
            .eq(2)
            .children()
            .eq(Math.floor(Math.random() * 5));
          homePage.hoverSkillContainer(container);

          container = cy
            .get("ul")
            .eq(3)
            .children()
            .eq(Math.floor(Math.random() * 9));
          homePage.hoverSkillContainer(container);

          container = cy
            .get("ul")
            .eq(4)
            .children()
            .eq(Math.floor(Math.random() * 6));
          homePage.hoverSkillContainer(container);
        });
      });
    });

    describe(`Developer Socials are rendering as expected and missing in the footer at size: ${
      typeof viewport == "string"
        ? viewport
        : `${viewport.width} x ${viewport.height}`
    }`, () => {
      before(() => setUpStandard(viewport));

      it("The Developer Socials section component and title are rendering correctly", () => {
        homePage.developerSocials
          .should("be.visible")
          .and("have.length", 2)
          .find("p")
          .should("have.length", 2)
          .and("have.text", "Feel free to connect with me!");
      });

      it("The Developer Socials section list, logos, and links are rendering correctly", () => {
        homePage.developerSocials.find("ul").within(() => {
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
            .eq(3)
            .find("a")
            .should("have.attr", "href", "https://www.linkedin.com/in/jessegreenough/")
            .children()
            .should("have.length", 1);

          cy.get("li")
            .eq(4)
            .find("a")
            .should("have.attr", "href", "https://www.instagram.com/jesse.greenough/")
            .children()
            .should("have.length", 1);
        });
      });
    });
  });
});
