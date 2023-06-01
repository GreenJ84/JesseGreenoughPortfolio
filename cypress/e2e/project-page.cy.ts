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
  beforeEach(() => {
    cy.scrollTo(0, -100);
  });

  describe(`The Page and Projects containers render correctlyat Viewport ${viewportDisplay(
    viewport
  )}`, () => {
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
          expect($container)
            .to.have.css("background-color")
            .match(/^rgb\(12, 27, 22\)$/);
          expect($container)
            .to.have.css("border")
            .match(/^2px solid rgb\(0, 0, 0\)$/);
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
              expect($hr)
                .to.have.css("border")
                .match(/^0\.5px solid rgb\(0, 255, 13\)/);
            });

          cy.wrap($children)
            .eq(2)
            .then(($h1) => {
              expect($h1).to.have.css("margin-bottom");
              expect($h1).to.have.css("text-align", "center");
              expect($h1)
                .to.have.css("color")
                .match(/^rgb\(206, 255, 208\)$/);
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

  describe(`The Projects filter render correctly at Viewport ${viewportDisplay(
    viewport
  )}`, () => {
    it("The Filters have the correct layout", () => {
      projPage
        .projectsFilter()
        .should("be.visible")
        .children()
        .should("have.length", 2)
        .each(($child, idx) => {
          expect($child).to.have.prop("tagName", "DIV");

          cy.wrap($child)
            .children()
            .should("have.length", 2)
            .then(($filterChildren) => {
              cy.wrap($filterChildren)
                .eq(0)
                .should("have.prop", "tagName", "H2")
                .and(
                  "include.text",
                  idx === 0 ? "Filter by Language" : "Filter by Key Tech"
                );

              cy.wrap($filterChildren)
                .eq(1)
                .should("have.prop", "tagName", "SELECT")
                .and(
                  "have.attr",
                  "id",
                  idx === 0 ? "langSelect" : "techSelect"
                );
            });
        });
    });

    it("The Filters have the correct styling", () => {
      projPage
        .projectsFilter()
        .then(($nav) => {
          expect($nav).to.have.css("position", "absolute");
          expect($nav).to.have.css("top", "20px");
          expect($nav).to.have.css("left");
          expect($nav).to.have.css("display", "flex");
          expect($nav).to.have.css("align-items", "center");
          expect($nav).to.have.css("justify-content", "space-around");
          expect($nav).to.have.css("width");
          expect($nav).to.have.css("height", "100px");
          expect($nav).to.have.css("transform");
        })
        .children()
        .each(($child, idx) => {
          expect($child).to.have.css("display", "flex");
          expect($child).to.have.css("flex-direction", "column");
          expect($child).to.have.css("align-items", "center");

          cy.wrap($child)
            .children("h2")
            .first()
            .then(($h2) => {
              expect($h2).to.have.css("text-align", "center");
              expect($h2).to.have.css("margin-bottom", "8px");
              expect($h2).to.have.css("font-size");
              expect($h2)
                .to.have.css("color")
                .match(/rgb\(206, 255, 208\)/);
            });

          cy.wrap($child)
            .children("select")
            .first()
            .then(($select) => {
              expect($select).to.have.css("width");
              expect($select).to.have.css("height", "50px");
              expect($select).to.have.css("padding-left", "10px");
              expect($select).to.have.css("border-radius", "12px");
              expect($select).to.have.css("font-size", "20px");
              expect($select)
                .to.have.css("color")
                .match(/rgba\(14, 215, 165, 0\.925\)/);
              expect($select)
                .to.have.css("background-color")
                .match(/rgb\(24, 60, 24\)/);
            });
        });
    });

    it("The Filters hover effects function for accessability", () => {
      projPage
        .projectsFilter()
        .children()
        .each(($child, idx) => {
          cy.wrap($child)
            .find(idx == 0 ? "#langSelect" : "#techSelect")
            .first()
            .then(($select) => {
              expect($select).to.have.css("font-size", "20px");
              expect($select)
                .to.have.css("background-color")
                .match(/rgb\(24, 60, 24\)/);
            })
            .realHover({ scrollBehavior: "center" })
            .then(($select) => {
              expect($select).to.have.css("font-size", "24px");
              expect($select)
                .to.have.css("background-color")
                .match(/rgb\(60, 60, 60\)/);
              expect($select).to.have.css(
                "border",
                "2px solid rgb(0, 255, 13)"
              );
            });
        });
    });

    it("The Filters functionally change during activation", () => {
      // Both Start on Top projects
      projPage
        .filterSelect(0)
        .should("be.visible")
        .and("have.prop", "selectedIndex", 1);
      projPage
        .filterSelect(1)
        .should("be.visible")
        .and("have.prop", "selectedIndex", 1);

      // Activate filters and check expected selected index
      function checkFilters(
        filterSet: number[],
        issuerExpect: number,
        techExpect: number
      ) {
        projPage.filterProjects(filterSet[0], filterSet[1]);
        projPage
          .filterSelect(0)
          .should("have.prop", "selectedIndex", issuerExpect);
        projPage
          .filterSelect(1)
          .should("have.prop", "selectedIndex", techExpect);
      }
      // Both filter to All on left side selection
      checkFilters([0, 2], 2, 2);
      // Opposite specialized filters desable other side
      checkFilters([0, 3], 3, 0);
      checkFilters([1, 3], 0, 3);

      // Both filter to All on left side selection
      checkFilters([1, 2], 2, 2);

      // Both filter back to Top
      checkFilters([1, 1], 1, 1);
    });

    it("The Filters correctly adjust how the Title renders", () => {
      let text = "";
      projPage
        .projectsTitle()
        .should("be.visible")
        .invoke("text")
        .then((txt) => {
          expect(txt).to.equal("My current Top 10 projects");
          text = txt;
        });
      projPage.filterProjects(0, 2);
      projPage
        .projectsTitle()
        .invoke("text")
        .then((txt) => {
          expect(txt).to.match(/I have created over \d+ projects to date/);
          expect(txt).to.not.equal(text);
        });
      
      // Reset to Top 10 for next tests
      projPage.filterProjects(0, 1);
    });

    it ("The Filters adjust the displayed projects correctly", async () => {
      // check Top 10 render first
      projPage
        .projectsList()
        .should("be.visible")
        .children()
        .should("have.length", 10);
      
      // Filter All and expect to be more than 10 and save length
      projPage.filterProjects(0, 2);
      let allLength = 0;
      projPage
        .projectsList()
        .children()
        .should("have.length.greaterThan", 10)
        .its("length").then((length) => { 
          allLength = length;
        });
      
      // Get a random filter to sort
      let filter = Math.floor(Math.random() * 1000) % 2
      // Get the length of that filter
      let filterLen = await projPage.getFilterLength(filter);
      // Get a random option from the select
      let selection = Math.floor(Math.random() * 1000) % filterLen;
      // Make sure its not the beginning default types
      if (selection <= 2) { 
        selection = 4
      }
      cy.log(`Filter: ${filter}, Selection: ${selection}`);

      // Make sure new selection isnt All
      projPage.filterProjects(filter, selection);
      projPage
        .projectsList()
        .children()
        .its("length").then((length) => { 
          expect(length).to.be.lessThan(allLength);
        });
      
      // Reset to Top 10 for next tests
      projPage.filterProjects(0, 1);
    });
  });

  // describe(`The projects list renders correctly at Viewport ${viewportDisplay(
  //   viewport
  // )}`, () => {
  //   it("The project list title has the correct styling", () => {
  //     projPage.projectsTitle().should("be.visible");
  //   });

  //   it("The projects list renders the correct styling", () => {
  //     projPage.projectsList().should("be.visible");
  //   });

  //   it("Projects items are rendering the correct layout", () => {
  //     projPage.projectItem(0).should("be.visible");
  //   });

  //   it("Projects items are rendering the correct styling", () => {
  //     projPage.projectItem(0).should("be.visible");
  //   });
  // });

  // describe(`The projects detail cards render correctly at Viewport ${viewportDisplay(
  //   viewport
  // )}`, () => {
  //   it("The projects detail cards activate and close correctly", () => {
  //     projPage.projectItem(0).should("be.visible");
  //   });

  //   it("The projects detail cards have the correct layout", () => {
  //     projPage.projectItem(0).should("be.visible");
  //   });

  //   it("The projects detail cards left sides have the correct stylings", () => {
  //     projPage.projectItem(0).should("be.visible");
  //   });

  //   it("The projects detail cards right sides have the correct stylings", () => {
  //     projPage.projectItem(0).should("be.visible");
  //   });

  //   it("All the projects detail cards have the noticable hover effects", () => {
  //     projPage.projectItem(0).should("be.visible");
  //   });
  // });
});

// }
