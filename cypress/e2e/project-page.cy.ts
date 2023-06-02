/** @format */

/// <reference types="cypress" />

import { ProjectPage } from "../page-objects/ProjectPage";
import {
  BASEURL,
  getOddEven,
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

  // describe(`The Page and Projects containers render correctlyat Viewport ${viewportDisplay(
  //   viewport
  // )}`, () => {
  //   it("The page container render the correct stying", () => {
  //     projPage
  //       .pageContainer()
  //       .should("be.visible")
  //       .then(($main) => {
  //         expect($main).to.have.css("padding");
  //       })
  //       .children("section")
  //       .should("have.length", 1);
  //   });

  //   it("The project container renders the correct layout", () => {
  //     projPage
  //       .projectsContainer()
  //       .should("be.visible")
  //       .children()
  //       .should("have.length", 4)
  //       .then(($children) => {
  //         cy.wrap($children)
  //           .eq(0)
  //           .then(($nav) => {
  //             expect($nav).to.have.prop("tagName", "NAV");
  //             expect($nav).to.have.id("projectsFilter");
  //           });
  //         cy.wrap($children)
  //           .eq(1)
  //           .then(($hr) => {
  //             expect($hr).to.have.prop("tagName", "HR");
  //           });
  //         cy.wrap($children)
  //           .eq(2)
  //           .then(($h1) => {
  //             expect($h1).to.have.prop("tagName", "H1");
  //             expect($h1).to.have.id("projectsTitle");
  //           });
  //         cy.wrap($children)
  //           .eq(3)
  //           .then(($ul) => {
  //             expect($ul).to.have.prop("tagName", "UL");
  //             expect($ul).to.have.id("projectsList");
  //           });
  //       });
  //   });

  //   it("The project container render the correct styling", () => {
  //     projPage
  //       .projectsContainer()
  //       .then(($container) => {
  //         expect($container).to.have.css("position", "relative");
  //         expect($container).to.have.css("padding");
  //         expect($container)
  //           .to.have.css("background-color")
  //           .match(/^rgb\(12, 27, 22\)$/);
  //         expect($container)
  //           .to.have.css("border")
  //           .match(/^2px solid rgb\(0, 0, 0\)$/);
  //       })
  //       .children()
  //       .then(($children) => {
  //         cy.wrap($children)
  //           .eq(1)
  //           .then(($hr) => {
  //             expect($hr)
  //               .to.have.css("border")
  //               .match(/^0\.5px solid rgb\(0, 255, 13\)/);
  //           });
  //       });
  //   });
  // });

  // describe(`The Projects filter render correctly at Viewport ${viewportDisplay(
  //   viewport
  // )}`, () => {
  //   it("The Filters have the correct layout", () => {
  //     projPage
  //       .projectsFilter()
  //       .should("be.visible")
  //       .children()
  //       .should("have.length", 2)
  //       .each(($child, idx) => {
  //         expect($child).to.have.prop("tagName", "DIV");

  //         cy.wrap($child)
  //           .children()
  //           .should("have.length", 2)
  //           .then(($filterChildren) => {
  //             cy.wrap($filterChildren)
  //               .eq(0)
  //               .should("have.prop", "tagName", "H2")
  //               .and(
  //                 "include.text",
  //                 idx === 0 ? "Filter by Language" : "Filter by Key Tech"
  //               );

  //             cy.wrap($filterChildren)
  //               .eq(1)
  //               .should("have.prop", "tagName", "SELECT")
  //               .and(
  //                 "have.attr",
  //                 "id",
  //                 idx === 0 ? "langSelect" : "techSelect"
  //               );
  //           });
  //       });
  //   });

  //   it("The Filters have the correct styling", () => {
  //     projPage
  //       .projectsFilter()
  //       .then(($nav) => {
  //         expect($nav).to.have.css("position", "absolute");
  //         expect($nav).to.have.css("top", "20px");
  //         expect($nav).to.have.css("left");
  //         expect($nav).to.have.css("display", "flex");
  //         expect($nav).to.have.css("align-items", "center");
  //         expect($nav).to.have.css("justify-content", "space-around");
  //         expect($nav).to.have.css("width");
  //         expect($nav).to.have.css("height", "100px");
  //         expect($nav).to.have.css("transform");
  //       })
  //       .children()
  //       .each(($child) => {
  //         expect($child).to.have.css("display", "flex");
  //         expect($child).to.have.css("flex-direction", "column");
  //         expect($child).to.have.css("align-items", "center");

  //         cy.wrap($child)
  //           .children("h2")
  //           .first()
  //           .then(($h2) => {
  //             expect($h2).to.have.css("text-align", "center");
  //             expect($h2).to.have.css("margin-bottom", "8px");
  //             expect($h2).to.have.css("font-size");
  //             expect($h2)
  //               .to.have.css("color")
  //               .match(/rgb\(206, 255, 208\)/);
  //           });

  //         cy.wrap($child)
  //           .children("select")
  //           .first()
  //           .then(($select) => {
  //             expect($select).to.have.css("width");
  //             expect($select).to.have.css("height", "50px");
  //             expect($select).to.have.css("padding-left", "10px");
  //             expect($select).to.have.css("border-radius", "12px");
  //             expect($select).to.have.css("font-size", "20px");
  //             expect($select)
  //               .to.have.css("color")
  //               .match(/rgba\(14, 215, 165, 0\.925\)/);
  //             expect($select)
  //               .to.have.css("background-color")
  //               .match(/rgb\(24, 60, 24\)/);
  //           });
  //       });
  //   });

  //   it("The Filters hover effects function for accessability", () => {
  //     projPage
  //       .projectsFilter()
  //       .children()
  //       .each(($child, idx) => {
  //         cy.wrap($child)
  //           .find(idx == 0 ? "#langSelect" : "#techSelect")
  //           .first()
  //           .then(($select) => {
  //             expect($select).to.have.css("font-size", "20px");
  //             expect($select)
  //               .to.have.css("background-color")
  //               .match(/rgb\(24, 60, 24\)/);
  //           })
  //           .realHover({ scrollBehavior: "center" })
  //           .then(($select) => {
  //             expect($select).to.have.css("font-size", "24px");
  //             expect($select)
  //               .to.have.css("background-color")
  //               .match(/rgb\(60, 60, 60\)/);
  //             expect($select).to.have.css(
  //               "border",
  //               "2px solid rgb(0, 255, 13)"
  //             );
  //           });
  //       });
  //   });

  //   it("The Filters functionally change during activation", () => {
  //     // Both Start on Top projects
  //     projPage
  //       .filterSelect(0)
  //       .should("be.visible")
  //       .and("have.prop", "selectedIndex", 1);
  //     projPage
  //       .filterSelect(1)
  //       .should("be.visible")
  //       .and("have.prop", "selectedIndex", 1);

  //     // Activate filters and check expected selected index
  //     function checkFilters(
  //       filterSet: number[],
  //       issuerExpect: number,
  //       techExpect: number
  //     ) {
  //       projPage.filterProjects(filterSet[0], filterSet[1]);
  //       projPage
  //         .filterSelect(0)
  //         .should("have.prop", "selectedIndex", issuerExpect);
  //       projPage
  //         .filterSelect(1)
  //         .should("have.prop", "selectedIndex", techExpect);
  //     }
  //     // Both filter to All on left side selection
  //     checkFilters([0, 2], 2, 2);
  //     // Opposite specialized filters desable other side
  //     checkFilters([0, 3], 3, 0);
  //     checkFilters([1, 3], 0, 3);

  //     // Both filter to All on left side selection
  //     checkFilters([1, 2], 2, 2);

  //     // Both filter back to Top
  //     checkFilters([1, 1], 1, 1);
  //   });

  //   it("The Filters correctly adjust how the Title renders", () => {
  //     let text = "";
  //     projPage
  //       .projectsTitle()
  //       .should("be.visible")
  //       .invoke("text")
  //       .then((txt) => {
  //         expect(txt).to.equal("My current Top 10 projects");
  //         text = txt;
  //       });
  //     projPage.filterProjects(0, 2);
  //     projPage
  //       .projectsTitle()
  //       .invoke("text")
  //       .then((txt) => {
  //         expect(txt).to.match(/I have created over \d+ projects to date/);
  //         expect(txt).to.not.equal(text);
  //       });

  //     // Reset to Top 10 for next tests
  //     projPage.filterProjects(0, 1);
  //   });

  //   it("The Filters adjust the displayed projects correctly", async () => {
  //     // check Top 10 render first
  //     projPage
  //       .projectsList()
  //       .should("be.visible")
  //       .children()
  //       .should("have.length", 10);

  //     // Filter All and expect to be more than 10 and save length
  //     projPage.filterProjects(0, 2);
  //     let allLength = 0;
  //     projPage
  //       .projectsList()
  //       .children()
  //       .should("have.length.greaterThan", 10)
  //       .its("length")
  //       .then((length) => {
  //         allLength = length;
  //       });

  //     // Get a random filter to sort
  //     let filter = getOddEven();
  //     // Get the length of that filter
  //     let filterLen = await projPage.getFilterOptionsLength(filter);
  //     // Get a random option from the select
  //     let selection = Math.floor(Math.random() * 1000) % filterLen;
  //     // Make sure its not the beginning default types
  //     if (selection <= 2) {
  //       selection = 4;
  //     }
  //     cy.log(`Filter: ${filter}, Selection: ${selection}`);

  //     // Make sure new selection isnt All
  //     projPage.filterProjects(filter, selection);
  //     projPage
  //       .projectsList()
  //       .children()
  //       .its("length")
  //       .then((length) => {
  //         expect(length).to.be.lessThan(allLength);
  //       });

  //     // Reset to Top 10 for next tests
  //     projPage.filterProjects(0, 1);
  //   });
  // });

  describe(`The projects list renders correctly at Viewport ${viewportDisplay(
    viewport
  )}`, () => {
    it("The project list title has the correct styling", () => {
      projPage
        .projectsTitle()
        .should("be.visible")
        .then(($h1) => {
          expect($h1).to.have.css("margin-bottom");
          expect($h1).to.have.css("text-align", "center");
          expect($h1)
            .to.have.css("color")
            .match(/^rgb\(206, 255, 208\)$/);
          expect($h1).to.have.css("font-size");
        });
    });

    it("The projects list renders the correct styling", () => {
      projPage
        .projectsList()
        .should("be.visible")
        .then(($ul) => {
          expect($ul).to.have.css("display", "flex");
          expect($ul).to.have.css("flex-wrap", "wrap");
          expect($ul).to.have.css("justify-content", "space-around");
        });
    });

    it("Projects items are rendering the correct layout", () => {
      let oddEven = getOddEven();
      projPage.getProjectsLength().then((projects) => {
        for (let i = 0; i < projects; i++) {
          if (i % 2 == oddEven) {
            projPage
              .projectItem(i)
              .should("be.visible")
              .then(($li) => {
                expect($li).to.have.prop("tagName", "LI");
              })
              .children()
              .should("have.length", 2)
              .then(($children) => {
                cy.wrap($children)
                  .eq(0)
                  .then(($img) => {
                    expect($img).to.have.prop("tagName", "IMG");
                  });

                cy.wrap($children)
                  .eq(1)
                  .then(($p) => {
                    expect($p).to.have.prop("tagName", "P");
                  });
              });
          }
        }
      });
    });

    it("Projects items are rendering the correct styling", () => {
      let oddEven = getOddEven();
      projPage.getProjectsLength().then((projects) => {
        for (let i = 0; i < projects; i++) {
          if (i % 2 == oddEven) {
            projPage
              .projectItem(i)
              .should("be.visible")
              .then(($li) => {
                expect($li).to.have.css("position", "relative");
                expect($li).to.have.css("display", "flex");
                expect($li).to.have.css("flex-direction", "column");
                expect($li).to.have.css("justify-content", "space-around");
                expect($li).to.have.css("width");
                expect($li).to.have.css("height");
                expect($li).to.have.css("margin");
                expect($li)
                  .to.have.css("background-color")
                  .match(/^rgb\(60, 60, 60\)$/);
                expect($li).to.have.css("border-radius", "20px");
                expect($li)
                  .to.have.css("box-shadow")
                  .match(/^(rgb\(6, 255, 19\)(\s-?\dpx){4}(,\s)?){2}/);
              })
              .children()
              .should("have.length", 2)
              .then(($children) => {
                cy.wrap($children)
                  .eq(0)
                  .then(($img) => {
                    expect($img).to.have.css("display", "flex");
                    expect($img).to.have.css("width");
                    expect($img).to.have.css("height");
                    expect($img).to.have.css("margin");
                  });

                cy.wrap($children)
                  .eq(1)
                  .then(($p) => {
                    expect($p).to.have.css("margin");
                    expect($p).to.have.css("text-align", "center");
                    expect($p)
                      .to.have.css("color")
                      .match(/^rgb\(0, 255, 13\)$/);
                    expect($p).to.have.css("font-size");
                    expect($p).to.have.css("font-weight", "800");
                  });
              });
          }
        }
      });
    });

    it("Projects Items hover styling renders correctly", () => {
      let oddEven = getOddEven();
      projPage.getProjectsLength().then((projects) => {
        for (let i = 0; i < projects; i++) {
          if (i % 2 == oddEven) {
            projPage
              .projectItem(i)
              .should("be.visible")
              .then(($li) => {
                expect($li)
                  .to.have.css("background-color")
                  .match(/^rgb\(60, 60, 60\)$/);
                expect($li)
                  .to.have.css("box-shadow")
                  .match(/^(rgb\(6, 255, 19\)(\s-?\dpx){4}(,\s)?){2}/);
              })
              .realHover()
              .then(($li) => {
                expect($li)
                  .to.have.css("background-color")
                  .match(/^rgb\(25, 25, 25\)$/);
                expect($li)
                  .to.have.css("box-shadow")
                  .match(
                    /^(\s?rgba\(14, 215, 165, 0\.925\)(\s-?\d+px){4}(, )?){2}$/
                  );
                expect($li).to.have.css("transform");
              });
          }
        }
      });
    });
  });

  describe(`The projects detail cards render correctly at Viewport ${viewportDisplay(
    viewport
  )}`, () => {
    afterEach(() => {
      // Check if modal is closed
      projPage
        .projectsList()
        .children(":not(li)")
        .should("have.length.gte", 0)
        .then(($modal) => {
          if ($modal.length > 0) {
            projPage.closeDetailModal();
          }
          projPage.projectDetailModal().should("not.exist");
        });
    });

    it("The projects detail cards activate and close correctly", () => {
      let oddEven = getOddEven();
      projPage.getProjectsLength().then((length) => {
        for (let i = 0; i < length; i++) {
          if (i % 2 == oddEven) {
            // Ensure modal is closed before opening
            projPage.projectDetailModal().should("not.exist");
            projPage.projectItem(i).should("be.visible").click();

            // Detail Modal covers items
            projPage.projectDetailModal().should("be.visible");
            projPage.modalUnderlay().should("be.exist");

            // Detail Modal closes with the closing button
            projPage.closeDetailModal();
            projPage.projectDetailModal().should("not.exist");
          }
          if (i == length - 1) {
            return;
          }
        }
      });
    });

    it("The projects detail cards close button has the correct stylings", () => {
      let oddEven = getOddEven();
      projPage.getProjectsLength().then((length) => {
        for (let i = 0; i < length; i++) {
          if (i % 2 == oddEven) {
            // Open Modal
            projPage.projectDetailModal().should("not.exist");
            projPage.projectItem(i).should("be.visible").click();

            // Check Modal's Button stylings
            projPage
              .projectDetailModal()
              .should("be.visible")
              .children()
              .then(($children) => {
                cy.wrap($children).eq(1).realHover();
                cy.wrap($children)
                  .eq(2)
                  .then(($button) => {
                    expect($button).to.have.css("position", "absolute");
                    expect($button).to.have.css("top");
                    expect($button).to.have.css("right");
                    expect($button).to.have.css("display", "flex");
                    expect($button).to.have.css("justify-content", "center");
                    expect($button).to.have.css("align-items", "center");
                    expect($button).to.have.css("padding", "0px");
                    expect($button).to.have.css("width");
                    expect($button).to.have.css("height");
                    expect($button).to.have.css("font-size");

                        expect($button)
                          .to.have.css("color")
                          .match(/^rgb\(206, 255, 208\)$/);
                        expect($button)
                          .to.have.css("background-color")
                          .match(/^rgb\(17, 114, 0\)$/);
                        expect($button).to.have.css("border-radius");
                      });
              });

            // Close Modal
            projPage.closeDetailModal();
            projPage.projectDetailModal().should("not.exist");
          }
        }
      });
    });

    it("The projects detail cards have the correct layout", () => {
      let oddEven = getOddEven();
      projPage.getProjectsLength().then((length) => {
        for (let i = 0; i < length; i++) {
          if (i % 2 == oddEven) {
            // Open Modal
            projPage.projectItem(i).should("be.visible").click();

            // Check Modal's layout
            projPage
              .projectDetailModal()
              .should("be.visible")
              .children()
              .should("have.length", 3)
              .then(($children) => {
                // Left Section
                cy.wrap($children)
                  .eq(0)
                  .then(($div) => {
                    expect($div).to.have.prop("tagName", "DIV");
                    expect($div).to.have.attr("id", "detailLeft");
                    // Inside Of Left
                    cy.wrap($div)
                      .children()
                      .should("have.length", 2)
                      .then(($children) => {
                        // Project Image
                        cy.wrap($children)
                          .eq(0)
                          .then(($img) => {
                            expect($img).to.have.prop("tagName", "IMG");
                          });

                        // Project Links
                        cy.wrap($children)
                          .eq(1)
                          .should("have.prop", "tagName", "DIV")
                          .children()
                          .each(($a) => {
                            expect($a).to.have.prop("tagName", "A");
                            cy.wrap($a).children().should("have.length.gte", 1);
                          });
                      });
                  });

                // Right Section
                cy.wrap($children)
                  .eq(1)
                  .then(($div) => {
                    expect($div).to.have.prop("tagName", "DIV");
                    expect($div).to.have.attr("id", "detailRight");
                    // Inside Of Right
                    cy.wrap($div)
                      .children()
                      .should("have.length", 4)
                      .then(($children) => {
                        // Project Title
                        cy.wrap($children)
                          .eq(0)
                          .should("have.prop", "tagName", "H2");

                        // Project Desription
                        cy.wrap($children)
                          .eq(1)
                          .should("have.prop", "tagName", "P");

                        // Project Techs
                        cy.wrap($children)
                          .eq(2)
                          .should("have.prop", "tagName", "H3");

                        // Project Link
                        cy.wrap($children)
                          .eq(3)
                          .should("have.prop", "tagName", "UL")
                          .children()
                          .should("have.length.greaterThan", 0);
                      });
                  });

                // Close Modal
                cy.wrap($children)
                  .eq(2)
                  .then(($button) => {
                    expect($button).to.have.prop("tagName", "BUTTON");
                    expect($button).to.have.attr("id", "modalClose");
                  });
              });

            // Close Modal
            projPage.closeDetailModal();
            projPage.projectDetailModal().should("not.exist");
          }
        }
      });
    });

    it("The projects detail cards main container has the correct stylings", () => {
      let oddEven = getOddEven();
      projPage.getProjectsLength().then((length) => {
        for (let i = 0; i < length; i++) {
          if (i % 2 == oddEven) {
            // Open Modal
            projPage.projectDetailModal().should("not.exist");
            projPage.projectItem(i).should("be.visible").click();

            // Check Modal's main stylings
            projPage
              .projectDetailModal()
              .should("be.visible")
              .then(($div) => {
                expect($div).to.have.css("position", "fixed");
                expect($div).to.have.css("bottom", "80px");
                expect($div).to.have.css("left");
                expect($div).to.have.css("transform");
                expect($div).to.have.css("z-index");
                expect($div).to.have.css("display", "flex");
                expect($div).to.have.css("padding");
                expect($div).to.have.css("width");
                expect($div).to.have.css("height");
                expect($div)
                  .to.have.css("color")
                  .match(/^rgb\(0, 255, 13\)$/);
                expect($div)
                  .to.have.css("background-color")
                  .match(/^rgb\(25, 25, 25\)$/);
                expect($div).to.have.css("border-radius");
                expect($div)
                  .to.have.css("box-shadow")
                  .match(
                    /^(rgba\(14, 215, 165, 0\.925\)(\s(-)?\d+px){4} inset(,\s)?){2}/
                  );
              });

            // Close Modal
            projPage.closeDetailModal();
            projPage.projectDetailModal().should("not.exist");
          }
        }
      });
    });

    it("The projects detail cards left side has the correct stylings", () => {
      let oddEven = getOddEven();
      projPage.getProjectsLength().then((length) => {
        for (let i = 0; i < length; i++) {
          if (i % 2 == oddEven) {
            // Open Modal
            projPage.projectDetailModal().should("not.exist");
            projPage.projectItem(i).should("be.visible").click();

            // Check Modal's left side stylings
            projPage
              .projectDetailModal()
              .should("be.visible")
              .children()
              .eq(0)
              .then(($div) => {
                // Left container stylings
                expect($div).to.have.css("display", "flex");
                expect($div).to.have.css("flex-direction", "column");
                expect($div).to.have.css("justify-content", "space-between");
                expect($div).to.have.css("width");

                cy.wrap($div)
                  .children()
                  .then(($children) => {
                    // Image stylings
                    cy.wrap($children)
                      .eq(0)
                      .then(($img) => {
                        expect($img).to.have.css("margin-top");
                        expect($img).to.have.css("width");
                        expect($img).to.have.css("height");
                      });

                    // Project link container stylings
                    cy.wrap($children)
                      .eq(1)
                      .then(($div) => {
                        expect($div).to.have.css("display", "flex");
                        expect($div).to.have.css(
                          "justify-content",
                          "flex-start"
                        );
                        expect($div).to.have.css("align-items", "center");
                        expect($div).to.have.css("margin-bottom", "20px");

                        // Project link stylings
                        cy.wrap($div)
                          .children()
                          .each(($children) => {
                            expect($children).to.have.css("padding");
                            expect($children).to.have.css("margin");
                            expect($children).to.have.css(
                              "text-align",
                              "center"
                            );
                            expect($children).to.have.css("max-width");
                            expect($children).to.have.css("font-size");
                            expect($children)
                              .to.have.css("color")
                              .match(/^rgb\(206, 255, 208\)$/);
                            expect($children)
                              .to.have.css("background-color")
                              .match(/^rgb\(17, 114, 0\)$/);
                            expect($children).to.have.css(
                              "border-radius",
                              "30px"
                            );
                          });
                      });
                  });
              });

            // Close Modal
            projPage.closeDetailModal();
            projPage.projectDetailModal().should("not.exist");
          }
        }
      });
    });

    it("The projects detail cards right side has the correct stylings", () => {
      let oddEven = getOddEven();
      projPage.getProjectsLength().then((length) => {
        for (let i = 0; i < length; i++) {
          if (i % 2 == oddEven) {
            // Open Modal
            projPage.projectDetailModal().should("not.exist");
            projPage.projectItem(i).should("be.visible").click();

            // Check Modal's right side stylings
            projPage
              .projectDetailModal()
              .should("be.visible")
              .children()
              .then(($children) => {
                cy.wrap($children)
                  .eq(1)
                  .then(($div) => {
                    // Right container stylings
                    expect($div).to.have.css("width");

                    // Project Title stylings
                    cy.wrap($div)
                      .children()
                      .eq(0)
                      .then(($h2) => {
                        expect($h2).to.have.css("position", "relative");
                        expect($h2).to.have.css("margin");
                        expect($h2).to.have.css("width");
                        expect($h2).to.have.css("text-align", "left");
                        expect($h2).to.have.css("font-size");
                        expect($h2)
                          .to.have.css("color")
                          .match(/^rgb\(0, 255, 13\)$/);
                      });

                    // Project Description stylings
                    cy.wrap($div)
                      .children()
                      .eq(1)
                      .then(($p) => {
                        expect($p).to.have.css("transform");
                        expect($p).to.have.css("margin-top", "20px");
                        expect($p).to.have.css("height");
                        expect($p).to.have.css("overflow", "scroll");
                        expect($p).to.have.css("font-size");
                        expect($p).to.have.css("line-height");
                        expect($p).to.have.css("text-indent");
                        expect($p)
                          .to.have.css("color")
                          .match(/^rgb\(206, 255, 208\)$/);
                      });

                    // Technologies Title stylings
                    cy.wrap($div)
                      .children()
                      .eq(2)
                      .then(($h3) => {
                        expect($h3).to.have.css("transform");
                        expect($h3).to.have.css("height");
                        expect($h3).to.have.css("font-size");
                        expect($h3).to.have.css("line-height");
                        expect($h3)
                          .to.have.css("color")
                          .match(/^rgb\(0, 255, 13\)$/);
                      });

                    // Technologies Listing stylings
                    cy.wrap($div)
                      .children()
                      .eq(3)
                      .then(($ul) => {
                        expect($ul).to.have.css("display", "flex");
                        expect($ul).to.have.css("flex-wrap", "wrap");
                        expect($ul).to.have.css("padding");
                        expect($ul).to.have.css("height");
                        expect($ul).to.have.css("transform");
                        expect($ul).to.have.css("overflow", "scroll");
                        expect($ul).to.have.css("list-style-type", "none");
                        // Technology Item stylings
                        cy.wrap($ul)
                          .children()
                          .each(($li) => {
                            expect($li).to.have.css("margin");
                            expect($li).to.have.css("padding");
                            expect($li).to.have.css("min-height", "10px");
                            expect($li).to.have.css("overflow-y", "scroll");
                            expect($li).to.have.css("font-size");
                            expect($li)
                              .to.have.css("color")
                              .match(/^rgb\(206, 255, 208\)$/);
                            expect($li)
                              .to.have.css("background-color")
                              .match(/^rgb\(24, 60, 24\)$/);
                            expect($li).to.have.css("border-radius", "10px");
                          });
                      });
                  });
              });

            // Close Modal
            projPage.closeDetailModal();
            projPage.projectDetailModal().should("not.exist");
          }
        }
      });
    });

    it("The projects detail cards have the noticable hover effects", () => {
      let oddEven = getOddEven();
      projPage.getProjectsLength().then((length) => {
        for (let i = 0; i < length; i++) {
          if (i % 2 == oddEven) {
            // Open Modal
            projPage.projectDetailModal().should("not.exist");
            projPage.projectItem(i).should("be.visible").click();

            // Check Modal's interactivity
            projPage
              .projectDetailModal()
              .should("be.visible")
              .children()
              .then(($children) => {
                // Project Links hover effects
                cy.wrap($children)
                  .eq(0)
                  .find("div#projectLinks")
                  .first()
                  .children()
                  .each(($a) => {
                    expect($a)
                      .to.have.css("color")
                      .match(/^rgb\(206, 255, 208\)$/);
                    expect($a)
                      .to.have.css("background-color")
                      .match(/^rgb\(17, 114, 0\)$/);

                    cy.wrap($a)
                      .realHover()
                      .then(($a) => {
                        expect($a)
                          .to.have.css("color")
                          .match(/^rgb\(12, 27, 22\)$/);
                        expect($a)
                          .to.have.css("background-color")
                          .match(/^rgb\(6, 255, 19\)$/);
                        expect($a)
                          .to.have.css("box-shadow")
                          .match(/^rgba\(14, 215, 165, 0\.925\)(\s-?\dpx){4}$/);
                        expect($a).to.have.css("transform");
                      });
                  });

                // Projects Techs hovering effects
                cy.wrap($children)
                  .eq(1)
                  .find("ul")
                  .first()
                  .children()
                  .each(($li) => {
                    expect($li).to.have.css("transform", "none");
                    expect($li).to.have.css("box-shadow", "none");

                    cy.wrap($li)
                      .realHover()
                      .then(($li) => {
                        expect($li).to.have.css("transform");
                        expect($li)
                          .to.have.css("box-shadow")
                          .match(/^rgba\(14, 215, 165, 0\.925\)(\s\dpx){4}/);
                      });
                  });

                // Close Button hovering effects
                cy.wrap($children)
                  .eq(2)
                  .then(($button) => {
                    expect($button)
                      .to.have.css("color")
                      .match(/^rgb\(206, 255, 208\)$/);
                    expect($button)
                      .to.have.css("background-color")
                      .match(/^rgb\(17, 114, 0\)$/);
                    expect($button).to.have.css("box-shadow", "none");

                    cy.wrap($button)
                      .realHover({position: "center"})
                      .then(($hover) => {
                        expect($hover)
                          .to.have.css("color")
                          .match(/^rgb\(12, 27, 22\)$/);
                        expect($hover)
                          .to.have.css("background-color")
                          .match(/^rgb\(6, 255, 19\)$/);
                        expect($hover)
                          .to.have.css("border")
                          .match(/^1\.5px solid rgb\(0, 0, 0\)/);
                        expect($hover)
                          .to.have.css("box-shadow")
                          .match(/^(rgb\(6, 255, 19\)(\s-?\dpx){4}(, )?){4}$/);
                      });
                  });
              });

            // Close Modal
            projPage.closeDetailModal();
            projPage.projectDetailModal().should("not.exist");
          }
        }
      });
    });
  });
});

// }
