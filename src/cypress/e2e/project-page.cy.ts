/** @format */

/// <reference types="cypress" />

import { ProjectPage } from "../page-objects/ProjectPage";
import {
  BASEURL,
  getOddEven,
  getWindowInnerWidth,
  setupPageWithTheme,
  viewPortSetup,
  viewportDisplay,
  viewports,
} from "../support/e2e";

const PROJURL = BASEURL + "/projects";
const projPage = new ProjectPage();

for (let viewport of viewports) {
  context(
    `Project page testing at Viewport ${viewportDisplay(viewport)}`,
    () => {
      before(() => {
        viewPortSetup(viewport);
        setupPageWithTheme(PROJURL, "dark");
      });

      beforeEach(() => {
        cy.get("body").first().realHover({position: "bottomRight"});
        viewPortSetup(viewport);
        cy.wait(1000);
      });

      describe(`The Projects page container is rendering correctly at Viewport: ${viewportDisplay(
        viewport
      )}`, () => {
        it("The Project page container is rendering the correct layout", () => {
          projPage
            .pageContainer()
            .should("be.visible")
            .children()
            .should("have.length", 4)
            .then(($children: JQuery<HTMLElement>) => {
              cy.wrap($children)
                .eq(0)
                .should("be.visible")
                .then(($filter: JQuery<HTMLElement>) => {
                  expect($filter).to.have.prop("tagName", "NAV");
                  expect($filter).to.have.id("projectsFilter");
                });

              cy.wrap($children)
                .eq(1)
                .should("be.visible")
                .then(($hrule: JQuery<HTMLElement>) => {
                  expect($hrule).to.have.prop("tagName", "HR");
                });

              cy.wrap($children)
                .eq(2)
                .should("be.visible")
                .then(($title: JQuery<HTMLElement>) => {
                  expect($title).to.have.prop("tagName", "H1");
                  expect($title).to.have.id("projectsTitle");
                });

              cy.wrap($children)
                .eq(3)
                .should("be.visible")
                .then(($projectList: JQuery<HTMLElement>) => {
                  expect($projectList).to.have.prop("tagName", "UL");
                  expect($projectList).to.have.id("projectsList");
                });
            });
        });

        it("The Project page container is rendering the correct styling", () => {
          projPage.pageContainer().then(($main) => {
            expect($main).to.have.css("position", "relative");
            expect($main).to.have.css("padding");
          });
        });
      });

      describe(`The Projects filter is rendering correctly at Viewport ${viewportDisplay(
        viewport
      )}`, () => {
        it("The Filter contatiner is rendering the correct layout", () => {
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

        it("The Filter container is rendering the correct styling", () => {
          projPage.projectsFilter().then(($nav) => {
            expect($nav).to.have.css("position", "relative");
            expect($nav).to.have.css("left");
            expect($nav).to.have.css("transform");
            expect($nav).to.have.css("display", "flex");
            expect($nav).to.have.css("align-items", "center");
            expect($nav).to.have.css("justify-content", "space-around");
            expect($nav).to.have.css("margin-bottom");
            expect($nav).to.have.css("width");
            expect($nav).to.have.css("height", "100px");
            expect($nav).to.have.css("text-align", "center");
          });
        });

        it("Each of the filters are rendering the correct stlying", () => {
          projPage
            .projectsFilter()
            .children()
            .each(($child) => {
              expect($child).to.have.css("display", "flex");
              expect($child).to.have.css("flex-direction", "column");
              expect($child).to.have.css("align-items", "center");

              cy.wrap($child)
                .children("h2")
                .first()
                .then(($h2) => {
                  expect($h2).to.have.css("margin-bottom", "12px");
                  expect($h2).to.have.css("text-align", "center");
                  expect($h2).to.have.css("color", "rgb(230, 255, 243)");
                  expect($h2).to.have.css("font-size");
                  expect(parseFloat($h2.css("font-size")))
                    .to.be.lte(48)
                    .and.to.be.gte(20);
                  expect($h2).to.have.css("letter-spacing", "2px");
                });

              cy.wrap($child)
                .children("select")
                .first()
                .then(($select) => {
                  expect($select).to.have.css("width");
                  expect(parseFloat($select.css("width"))).to.be.lte(460);
                  expect($select).to.have.css("height", "50px");
                  expect($select).to.have.css("padding-left", "10px");
                  expect($select).to.have.css("color", "rgb(164, 255, 182)");
                  expect($select).to.have.css("font-size", "20px");
                  expect($select)
                    .to.have.css("background-color")
                    .match(/rgba\(0, 142, 8, 0\.46\d+\)/);
                  expect($select).to.have.css(
                    "border",
                    "1px solid rgb(164, 255, 182)"
                  );
                  expect($select).to.have.css("border-radius", "12px");
                });
            });
        });

        it("The Filters hover effects function as expected", () => {
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
                    .match(/rgba\(0, 142, 8, 0\.46\d+\)/);
                  expect($select).to.have.css(
                    "border",
                    "1px solid rgb(164, 255, 182)"
                  );
                })
                .realHover({ position: "center", scrollBehavior: "center" })
                .wait(2000)
                .then(($select) => {
                  expect($select).to.have.css("font-size", "24px");
                  expect($select).to.have.css(
                    "background-color",
                    "rgb(85, 84, 84)"
                  );
                  expect($select).to.have.css(
                    "border",
                    "2px solid rgb(164, 255, 182)"
                  );
                });
            });
        });

        it("The Filters functionally change values on activation", () => {
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

        it("The Filters adjust the displayed projects correctly", async () => {
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
            .its("length")
            .then((length) => {
              allLength = length;
            });

          // Get a random filter to sort
          let filter = getOddEven();
          // Get the length of that filter
          let filterLen = await projPage.getFilterOptionsLength(filter);
          // Get a random option from the select
          let selection = Math.floor(Math.random() * 1000) % filterLen;
          // Make sure its not the beginning default types
          if (selection <= 2) {
            selection = 4;
          }
          cy.log(`Filter: ${filter}, Selection: ${selection}`);

          // Make sure new selection isnt All
          projPage.filterProjects(filter, selection);
          projPage
            .projectsList()
            .children()
            .its("length")
            .then((length) => {
              expect(length).to.be.lessThan(allLength);
            });

          // Reset to Top 10 for next tests
          projPage.filterProjects(0, 1);
        });
      });

      describe(`The projects title and list are rendering correctly at Viewport ${viewportDisplay(
        viewport
      )}`, () => {
        it("The Projects list title is rendering the correct styling", () => {
          projPage
            .projectsTitle()
            .should("be.visible")
            .then(($h1) => {
              expect($h1).to.have.css("margin-bottom");
              expect($h1).to.have.css("text-align", "center");
              expect($h1).to.have.css("color", "rgb(230, 255, 243)");
              expect($h1).to.have.css("font-size");
              expect(parseFloat($h1.css("font-size")))
                .to.be.lte(48)
                .and.to.be.gte(20);
            });
        });

        it("The projects list conatiner is rendering the correct styling", () => {
          projPage
            .projectsList()
            .should("be.visible")
            .then(($ul) => {
              expect($ul).to.have.css("position", "relative");
              expect($ul).to.have.css("display", "flex");
              expect($ul).to.have.css("flex-wrap", "wrap");
              expect($ul).to.have.css("justify-content", "center");
              expect($ul).to.have.css("padding", "0px");
            });
        });
      });

      describe(`The project items are rendering correctly at Viewport ${viewportDisplay(
        viewport
      )}`, () => {
        before(() => {
          projPage.filterProjects(0, 1);
        });

        it("The projects list item containers are rendering the correct styling", () => {
          let oddEven = getOddEven();
          projPage.getProjectsLength().then((projects) => {
            for (let i = 0; i < projects; i++) {
              if (i % 2 == oddEven) {
                projPage.projectItem(i).then(($li) => {
                  expect($li).to.have.css("list-style", "outside none none");
                  expect($li).to.have.css("position", "relative");
                  expect($li).to.have.css("width");
                  expect($li).to.have.css("height");
                  expect($li).to.have.css("margin");
                });
              }
            }
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
                  .should("have.length", 1)
                  .first()
                  .then(($flipCard) => {
                    expect($flipCard).to.have.prop("tagName", "ARTICLE");

                    cy.wrap($flipCard)
                      .find("#projectDisplayCard")
                      .should("have.length", 1)
                      .first()
                      .should("be.visible");

                    cy.wrap($flipCard)
                      .find("#projectDetailCard")
                      .should("have.length", 1)
                      .first()
                      .should("not.be.visible");
                  });
              }
            }
          });
        });

        it("Project items display cards are rendering the correct layout", () => {
          let oddEven = getOddEven();
          projPage.getProjectsLength().then((projects) => {
            for (let i = 0; i < projects; i++) {
              if (i % 2 == oddEven) {
                projPage
                  .projectItem(i)
                  .children()
                  .first()
                  .find("#projectDisplayCard")
                  .should("have.length", 1)
                  .first()
                  .children()
                  .should("have.length", 2)
                  .then(($displayChildren) => {
                    cy.wrap($displayChildren)
                      .eq(0)
                      .then(($img) => {
                        expect($img).to.have.prop("tagName", "IMG");
                      });

                    cy.wrap($displayChildren)
                      .eq(1)
                      .then(($p) => {
                        expect($p).to.have.prop("tagName", "P");
                      });
                  });
              }
            }
          });
        });

        it("Project items display card containers are rendering the correct styling", () => {
          let oddEven = getOddEven();
          projPage.getProjectsLength().then((projects) => {
            for (let i = 0; i < projects; i++) {
              if (i % 2 == oddEven) {
                projPage
                  .projectItem(i)
                  .children()
                  .first()
                  .find("#projectDisplayCard")
                  .first()
                  .then(($display) => {
                    expect($display).to.have.css("display", "flex");
                    expect($display).to.have.css("flex-direction", "column");
                    expect($display).to.have.css(
                      "justify-content",
                      "space-evenly"
                    );
                    expect($display).to.have.css("align-items", "center");
                    expect($display).to.have.css("width");
                    expect($display).to.have.css("height");
                    expect($display).to.have.css("padding");
                    expect($display).to.have.css(
                      "background-color",
                      "rgb(18, 15, 15)"
                    );
                    expect($display).to.have.css(
                      "border",
                      "1.5px solid rgb(164, 255, 182)"
                    );
                    expect($display).to.have.css("border-radius", "20px");
                    expect($display).to.have.css("box-shadow");
                  });
              }
            }
          });
        });

        it("Project items display card children are rendering the correct styling", () => {
          let oddEven = getOddEven();
          projPage.getProjectsLength().then((projects) => {
            for (let i = 0; i < projects; i++) {
              if (i % 2 == oddEven) {
                projPage
                  .projectItem(i)
                  .children()
                  .first()
                  .find("#projectDisplayCard")
                  .first()
                  .children()
                  .then(($displayChildren) => {
                    cy.wrap($displayChildren)
                      .eq(0)
                      .then(($img) => {
                        expect($img).to.have.css("margin");
                        expect($img).to.have.css("width");
                        expect(parseFloat($img.css("width"))).to.be.lte(440);
                        expect($img).to.have.css("height");
                        expect(parseFloat($img.css("height")))
                          .to.be.lte(340)
                          .and.to.be.gte(120);
                      });

                    cy.wrap($displayChildren)
                      .eq(1)
                      .then(($p) => {
                        expect($p).to.have.css("margin");
                        expect($p).to.have.css("text-align", "center");
                        expect($p).to.have.css("color", "rgb(230, 255, 243)");
                        expect($p).to.have.css("font-size");
                        expect(parseFloat($p.css("font-size")))
                          .to.be.lte(42)
                          .and.to.be.gte(16);
                        expect($p).to.have.css("font-weight", "800");
                        expect($p).to.have.css("letter-spacing", "2px");
                      });
                  });
              }
            }
          });
        });

        it("Projects Items hover flips the project cards rendering side", () => {
          let oddEven = getOddEven();
          projPage.getProjectsLength().then((projects) => {
            for (let i = 0; i < projects; i++) {
              if (i % 2 == oddEven) {
              }
            }
          });
        });

        it("Project items detail cards are rendering the correct layout", () => {
          let oddEven = getOddEven();
          projPage.getProjectsLength().then((projects) => {
            for (let i = 0; i < projects; i++) {
              if (i % 2 == oddEven) {
                projPage
                  .projectItem(i)
                  .children()
                  .first()
                  .realHover({ position: "center", scrollBehavior: "center" })
                  .wait(4000)
                  .then(($li) => {
                    cy.wrap($li)
                      .find("#projectDetailCard")
                      .should("have.length", 1)
                      .first()
                      .should("be.visible")
                      .children()
                      .should("have.length", 3)
                      .then(($detailChildren) => {
                        cy.wrap($detailChildren)
                          .eq(0)
                          .should("be.visible")
                          .then(($title) => {
                            expect($title).to.have.prop("tagName", "H2");
                          });

                        cy.wrap($detailChildren)
                          .eq(1)
                          .should("be.visible")
                          .then(($desc) => {
                            expect($desc).to.have.prop("tagName", "P");
                          });

                        cy.wrap($detailChildren)
                          .eq(2)
                          .should("be.visible")
                          .then(($button) => {
                            expect($button).to.have.prop("tagName", "BUTTON");
                          });
                      });
                  });
              }
            }
          });
        });

        it("Project items detail card containers are rendering the correct styling", () => {
          let oddEven = getOddEven();
          projPage.getProjectsLength().then((projects) => {
            for (let i = 0; i < projects; i++) {
              if (i % 2 == oddEven) {
                projPage
                  .projectItem(i)
                  .children()
                  .first()
                  .realHover({ position: "center", scrollBehavior: "center" })
                  .wait(1500)
                  .then(($li) => {
                    cy.wrap($li)
                      .find("#projectDetailCard")
                      .first()
                      .then(($detail) => {
                        expect($detail).to.have.css("display", "flex");
                        expect($detail).to.have.css("flex-direction", "column");
                        expect($detail).to.have.css(
                          "justify-content",
                          "space-evenly"
                        );
                        expect($detail).to.have.css("align-items", "center");
                        expect($detail).to.have.css("width");
                        expect($detail).to.have.css("height");
                        expect($detail).to.have.css("padding");
                        expect($detail).to.have.css(
                          "color",
                          "rgb(230, 255, 243)"
                        );
                        expect($detail).to.have.css(
                          "background-color",
                          "rgb(18, 15, 15)"
                        );
                        expect($detail).to.have.css(
                          "border",
                          "1.5px solid rgb(164, 255, 182)"
                        );
                        expect($detail).to.have.css("border-radius", "20px");
                        expect($detail).to.have.css("box-shadow");
                      });
                  });
              }
            }
          });
        });

        it("Project items detail cards children are rendering the correct styling", () => {
          let oddEven = getOddEven();
          projPage.getProjectsLength().then((projects) => {
            for (let i = 0; i < projects; i++) {
              if (i % 2 == oddEven) {
                projPage
                  .projectItem(i)
                  .children()
                  .first()
                  .realHover({ position: "center", scrollBehavior: "center" })
                  .wait(1500)
                  .then(($li) => {
                    cy.wrap($li)
                      .find("#projectDetailCard")
                      .first()
                      .children()
                      .then(($detailChildren) => {
                        cy.wrap($detailChildren)
                          .eq(0)
                          .then(($h2) => {
                            expect($h2).to.have.css("flex", "1 1 0%");
                            expect($h2).to.have.css(
                              "color",
                              "rgb(164, 255, 182)"
                            );
                            expect($h2).to.have.css("font-size");
                            expect(parseFloat($h2.css("font-size")))
                              .to.be.lte(48)
                              .and.to.be.gte(20);
                          });

                        cy.wrap($detailChildren)
                          .eq(1)
                          .then(($p) => {
                            expect($p).to.have.css("flex", "4 1 0%");
                            expect($p).to.have.css(
                              "color",
                              "rgb(230, 255, 243)"
                            );
                            expect($p).to.have.css("width");
                            expect($p).to.have.css("font-size");
                            expect(parseFloat($p.css("font-size")))
                              .to.be.lte(30)
                              .and.to.be.gte(12);
                            expect($p).to.have.css("overflow", "scroll");
                            expect($p).to.have.css("transform");
                          });

                        cy.wrap($detailChildren)
                          .eq(2)
                          .then(($button) => {
                            expect($button).to.have.css("aspect-ratio");
                            expect($button).to.have.css("width");
                            expect($button).to.have.css("font-size");
                            expect(parseFloat($button.css("font-size")))
                              .to.be.lte(30)
                              .and.to.be.gte(12);
                            expect($button).to.have.css(
                              "color",
                              "rgb(164, 255, 182)"
                            );
                            expect($button).to.have.css(
                              "background-color",
                              "rgb(85, 84, 84)"
                            );
                            expect($button).to.have.css(
                              "border",
                              "1px solid rgb(164, 255, 182)"
                            );
                            expect($button).to.have.css("box-shadow");
                          });
                      });
                  });
              }
            }
          });
        });
      });

      //! ==================================

      describe(`The projects detail modals are render correctly at Viewport ${viewportDisplay(
        viewport
      )}`, () => {
        let oddEven: number = 0;
        before(() => {
          projPage.filterProjects(0, 1);
          oddEven = getOddEven();
        });
        for (let i = oddEven; i < 10; i += 2) {
          it(`${
            Math.floor(i / 2) + 1
          }/5: The project detail modal, ${i} activates correctly`, () => {
            // Ensure modal is closed before opening
            projPage.projectDetailModal().should("not.exist");
            projPage.openDetailModal(projPage.projectItem(i));
            // Detail Modal covers items
            projPage.projectDetailModal().should("be.visible");
            projPage.modalUnderlay().should("be.exist");
            cy.wait(1000);
          });

          it(`${
            Math.floor(i / 2) + 1
          }/5: The project detail modal, ${i} is rendering the correct layout`, () => {
            // Check Modal's layout
            projPage
              .projectDetailModal()
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
            cy.wait(1000);
          });

          it(`${
            Math.floor(i / 2) + 1
          }/5: The project detail modal, ${i} close button has the correct stylings`, () => {
            // Check Modal's Button stylings
            projPage
              .projectDetailModal()
              .children()
              .then(($children) => {
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
                    expect(parseFloat($button.css("width")))
                      .to.be.lte(60)
                      .and.to.be.gte(25);
                    expect($button).to.have.css("height");
                    expect(parseFloat($button.css("width")))
                      .to.be.lte(60)
                      .and.to.be.gte(25);
                    expect($button).to.have.css("font-size");
                    expect(parseFloat($button.css("font-size")))
                      .to.be.lte(36)
                      .and.to.be.gte(20);
                    expect($button).to.have.css("color", "rgb(230, 255, 243)");
                    expect($button).to.have.css(
                      "background-color",
                      "rgb(12, 43, 33)"
                    );
                    expect($button).to.have.css(
                      "border",
                      "1.5px solid rgb(230, 255, 243)"
                    );
                    expect($button).to.have.css("border-radius");
                  });
              });
            cy.wait(1000);
          });

          it(`${
            Math.floor(i / 2) + 1
          }/5: The project detail modal, ${i} main container is rendering the correct stylings`, () => {
            // Check Modal's main stylings
            projPage
              .projectDetailModal()
              .should("be.visible")
              .then(($div) => {
                expect($div).to.have.css("position", "fixed");
                expect($div).to.have.css("left");
                expect($div).to.have.css("bottom");
                expect(parseFloat($div.css("bottom"))).to.be.lte(60);
                expect($div).to.have.css("transform");
                expect($div).to.have.css("z-index");
                expect($div).to.have.css("display", "flex");
                expect($div).to.have.css("padding");
                expect($div).to.have.css("width");
                expect(parseFloat($div.css("width"))).to.be.lte(1300);
                expect($div).to.have.css("height");
                expect(parseFloat($div.css("height"))).to.be.gte(460);
                expect($div).to.have.css("color", "rgb(164, 255, 182)");
                expect($div).to.have.css("background-color", "rgb(18, 15, 15)");
                expect($div).to.have.css("border-radius", "30px");
                expect($div).to.have.css("box-shadow");
              });
            cy.wait(1000);
          });

          it(`${
            Math.floor(i / 2) + 1
          }/5: The project detail modal: ${i}, left side has the correct stylings`, () => {
            // Check Modal's left side stylings
            projPage
              .projectDetailModal()
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
                        expect(parseFloat($img.css("width"))).to.be.lte(
                          630 * 1.05
                        );
                        expect($img).to.have.css("height");
                        expect(parseFloat($img.css("height")))
                          .to.be.lte(510 * 1.05)
                          .and.to.be.gte(200);
                        expect($img).to.have.css("border-radius", "20px");
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
                        expect($div).to.have.css("width");

                        // Project link stylings
                        cy.wrap($div)
                          .children()
                          .each(($children) => {
                            expect($children).to.have.css("display", "flex");
                            expect($children).to.have.css(
                              "flex-direction",
                              "column"
                            );
                            expect($children).to.have.css(
                              "justify-content",
                              "center"
                            );
                            expect($children).to.have.css(
                              "align-items",
                              "center"
                            );
                            expect($children).to.have.css("padding");
                            expect($children).to.have.css("margin");
                            expect($children).to.have.css(
                              "text-align",
                              "center"
                            );
                            expect($children).to.have.css("max-width");
                            expect($children).to.have.css("font-size");
                            getWindowInnerWidth().then((width) => {
                              if (width <= 600) {
                                expect(parseFloat($children.css("font-size")))
                                  .to.be.lte(30)
                                  .and.to.be.gte(12);
                              } else {
                                expect(parseFloat($children.css("font-size")))
                                  .to.be.lte(34)
                                  .and.to.be.gte(14);
                              }
                            });
                            expect($children).to.have.css(
                              "color",
                              "rgb(230, 255, 243)"
                            );
                            expect($children).to.have.css(
                              "background-color",
                              "rgb(85, 84, 84)"
                            );
                            expect($children).to.have.css("border-radius");
                            expect($children).to.have.css("box-shadow");
                          });
                      });
                  });
              });
            cy.wait(1000);
          });

          it(`${
            Math.floor(i / 2) + 1
          }/5: The project detail modal, ${i} right side has the correct stylings`, () => {
            // Check Modal's right side stylings
            projPage
              .projectDetailModal()
              .children()
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
                    expect($h2).to.have.css("height");
                    expect($h2).to.have.css("text-align", "left");
                    expect($h2).to.have.css("color", "rgb(164, 255, 182)");
                    expect($h2).to.have.css("font-size");
                    expect(parseFloat($h2.css("font-size")))
                      .to.be.lte(48)
                      .and.to.be.gte(20);
                    expect($h2).to.have.css("transform");
                  });

                // Project Description stylings
                cy.wrap($div)
                  .children()
                  .eq(1)
                  .then(($p) => {
                    expect($p).to.have.css("flex", "3 1 0%");
                    expect($p).to.have.css("height");
                    expect($p).to.have.css("color", "rgb(230, 255, 243)");
                    expect($p).to.have.css("font-size");
                    expect(parseFloat($p.css("font-size")))
                      .to.be.lte(34)
                      .and.to.be.gte(14);
                    expect($p).to.have.css("line-height");
                    expect(parseFloat($p.css("line-height")))
                      .to.be.lte(50)
                      .and.to.be.gte(16);
                    expect($p).to.have.css("text-indent");
                    expect($p).to.have.css("overflow", "scroll");
                    expect($p).to.have.css("transform");
                  });

                // Technologies Title stylings
                cy.wrap($div)
                  .children()
                  .eq(2)
                  .then(($h3) => {
                    expect($h3).to.have.css("height");
                    expect($h3).to.have.css("font-size");
                    expect(parseFloat($h3.css("font-size")))
                      .to.be.lte(32)
                      .and.to.be.gte(10);
                    expect($h3).to.have.css("line-height");
                    expect(parseFloat($h3.css("line-height")))
                      .to.be.lte(30)
                      .and.to.be.gte(14);
                    expect($h3).to.have.css("transform");
                  });

                // Technologies Listing stylings
                cy.wrap($div)
                  .children()
                  .eq(3)
                  .then(($ul) => {
                    expect($ul).to.have.css("display", "flex");
                    expect($ul).to.have.css("flex-wrap", "wrap");
                    expect($ul).to.have.css("padding", "0px");
                    expect($ul).to.have.css("width");
                    expect($ul).to.have.css("height");
                    expect($ul).to.have.css("margin-bottom");
                    expect($ul).to.have.css("transform");
                    expect($ul).to.have.css(
                      "background-color",
                      "rgba(0, 0, 0, 0)"
                    );
                    expect($ul).to.have.css("overflow-x", "auto");
                    expect($ul).to.have.css("overflow-y", "scroll");
                    expect($ul).to.have.css("list-style-type", "none");
                    // Technology Item stylings
                    cy.wrap($ul)
                      .children()
                      .each(($li) => {
                        expect($ul).to.have.css(
                          "list-style",
                          "outside none none"
                        );
                        expect($li).to.have.css("display", "flex");
                        expect($li).to.have.css("align-items", "center");
                        expect($li).to.have.css("justify-content", "center");
                        expect($li).to.have.css("margin");
                        expect($li).to.have.css("padding");
                        expect($li).to.have.css("overflow-y", "scroll");
                        expect($li).to.have.css("font-size");
                        expect($li).to.have.css("color", "rgb(230, 255, 243)");
                        expect($li).to.have.css(
                          "background-color",
                          "rgb(12, 43, 33)"
                        );
                        expect($li).to.have.css("border-radius");
                        expect($li).to.have.css("box-shadow");
                      });
                  });
              });
            cy.wait(1000);
          });

          it(`${
            Math.floor(i / 2) + 1
          }/5: The project detail modal, ${i} has the noticable hover effects`, () => {
            // Check Modal's interactivity
            projPage
              .projectDetailModal()
              .children()
              .then(($children) => {
                // Project Links hover effects
                cy.wrap($children)
                  .eq(0)
                  .find("div#projectLinks")
                  .first()
                  .children()
                  .each(($a) => {
                    expect($a).to.have.css("color", "rgb(230, 255, 243)");
                    expect($a).to.have.css(
                      "background-color",
                      "rgb(85, 84, 84)"
                    );
                    expect($a).to.have.css("transform", "none");

                    cy.wrap($a)
                      .realHover()
                      .then(($a) => {
                        expect($a).to.have.css("color", "rgb(12, 43, 33)");
                        expect($a).to.have.css(
                          "background-color",
                          "rgb(164, 255, 182)"
                        );
                        expect($a).to.have.css("transform").to.not.eq("none");
                      });
                  });

                // Projects Techs hovering effects
                cy.wrap($children)
                  .eq(1)
                  .find("ul")
                  .first()
                  .children()
                  .each(($li) => {
                    expect($li).to.have.css("color", "rgb(230, 255, 243)");
                    expect($li).to.have.css("transform", "none");

                    cy.wrap($li)
                      .realHover()
                      .then(($li) => {
                        expect($li).to.have.css("color", "rgb(164, 255, 182)");
                        expect($li).to.have.css("transform").to.not.eq("none");
                      });
                  });

                // Close Button hovering effects
                cy.wrap($children)
                  .eq(2)
                  .then(($button) => {
                    expect($button).to.have.css("color", "rgb(230, 255, 243)");
                    expect($button).to.have.css(
                      "background-color",
                      "rgb(12, 43, 33)"
                    );
                    expect($button).to.have.css("box-shadow", "none");

                    cy.wrap($button)
                      .realHover({ position: "center" })
                      .then(($hover) => {
                        expect($button).to.have.css(
                          "color",
                          "rgb(164, 255, 182)"
                        );
                        expect($hover).to.have.css(
                          "background-color",
                          "rgb(85, 84, 84)"
                        );
                        expect($hover)
                          .to.have.css("box-shadow")
                          .to.not.eq("none");
                      });
                  });
              });
            cy.wait(1000);
          });

          it(`${
            Math.floor(i / 2) + 1
          }/5: The project detail modal, ${i} closes correctly`, () => {
            // Detail Modal closes with the closing button
            projPage.projectDetailModal().should("be.exist");
            projPage.closeDetailModal();
            cy.wait(2000);
            projPage.projectDetailModal().should("not.be.exist");
            cy.wait(1000);
          });
        }
      });
    }
  );

  if (!Cypress.env("FULL_SPECTRUM")) {
    break;
  }
}
