/** @format */

/// <reference types="cypress" />

import { MainPage } from "../page-objects/MainPage";
import { BASEURL, viewports, setUpStandard } from "../support/e2e";

let mainPage: MainPage;
const HOMEURL = `${BASEURL}/`;

describe("Home Page render testing at all viewport sizes", () => {
  before(() => {
    mainPage = new MainPage();
    cy.window().then((win) => {
      win.localStorage.setItem("theme", "dark");
    });
  });

  viewports.forEach((viewport) => {
    describe(`Home page Introduction visable and rendering as expected at size: ${
      typeof viewport == "string"
        ? viewport
        : `${viewport.width} x ${viewport.height}`
    }`, () => {
      before(() => {
        setUpStandard(viewport);
        cy.visit(HOMEURL);
      });

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

    describe(`Each Technical Section is rendering and as expected at size: ${
      typeof viewport == "string"
        ? viewport
        : `${viewport.width} x ${viewport.height}`
    }`, () => {
      before(() => {
        setUpStandard(viewport);
      });

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

      it(`The Github card is being displayed`, () => {
        cy.wait(1000);
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
        mainPage.developerTools.within(() => {
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
        mainPage.testSkillContainer(
          mainPage.languages
            .should("be.visible")
            .find("#languages")
            .children()
            .eq(Math.floor(Math.random() * 14))
        );
      });

      it("The Language Technical skills container is interactive", () => {
        mainPage.hoverSkillContainer(
          mainPage.languages
            .should("be.visible")
            .find("#languages")
            .children()
            .eq(Math.floor(Math.random() * 14))
        );
      });

      it("The Framework Technical skills containers renders correctly", () => {
        mainPage.testSkillContainer(
          mainPage.framework
            .should("be.visible")
            .find("#frameworks")
            .children()
            .eq(Math.floor(Math.random() * 17))
        );
      });

      it("The Framework Technical skills containers is interactive", () => {
        mainPage.hoverSkillContainer(
          mainPage.framework
            .should("be.visible")
            .find("#frameworks")
            .children()
            .eq(Math.floor(Math.random() * 17))
        );
      });

      it("The Database Technical skills containers renders correctly", () => {
        mainPage.testSkillContainer(
          mainPage.databases
            .should("be.visible")
            .find("#databases")
            .children()
            .eq(Math.floor(Math.random() * 6))
        );
      });

      it("The Database Technical skills containers is interactive", () => {
        mainPage.hoverSkillContainer(
          mainPage.databases
            .should("be.visible")
            .find("#databases")
            .children()
            .eq(Math.floor(Math.random() * 6))
        );
      });

      it("The Developer Tool Technical skills containers renders correctly", () => {
        mainPage.developerTools.within(() => {
          let container: Cypress.Chainable<JQuery<HTMLElement>>;
          container = cy
            .get("ul")
            .eq(0)
            .children()
            .eq(Math.floor(Math.random() * 4));
          mainPage.testSkillContainer(container);

          container = container = cy
            .get("ul")
            .eq(1)
            .children()
            .eq(Math.floor(Math.random() * 12));
          mainPage.testSkillContainer(container);

          container = cy
            .get("ul")
            .eq(2)
            .children()
            .eq(Math.floor(Math.random() * 5));
          mainPage.testSkillContainer(container);

          container = cy
            .get("ul")
            .eq(3)
            .children()
            .eq(Math.floor(Math.random() * 9));
          mainPage.testSkillContainer(container);

          container = cy
            .get("ul")
            .eq(4)
            .children()
            .eq(Math.floor(Math.random() * 6));
          mainPage.testSkillContainer(container);
        });
      });

      it("The Developer Tool Technical skills containers are interactive", () => {
        mainPage.developerTools.within(() => {
          let container: Cypress.Chainable<JQuery<HTMLElement>>;
          container = cy
            .get("ul")
            .eq(0)
            .children()
            .eq(Math.floor(Math.random() * 4));
          mainPage.hoverSkillContainer(container);

          container = container = cy
            .get("ul")
            .eq(1)
            .children()
            .eq(Math.floor(Math.random() * 12));
          mainPage.hoverSkillContainer(container);

          container = cy
            .get("ul")
            .eq(2)
            .children()
            .eq(Math.floor(Math.random() * 5));
          mainPage.hoverSkillContainer(container);

          container = cy
            .get("ul")
            .eq(3)
            .children()
            .eq(Math.floor(Math.random() * 9));
          mainPage.hoverSkillContainer(container);

          container = cy
            .get("ul")
            .eq(4)
            .children()
            .eq(Math.floor(Math.random() * 6));
          mainPage.hoverSkillContainer(container);
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
        mainPage.developerSocials
          .should("be.visible")
          .and("have.length", 2)
          .find("p")
          .should("have.length", 2)
          .and("have.text", "Feel free to connect with me!");
      });

      it("The Developer Socials section list, logos, and links are rendering correctly", () => {
        mainPage.developerSocials.find("ul").within(() => {
          cy.get("li")
            .should("have.length", 4)
            .eq(0)
            .find("a")
            .should("have.attr", "href")
            .and("include", "https://www.linkedin.com")
            .children()
            .should("have.length", 1);

          cy.get("li")
            .eq(1)
            .find("a")
            .should("have.attr", "href")
            .and("include", "https://twitter.com")
            .children()
            .should("have.length", 1);

          cy.get("li")
            .eq(3)
            .find("a")
            .should("have.attr", "href")
            .and("include", "https://www.linkedin.com")
            .children()
            .should("have.length", 1);

          cy.get("li")
            .eq(4)
            .find("a")
            .should("have.attr", "href")
            .and("include", "https://www.instagram.com")
            .children()
            .should("have.length", 1);
        });
      });
    });
  });
});
