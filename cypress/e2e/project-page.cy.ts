/** @format */

/// <reference types="cypress" />

import { ProjectPage } from "../page-objects/ProjectPage";
import {
  BASEURL,
  setupPageWithTheme,
  viewPortSetup,
  viewportDisplay,
  viewports,
} from "../support/e2e";

const PROJURL = BASEURL + "/projects";
const projPage = new ProjectPage();

let viewport = viewports[0];
// for (let viewport of viewports) {
context(`Project page testing at Viewport ${viewportDisplay(viewport)}`, () => {
  before(() => {
    viewPortSetup(viewport);
    setupPageWithTheme(PROJURL, "dark");
  });

  describe("The Page and Projects containers render correctly", () => {
    it("The page container render the correct stying", () => {
      projPage
        .pageContainer()
        .should("be.visible")
        .then(($main) => {
          expect($main).to.have.css("padding");
        })
        .children("section")
        .should("have.length", 1);
    });

    it("The project container renders the correct layout", () => {
      projPage
        .projectsContainer()
        .should("be.visible")
        .children()
        .should("have.length", 4)
        .then(($children) => {
          cy.wrap($children)
            .eq(0)
            .then(($nav) => {
              expect($nav).to.have.prop("tagName", "NAV");
              expect($nav).to.have.id("projectsFilter");
            });
          cy.wrap($children)
            .eq(1)
            .then(($hr) => {
              expect($hr).to.have.prop("tagName", "HR");
            });
          cy.wrap($children)
            .eq(2)
            .then(($h1) => {
              expect($h1).to.have.prop("tagName", "H1");
              expect($h1).to.have.id("projectsTitle");
            });
          cy.wrap($children)
            .eq(3)
            .then(($ul) => {
              expect($ul).to.have.prop("tagName", "UL");
              expect($ul).to.have.id("projectsList");
            });
        });
    });

    it("The project container render the correct styling", () => {
      projPage
        .projectsContainer()
        .then(($container) => { 
          expect($container).to.have.css("position", "relative");
          expect($container).to.have.css("padding");
          expect($container).to.have.css("background-color").match(/^rgb\(12, 27, 22\)$/);
          expect($container).to.have.css("border").match(/^2px solid rgb\(0, 0, 0\)$/);
        })
        .children()
        .then(($children) => {
          cy.wrap($children)
            .eq(0)
            .then(($nav) => {
              expect($nav).to.have.css("position", "absolute");
              expect($nav).to.have.css("top");
              expect($nav).to.have.css("left");
              expect($nav).to.have.css("transform");
              expect($nav).to.have.css("display", "flex");
              expect($nav).to.have.css("align-items", "center");
              expect($nav).to.have.css("justify-content", "space-around");
              expect($nav).to.have.css("width");
              expect($nav).to.have.css("height");
            });

          cy.wrap($children)
            .eq(1)
            .then(($hr) => { 
              expect($hr).to.have.css("border").match(/^0\.5px solid rgb\(0, 255, 13\)/);
            });

          cy.wrap($children)
            .eq(2)
            .then(($h1) => {
              expect($h1).to.have.css("margin-bottom");
              expect($h1).to.have.css("text-align", "center");
              expect($h1).to.have.css("color").match(/^rgb\(206, 255, 208\)$/);
              expect($h1).to.have.css("font-size");
            });

          cy.wrap($children)
            .eq(3)
            .then(($ul) => {
              expect($ul).to.have.css("display", "flex");
              expect($ul).to.have.css("flex-wrap", "wrap");
              expect($ul).to.have.css("justify-content", "space-around");
            });
        });
    });
  });

  describe("The Projects filter render correctly", () => {
    it("The Filters have the correct layout", () => {
      projPage.projectsFilter().should("be.visible");
    });

    it("The Filters have the correct styling", () => {
      projPage.projectsFilter().should("be.visible");
    });

    it("The Filters functionally change during activation", () => {
      projPage.projectsFilter().should("be.visible");
    });

    it("The Filters correctly adjust how the Title renders", () => {
      projPage.projectsFilter().should("be.visible");
      projPage.projectsTitle().should("be.visible");
    });

    it("The Filters adjust the displayed projects correctly", () => {
      projPage.projectsFilter().should("be.visible");
      projPage.projectsList().should("be.visible");
    });
  });

  describe("The projects list renders correctly", () => {
    it("The project list title has the correct styling", () => {
      projPage.projectsTitle().should("be.visible");
    });

    it("The projects list renders the correct styling", () => {
      projPage.projectsList().should("be.visible");
    });

    it("Projects items are rendering the correct layout", () => {
      projPage.projectItem(0).should("be.visible");
    });

    it("Projects items are rendering the correct styling", () => {
      projPage.projectItem(0).should("be.visible");
    });
  });

  describe("The projects detail cards render correctly", () => {
    it("The projects detail cards activate and close correctly", () => {
      projPage.projectItem(0).should("be.visible");
    });

    it("The projects detail cards have the correct layout", () => {
      projPage.projectItem(0).should("be.visible");
    });

    it("The projects detail cards left sides have the correct stylings", () => {
      projPage.projectItem(0).should("be.visible");
    });

    it("The projects detail cards right sides have the correct stylings", () => {
      projPage.projectItem(0).should("be.visible");
    });

    it("All the projects detail cards have the noticable hover effects", () => {
      projPage.projectItem(0).should("be.visible");
    });
  });
});

// }
