/** @format */

import { WorkPage } from "../page-objects/WorkPage";
import {
  BASEURL,
  getOddEven,
  getWindowInnerWidth,
  setupPageWithTheme,
  viewPortSetup,
  viewportDisplay,
  viewports,
} from "../support/e2e";

const WORKURL = BASEURL + "/experience/work";
const workPage = new WorkPage();

for (let viewport of viewports) {
  context("Work Page render testing", () => {
    before(() => {
      setupPageWithTheme(WORKURL, "dark");
      cy.wait(1000);
    });

    beforeEach(() => {
      viewPortSetup(viewport);
      cy.wait(500);
    });

    describe(`Work Page Container rendering on Viewport: ${viewportDisplay(
      viewport
    )}`, () => {
      it("Container is rendering the correct layout", () => {
        workPage
          .getWorkContainer()
          .should("be.visible")
          .children()
          .should("have.length", 3)
          .then(($children) => {
            // Intro Section
            cy.wrap($children)
              .eq(0)
              .should("be.visible")
              .and("have.prop", "tagName", "SECTION");
            // Work Toggle nav
            cy.wrap($children)
              .eq(1)
              .should("be.visible")
              .and("have.prop", "tagName", "NAV");
            // Work items list
            cy.wrap($children)
              .eq(2)
              .should("be.visible")
              .and("have.prop", "tagName", "UL");
          });
      });

      it("Container is rendering the correct styling", () => {
        workPage.getWorkContainer().then(($container) => {
          expect($container).to.have.css("margin");
          expect($container).to.have.css("padding");
        });
      });
    });

    describe(`Work Page Intro rendering on Viewport: ${viewportDisplay(
      viewport
    )}`, () => {
      it("Intro is rendering the correct layout", () => {
        workPage
          .getWorkIntro()
          .should("be.visible")
          .children()
          .should("have.length", 2)
          .then(($children) => {
            cy.wrap($children)
              .eq(0)
              .should("be.visible")
              .and("have.prop", "tagName", "H1")
              .and("have.text", "Professional Experience");
            cy.wrap($children)
              .eq(1)
              .should("be.visible")
              .and("have.prop", "tagName", "DIV")
              .children()
              .should("have.length", 2)
              .then(($bodyChildren) => {
                getWindowInnerWidth().then((width) => {
                  if (width > 900) {
                    cy.wrap($bodyChildren).eq(0).should("be.visible");
                  } else {
                    cy.wrap($bodyChildren).eq(0).should("not.be.visible");
                  }
                });

                cy.wrap($bodyChildren)
                  .eq(1)
                  .should("be.visible")
                  .and("have.prop", "tagName", "P");
              });
          });
      });

      it("Intro container and title is rendering the correct styling", () => {
        workPage
          .getWorkIntro()
          .should("have.css", "display", "block")
          .children()
          .eq(0)
          .then(($title) => {
            expect($title).to.have.css("position", "relative");
            expect($title).to.have.css("margin");
            expect($title).to.have.css("text-align", "center");
            expect($title).to.have.css("font-size");
            expect(parseFloat($title.css("font-size")))
              .to.be.lte(66)
              .and.to.be.gte(26);
            expect($title).to.have.css("color", "rgb(164, 255, 182)");
          });
      });

      it("Intro Body is rendering the correct text", () => {
        workPage
          .getWorkIntro()
          .children("div")
          .first()
          .children("p")
          .first()
          .should("include.text", "leadership experience")
          .and("include.text", "development experience");
      });

      it("Intro Body is rendering the correct styling", () => {
        workPage
          .getWorkIntro()
          .children()
          .eq(1)
          // Test Intro body container
          .then(($body) => {
            expect($body).to.have.css("display", "flex");
            expect($body).to.have.css("align-items", "center");
            expect($body).to.have.css("justify-content", "space-evenly");
            expect($body).to.have.css("padding");
          })
          .children()
          .then(($bodyChildren) => {
            // Test intro body image
            cy.wrap($bodyChildren)
              .eq(0)
              .then(($img) => {
                expect($img).to.have.css("position", "relative");
                expect($img).to.have.css("bottom");
              });

            // Test intro body text
            cy.wrap($bodyChildren)
              .eq(1)
              .then(($p) => {
                expect($p).to.have.css("position", "relative");
                expect($p).to.have.css("margin");
                expect($p).to.have.css("width");
                expect($p).to.have.css("padding");
                expect($p).to.have.css("text-align", "center");
                expect($p).to.have.css("font-size");
                expect(parseFloat($p.css("font-size")))
                  .to.be.lte(50)
                  .and.to.be.gte(24);
                expect($p).to.have.css("color", "rgb(230, 255, 243)");
              });
          });
      });
    });

    describe(`Work Page Filter rendering on Viewport: ${viewportDisplay(
      viewport
    )}`, () => {
      it("Toggle container is rendering the correct layout", () => {
        workPage
          .getToggleSection()
          .should("be.visible")
          .children()
          .should("have.length", 2)
          .each(($toggles, idx) => {
            expect($toggles).to.have.prop("tagName", "BUTTON");
            expect($toggles).to.include.text(
              idx === 0 ? "Work" : "Internship / Volunteer"
            );
          });
      });

      it("Toggle container is rendering the correct styling", () => {
        workPage.getToggleSection().then(($container) => {
          expect($container).to.have.css("position", "relative");
          expect($container).to.have.css("left");
          expect($container).to.have.css("transform").to.not.eq("none");
          expect($container).to.have.css("display", "flex");
          expect($container).to.have.css("align-items", "center");
          expect($container).to.have.css("justify-content", "space-evenly");
          expect($container).to.have.css("margin-bottom");
          expect($container).to.have.css("height");
          expect(parseFloat($container.css("height"))).to.be.lte(75);
          expect($container).to.have.css("max-width", "1500px");
        });
      });

      const toggleItem = (idx: number) => {
        return workPage.getWorkToggle(idx);
      };

      for (let idx of [0, 1]) {
        it(`Toggle item ${idx + 1} is rendering the correct styling`, () => {
          // Get toggle
          let toggle = toggleItem(idx);
          // General Toggle styling
          toggle.then(($toggle) => {
            expect($toggle).to.have.css("display", "flex");
            expect($toggle).to.have.css("align-items", "center");
            expect($toggle).to.have.css("justify-content", "center");
            expect($toggle).to.have.css("margin");
            expect($toggle).to.have.css("width");
            expect($toggle).to.have.css("height");
            expect($toggle).to.have.css("padding");
            expect($toggle).to.have.css("font-size");
            expect(parseFloat($toggle.css("font-size")))
              .to.be.lte(36)
              .and.to.be.gte(12);
            expect($toggle).to.have.css("color", "rgb(230, 255, 243)");
            expect($toggle).to.have.css("border-radius", "10px");
            expect($toggle).to.have.css("transition").to.not.eq("none");
          });
          // Default Active style testing
          if (idx === 0) {
            workPage.activeToggleTest(toggle);
          } else {
            workPage.inactiveToggleTest(toggle);
          }
        });

        it(`Toggle item ${
          idx + 1
        } is rendering hover effects correctly`, () => {
          toggleItem(idx)
            .should("be.visible")
            .then((toggle) => {
              let width = parseFloat(toggle.css("width"));

              cy.wrap(toggle)
                .then(($toggle) => {
                  expect($toggle).to.have.css("border-radius", "10px");
                })
                .realHover({ position: "center", scrollBehavior: "center" })
                .wait(2000)
                .then(($toggle) => {
                  expect(toggle).to.have.css(
                    "background-color",
                    "rgb(85, 84, 84)"
                  );
                  expect(toggle).to.have.css(
                    "border",
                    "1px solid rgb(230, 255, 243)"
                  );
                  expect($toggle).to.have.css("border-radius", "20px");
                  expect(toggle).to.have.css("box-shadow").to.not.eq("none");
                  expect(toggle).to.have.css("transform").to.not.eq("none");
                  expect(toggle).to.have.css("opacity", "1");
                  expect(parseFloat(toggle.css("width"))).to.not.eq(width);
                });
            });
        });
      }

      it("Toggling items effectively change their stylings", () => {
        cy.get("body")
          .realHover({ position: "right", scrollBehavior: "center" })
          .wait(1000)
          .then(() => {
            // Expect Work to be default active
            workPage.activeToggleTest(toggleItem(0));
            workPage.inactiveToggleTest(toggleItem(1));
          });

        // Toggle Volunteer work
        toggleItem(1)
          .realClick({ position: "center", scrollBehavior: "center" })
          .wait(1000);

        cy.get("body")
          .realHover({ position: "right", scrollBehavior: "center" })
          .wait(1000)
          .then(() => {
            // Expect the Volunteer work to be active
            workPage.inactiveToggleTest(toggleItem(0));
            workPage.activeToggleTest(toggleItem(1));
          });

        // Reseet Toggles
        toggleItem(0)
          .realClick({ position: "center", scrollBehavior: "center" })
          .wait(1000);
      });

      it("Toggling item effictively change the work displayed", () => {
        let children: JQuery<HTMLElement>[] = [];
        // Get first to list elements
        workPage
          .getWorkList()
          .children()
          .first()
          .then((child1) => {
            children.push(child1);
          })
          .next()
          .then((child2) => {
            children.push(child2);
          });

        // Toggle Volunteer work
        toggleItem(1)
          .realClick({ position: "center", scrollBehavior: "center" })
          .wait(1000);
        // Expect the first two elements to be different
        workPage
          .getWorkList()
          .children()
          .first()
          .then((child1) => {
            expect(child1).not.to.eq(children[0]);
          })
          .next()
          .then((child2) => {
            expect(child2).to.not.eq(children[1]);
          });

        // Reseet Work
        toggleItem(0)
          .realClick({ position: "center", scrollBehavior: "center" })
          .wait(1000);
      });
    });

    describe(`Work Page List and Items Rendering on Viewport: ${viewportDisplay(
      viewport
    )}`, () => {
      it("List is rendering the correct layout", () => {
        workPage
          .getWorkList()
          .should("be.visible")
          .and("have.prop", "tagName", "UL")
          .then((list) => {
            let length = 0;
            cy.wrap(list)
              .children("li")
              .then((children) => {
                length = children.length;
              });

            // Expect all children to be equal to li children
            cy.wrap(list)
              .children()
              .then((children) => {
                expect(children).to.have.length(length);
              });
          });
      });

      it("List container is rendering the correct styling", () => {
        workPage.getWorkList().then((list) => {
          expect(list).to.have.css("position", "relative");
          expect(list).to.have.css("left");
          expect(list).to.have.css("transform").to.not.eq("none");
          expect(list).to.have.css("padding");
          expect(list).to.have.css("max-width", "1500px");
        });
      });

      it("List items are rendering the correct layout", () => {
        workPage.getOddEvenListItems().each((child) => {
          cy.wrap(child)
            .children()
            .should("have.length", 2)
            .then((children) => {
              cy.wrap(children)
                .eq(0)
                .then((imgHolder) => {
                  cy.wrap(imgHolder).children().should("have.length", 1);
                });
              cy.wrap(children)
                .eq(1)
                .then((body) => {
                  cy.wrap(body).children().should("have.length", 3);
                });

              return cy.wrap(children);
            })
            .each((child) => {
              expect(child).to.have.prop("tagName", "DIV");
            });
        });
      });

      it("List item containers are rendering the correct styling", () => {
        workPage.getOddEvenListItems().each((item) => {
          expect(item).to.have.css("list-style", "outside none none");
          expect(item).to.have.css("position", "relative");
          expect(item).to.have.css("display", "flex");
          expect(item).to.have.css("align-items", "center");
          expect(item).to.have.css("margin");
          expect(item).to.have.css("padding");
          expect(item).to.have.css("color", "rgb(230, 255, 243)");
          expect(item).to.have.css("background-color", "rgb(85, 84, 84)");
          expect(item).to.have.css("border-radius", "20px");
          expect(item).to.have.css("box-shadow").to.not.eq("none");
        });
      });

      it("List item images are rendering the correct styling", () => {
        workPage.getOddEvenListItems().each((child) => {
          cy.wrap(child)
            .find("img")
            .first()
            .then((img) => {
              expect(img).to.have.css("position", "relative");
              expect(img).to.have.css("right");
              expect(img).to.have.css("display", "flex");
              expect(img).to.have.css("margin");
              expect(img).to.have.css("width");
              expect(parseFloat(img.css("width")))
                .to.be.lte(160)
                .and.to.be.gte(70);
              expect(img).to.have.css("height");
              expect(parseFloat(img.css("height")))
                .to.be.lte(160)
                .and.to.be.gte(70);
              expect(img).to.have.css("border-radius");
              expect(img).to.have.css("box-shadow").to.not.eq("none");
            });
        });
      });

      it("List item bodies are rendering the correct styling", () => {
        getWindowInnerWidth().then((width) => {
          workPage.getOddEvenListItems().each((child) => {
            cy.wrap(child)
              .children()
              .eq(1)
              .then((workBody) => {
                // Work body tests
                expect(workBody).to.have.css("width");
                expect(workBody).to.have.css("color", "rgb(230, 255, 243)");

                cy.wrap(workBody)
                  .children("div")
                  .then((children) => {
                    // Section testing function
                    const testSectionStyle = (section: JQuery<HTMLElement>) => {
                      expect(section).to.have.css("display", "flex");
                      expect(section).to.have.css(
                        "justify-content",
                        "space-between"
                      );
                      if (width <= 550) {
                        expect(section).to.have.css("flex-direction", "column");
                      }
                    };
                    // Job title section testing
                    cy.wrap(children)
                      .eq(0)
                      .then((section) => {
                        // Test section styles
                        testSectionStyle(section);
                        if (width <= 550) {
                          expect(section).to.have.css(
                            "margin",
                            "20px 0px 10px"
                          );
                        }
                        // Test children styles
                        cy.wrap(section)
                          .children()
                          .first()
                          .then((jobTitle) => {
                            expect(jobTitle).to.have.css("margin");
                            expect(jobTitle).to.have.css("font-size");
                            expect(parseFloat(jobTitle.css("font-size")))
                              .to.be.lte(34)
                              .and.to.be.gte(14);
                            expect(jobTitle).to.have.css("font-weight", "900");
                            expect(jobTitle).to.have.css(
                              "color",
                              "rgb(164, 255, 182)"
                            );
                          })
                          .next()
                          .then((date) => {
                            expect(date).to.have.css("margin", "0px");
                            expect(date).to.have.css("font-size");
                            expect(parseFloat(date.css("font-size")))
                              .to.be.lte(24)
                              .and.to.be.gte(10);
                            expect(date).to.have.css(
                              "color",
                              "rgb(230, 255, 243)"
                            );
                          });
                      });

                    // Company name section testing
                    cy.wrap(children)
                      .eq(1)
                      .then((section) => {
                        // Test section styles
                        testSectionStyle(section);
                        if (width <= 550) {
                          expect(section).to.have.css("text-align", "right");
                        }
                        // Test children styles
                        cy.wrap(section)
                          .children()
                          .first()
                          .then((company) => {
                            expect(company).to.have.css("margin", "0px");
                            expect(company).to.have.css("font-size");
                            expect(parseFloat(company.css("font-size")))
                              .to.be.lte(30)
                              .and.to.be.gte(12);
                            expect(company).to.have.css("font-weight", "800");
                            expect(company).to.have.css(
                              "color",
                              "rgb(230, 255, 243)"
                            );
                          })
                          .next()
                          .then((location) => {
                            expect(location).to.have.css("margin", "0px");
                            expect(location).to.have.css("font-size");
                            expect(parseFloat(location.css("font-size")))
                              .to.be.lte(24)
                              .and.to.be.gte(10);
                            expect(location).to.have.css(
                              "color",
                              "rgb(230, 255, 243)"
                            );
                          });
                      });
                  });
              });
          });
        });
      });

      it("List item details are rendering the correct styling", () => {
        workPage.getOddEvenListItems().each((child) => {
          cy.wrap(child)
            .find("ul")
            .first()
            .then((list) => {
              // Test detail list and item stylings
              expect(list).to.have.css("list-style", "outside none none");
              expect(list).to.have.css("padding");
            })
            .children("li")
            .each((li) => {
              expect(li).to.have.css("position", "relative");
              expect(li).to.have.css("margin-top", "20px");
              expect(li).to.have.css("font-size");
              expect(parseFloat(li.css("font-size")))
                .to.be.lte(24)
                .and.to.be.gte(10);
              expect(li).to.have.css("text-indent", "6px");
            });
        });
      });

      it("List item hover effects are rendering correctly", () => {
        workPage.getOddEvenListItems().each((item) => {
          const shadow = item.css("box-shadow");
          expect(item).to.have.css("transform", "none");

          cy.wrap(item)
            .realHover({ position: "center", scrollBehavior: "center" })
            .wait(800)
            .then(($item) => {
              expect($item).to.have.css("box-shadow").to.not.equal(shadow);
              expect($item).to.have.css("transform").to.not.equal("none");

              cy.wrap($item)
                .find("h2")
                .first()
                .then(($h2) => {
                  expect($h2).to.have.css("text-shadow").to.not.eq("none");
                });
              cy.wrap($item)
                .find("p")
                .each(($p) => {
                  expect($p).to.have.css("text-shadow").to.not.eq("none");
                });
              cy.wrap($item)
                .find("li")
                .each(($li) => {
                  expect($li).to.have.css("text-shadow").to.not.eq("none");
                });
            });
          cy.wait(300);
        });
      });
    });
  });

  if (!Cypress.env("FULL_SPECTRUM")) {
    break;
  }
}
