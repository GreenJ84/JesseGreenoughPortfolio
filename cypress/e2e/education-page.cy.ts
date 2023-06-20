/** @format */

/// <reference types="cypress" />

import {
  BASEURL,
  getOddEven,
  getWindowInnerWidth,
  setupPageWithTheme,
  viewPortSetup,
  viewports,
} from "../support/e2e";
import { viewportDisplay } from "../support/e2e";
import { EducationPage } from "../page-objects/EducationPage";

const EDUURL = BASEURL + "/experience/education";
const eduPage = new EducationPage();

for (let viewport of viewports) {
  context("Education Page render Testing", () => {
    before(() => {
      setupPageWithTheme(EDUURL, "dark");
      cy.wait(1000);
    });

    beforeEach(() => {
      viewPortSetup(viewport);
      cy.wait(1000);
    });

    describe(`Education Page container rendering at Viewport: ${viewportDisplay(
      viewport
    )}`, () => {
      it("The Page is rendering the correct layout", () => {
        eduPage
          .getPageContainer()
          .should("be.visible")
          .children()
          .should("have.length", 4)
          .then(($children) => {
            expect($children.eq(0)).to.be.visible;
            expect($children.eq(0)).to.have.prop("tagName", "P");

            expect($children.eq(1)).to.be.visible;
            expect($children.eq(1)).to.have.prop("tagName", "H1");
            expect($children.eq(1)).to.have.id("educationTitle");

            expect($children.eq(2)).to.be.visible;
            expect($children.eq(2)).to.have.prop("tagName", "SECTION");
            expect($children.eq(2)).to.have.id("degreeContainer");

            expect($children.eq(3)).to.be.visible;
            expect($children.eq(3)).to.have.prop("tagName", "SECTION");
            expect($children.eq(3)).to.have.id("certificationContainer");
          });
      });

      it("The Page container is rendering the correct styling", () => {
        eduPage
          .getPageContainer()
          .should("be.visible")
          .then(($main) => {
            expect($main).to.have.css("margin");
            expect($main).to.have.css("padding");
          });
      });

      it("Intro is rendering the correct text", () => {
        eduPage
          .getPageContainer()
          .children()
          .then(($children) => {
            expect($children.eq(0))
              .to.include.text("participate in tech-related activities")
              .and.to.include.text("further my understanding and knowledge");

            expect($children.eq(1)).to.have.text(
              "Educational Experience, Qualifications and Certifications"
            );
          });
      });

      it("Intro is rendering the correct styling", () => {
        eduPage.getPageContainer().within(($section) => {
          cy.wrap($section)
            .children("p")
            .first()
            .then(($p) => {
              expect($p).to.have.css("position", "relative");
              expect($p).to.have.css("margin");
              expect($p).to.have.css("width");
              expect(parseFloat($p.css("width"))).to.be.lte(900);
              expect($p).to.have.css("text-align", "center");
              expect($p).to.have.css("font-size");
              expect(parseFloat($p.css("font-size")))
                .to.be.lte(52)
                .and.to.be.gte(16);
              expect($p).to.have.css("color", "rgb(230, 255, 243)");
            });

          cy.wrap($section)
            .children("h1")
            .first()
            .then(($title) => {
              expect($title).to.have.css("position", "relative");
              expect($title).to.have.css("width");
              expect($title).to.have.css("margin");
              expect($title).to.have.css("text-align", "center");
              expect($title).to.have.css("font-size");
              expect($title).to.have.css("color", "rgb(164, 255, 182)");
              expect($title)
                .to.have.css("text-shadow")
                .match(/^rgb\(14, 215, 165\)(\s\d+px){3}/);
              expect($title).to.have.css("transform");
            });
        });
      });
    });

    describe(`Degree section rendering at Viewport: ${viewportDisplay(
      viewport
    )}`, () => {
      it("Degree section is rendering the correct layout", () => {
        eduPage.getDegreeContainer().within(($section) => {
          cy.wrap($section)
            .children()
            .should("have.length", 3)
            .then(($children) => {
              cy.wrap($children)
                .eq(0)
                .should("be.visible")
                .and("have.prop", "tagName", "H2");
              cy.wrap($children)
                .eq(1)
                .should("be.visible")
                .and("have.prop", "tagName", "svg");
              cy.wrap($children)
                .eq(2)
                .should("be.visible")
                .and("have.prop", "tagName", "UL");
            });
        });
      });

      it("Degree container is rendering the correct styling", () => {
        eduPage
          .getDegreeContainer()
          .should("have.css", "display", "block")
          .within(($section) => {
            cy.wrap($section)
              .children()
              .eq(0)
              .scrollIntoView()
              .then(($h2) => {
                expect($h2).to.have.css("position", "relative");
                expect($h2).to.have.css("margin");
                expect($h2).to.have.css("width");
                expect($h2).to.have.css("text-align", "center");
                expect($h2).to.have.css("font-size");
                expect(parseFloat($h2.css("font-size")))
                  .to.be.lte(60)
                  .and.to.be.gte(26);
                expect($h2).to.have.css("color", "rgb(164, 255, 182)");
                expect($h2)
                  .to.have.css("text-shadow")
                  .match(/^rgb\(164, 255, 182\)(\s\d+px){3}/);
                expect($h2).to.have.css("opacity", "1");
              });

            cy.wrap($section)
              .children()
              .eq(1)
              .then(($img) => {
                expect($img).to.have.css("position", "relative");
                expect($img).to.have.css("margin");
                expect($img).to.have.css("width");
                expect(parseFloat($img.css("width")))
                  .to.be.lte(900 * 1.1)
                  .and.to.be.gte(250 * 0.6);
                expect($img).to.have.css("height");
                expect($img).to.have.css("animation");
              });
          });
      });

      it("Degree items are rendering the correct layouts", () => {
        eduPage
          .getDegreeList()
          .children("li")
          // Test Each Degree item layout
          .each(($degree: JQuery<HTMLLIElement>, _) => {
            cy.wrap($degree)
              .should("be.visible")
              .and("have.prop", "tagName", "LI")
              .children()
              .should("have.length", 2)
              .then(($children) => {
                cy.wrap($children)
                  .eq(0)
                  .should("be.visible")
                  .and("have.prop", "tagName", "A");

                cy.wrap($children)
                  .eq(1)
                  .should("be.visible")
                  .and("have.prop", "tagName", "DIV");
              });
          });
      });

      it("Degree item containers are rendering the correct styling", () => {
        eduPage
          .getDegreeList()
          .children("li")
          // Test Each Degree item styling
          .each(($degree: JQuery<HTMLLIElement>, _) => {
            expect($degree).to.have.css("position", "relative");
            expect($degree).to.have.css("display", "flex");
            expect($degree).to.have.css("align-items", "center");
            expect($degree).to.have.css("justify-content", "space-evenly");
            expect($degree).to.have.css("padding");
            expect($degree).to.have.css("margin-bottom");
          });
      });

      it("Degree Images are rendering the correct styling", () => {
        eduPage
          .getDegreeList()
          .children("li")
          // Get Each Degree item
          .each(($degree: JQuery<HTMLLIElement>, _) => {
            // Get the degree Image
            cy.wrap($degree)
              .getDegreeImg()
              .then(($img) => {
                // Test the degree Image
                expect($img).to.have.css("margin-right", "10px");
                expect($img).to.have.css("width");
                expect($img).to.have.css("height");
                expect($img).to.have.css("border");
                expect($img).to.have.css("border-radius");
                expect($img).to.have.css("box-shadow");
              });
          });
      });

      it("Degree cards are rendering the correct layouts", () => {
        eduPage
          .getDegreeList()
          .children("li")
          // Get Each Degree item
          .each(($degree: JQuery<HTMLLIElement>, _) => {
            // Get the degree Card
            cy.wrap($degree)
              .getDegreeCard()
              .should("be.visible")
              .children()
              .should("have.length", 3)
              .then(($children) => {
                // Test the correct position and tags of each child element
                cy.wrap($children)
                  .eq(0)
                  .should("have.prop", "tagName", "DIV")
                  .children()
                  .should("have.length", 3)
                  .then(($headChildren) => {
                    cy.wrap($headChildren)
                      .eq(0)
                      .should("have.prop", "tagName", "H3");

                    cy.wrap($headChildren)
                      .eq(1)
                      .should("have.prop", "tagName", "P");

                    cy.wrap($headChildren)
                      .eq(2)
                      .should("have.prop", "tagName", "P");
                  });

                cy.wrap($children)
                  .eq(1)
                  .should("have.prop", "tagName", "DIV")
                  .children()
                  .should("have.length", 1)
                  .first()
                  .should("have.prop", "tagName", "UL");

                cy.wrap($children)
                  .eq(2)
                  .should("have.prop", "tagName", "A")
                  .and("include.text", "Visit Site");
              });
          });
      });

      it("Degree card containers and heads are rendering the correct styling", () => {
        eduPage
          .getDegreeList()
          .children("li")
          // Get Each Degree item
          .each(($degree: JQuery<HTMLLIElement>, _) => {
            // Get the degree Card
            cy.wrap($degree)
              .getDegreeCard()
              .should("be.visible")
              .then(($cardContainer) => {
                // Test container styling
                expect($cardContainer).to.have.css("position", "relative");
                expect($cardContainer).to.have.css("width");
                expect(parseFloat($cardContainer.css("width")))
                  .to.be.lte(800)
                  .and.to.be.gte(230);
                expect($cardContainer).to.have.css("height");
                expect(parseFloat($cardContainer.css("height")))
                  .to.be.lte(600)
                  .and.to.be.gte(260);
                expect($cardContainer).to.have.css(
                  "background-color",
                  "rgb(18, 15, 15)"
                );
                expect($cardContainer).to.have.css("border-radius", "30px");
                expect($cardContainer).to.have.css("box-shadow");

                return cy.wrap($cardContainer);
              })
              .children()
              .first()
              .then(($head) => {
                // Test head container styling
                expect($head).to.have.css("height");
                expect($head).to.have.css("padding");
                expect($head).to.have.css("color", "rgb(164, 255, 182)");
                expect($head).to.have.css(
                  "background-color",
                  "rgb(85, 84, 84)"
                );
                expect($head).to.have.css("border-radius");
                expect($head).to.have.css("box-shadow");

                // Test head title styling
                cy.wrap($head)
                  .children()
                  .eq(0)
                  .then(($headTitle) => {
                    expect($headTitle).to.have.css("margin");
                    expect($headTitle).to.have.css("text-align", "center");
                    expect($headTitle).to.have.css("font-size");
                    expect(parseFloat($headTitle.css("font-size")))
                      .to.be.lte(40)
                      .and.to.be.gte(20);
                    expect($headTitle).to.have.css("text-shadow");
                  });

                // Test head date styling
                cy.wrap($head)
                  .children()
                  .eq(1)
                  .then(($headDate) => {
                    expect($headDate).to.have.css("margin");
                    expect($headDate).to.have.css("text-align", "center");
                    expect($headDate).to.have.css("font-size");
                    expect(parseFloat($headDate.css("font-size")))
                      .to.be.lte(28)
                      .and.to.be.gte(10);
                    expect($headDate).to.have.css("letter-spacing");
                  });

                // Test head description styling
                cy.wrap($head)
                  .children()
                  .eq(2)
                  .then(($headDescription) => {
                    expect($headDescription).to.have.css(
                      "position",
                      "relative"
                    );
                    expect($headDescription).to.have.css("left");
                    expect($headDescription).to.have.css("margin");
                    expect($headDescription).to.have.css("font-size");
                    expect(parseFloat($headDescription.css("font-size")))
                      .to.be.lte(32)
                      .and.to.be.gte(12);
                    expect($headDescription).to.have.css("letter-spacing");
                  });
              });
          });
      });

      it("Degree card bodies are rendering the correct styling", () => {
        eduPage
          .getDegreeList()
          .children("li")
          // Get Each Degree item
          .each(($degree: JQuery<HTMLLIElement>, _) => {
            // Get the degree Card
            cy.wrap($degree)
              .getDegreeCard()
              .children()
              .then(($children) => {
                // Get the body element
                cy.wrap($children)
                  .eq(1)
                  .then(($body) => {
                    // Test the body container styling
                    expect($body).to.have.css("position", "relative");
                    expect($body).to.have.css("display", "flex");
                    expect($body).to.have.css("flex-direction", "column");
                    expect($body).to.have.css("margin");
                    expect($body).to.have.css("width");
                    expect($body).to.have.css("height");
                    expect($body).to.have.css("padding");
                    expect($body).to.have.css("color", "rgb(230, 255, 243)");
                    expect($body).to.have.css(
                      "background-color",
                      "rgb(18, 15, 15)"
                    );
                    expect($body).to.have.css(
                      "border-radius",
                      "0px 0px 20px 20px"
                    );
                    expect($body).to.have.css("box-shadow");

                    // Get the details list
                    cy.wrap($body)
                      .children()
                      .first()
                      .then(($list) => {
                        // Test the list styling
                        expect($list).to.have.css("margin");
                        expect($list).to.have.css("width");
                        expect($list).to.have.css("height");
                        expect($list).to.have.css("padding");
                      })
                      .children()
                      // test each detail styling
                      .each(($detail, _) => {
                        expect($detail).to.have.css(
                          "list-style",
                          "outside none none"
                        );
                        expect($detail).to.have.css("padding");
                        expect($detail).to.have.css("text-indent", "10px");
                        expect($detail).to.have.css("font-size");
                        expect(parseFloat($detail.css("font-size")))
                          .to.be.lte(30)
                          .and.to.be.gte(12);
                        expect($detail).to.have.css("line-height");
                        expect(
                          parseFloat($detail.css("line-height"))
                        ).to.be.gte(12);
                      });
                  });
              });
          });
      });

      it("Degree card links are rendering the correct styling", () => {
        eduPage
          .getDegreeList()
          .children()
          // Get Each Degree item
          .each(($degree, _) => {
            // Get the degree Card
            cy.wrap($degree)
              .getDegreeCard()
              .children()
              .then(($children) => {
                // Get the button element
                cy.wrap($children)
                  .eq(2)
                  .then(($button) => {
                    // Test the button styling
                    expect($button).to.have.css("position", "absolute");
                    expect($button).to.have.css("left");
                    expect($button).to.have.css("bottom");
                    expect($button).to.have.css("display", "flex");
                    expect($button).to.have.css("align-items", "center");
                    expect($button).to.have.css("justify-content", "center");
                    expect($button).to.have.css("width");
                    expect(parseFloat($button.css("width"))).to.be.gte(60);
                    expect($button).to.have.css("height");
                    expect(parseFloat($button.css("height"))).to.be.gte(20);
                    expect($button).to.have.css("font-size");
                    expect(parseFloat($button.css("font-size")))
                      .to.be.lte(24)
                      .and.to.be.gte(10);
                    expect($button).to.have.css("color", "rgb(164, 255, 182)");
                    expect($button).to.have.css(
                      "background-color",
                      "rgb(85, 84, 84)"
                    );
                    expect($button).to.have.css(
                      "border",
                      "1px solid rgb(164, 255, 182)"
                    );
                    expect($button).to.have.css("border-radius", "10px");
                    expect($button).to.have.css("box-shadow");
                  });
              });
          });
      });

      //! Must not exceed current degree count
      for (let idx of [...Array(2).keys()]) {
        const getCurrentDegreeItem = () => {
          return eduPage.getDegreeList().children().eq(idx);
        };
        it(`Degree ${idx}: Degree Image Hover effects function as expected`, () => {
          getCurrentDegreeItem()
            // Get the degree Image
            .getDegreeImg()
            .then(($image) => {
              // Expect / get normal css
              expect($image).to.have.css("transform", "none");
              const shadow = $image.css("box-shadow");
              // Hover image
              cy.wrap($image)
                .realHover({ position: "center", scrollBehavior: "center" })
                .wait(800)
                .then(($img) => {
                  // Test hover styling changes styling
                  expect($img).to.have.css("transform").to.not.eq("none");
                  expect($img).to.have.css("box-shadow").to.not.eq(shadow);
                });
            });
          cy.wait(300);
        });

        it(`Degree ${idx}: Degree Card Hover effects function as expected`, () => {
          getCurrentDegreeItem()
            // Get the Degree Card
            .getDegreeCard()
            .then(($card) => {
              // Get normal shadow css
              const shadow = $card.css("box-shadow");
              // Hover over the card
              cy.wrap($card)
                .realHover({ position: "center", scrollBehavior: "center" })
                .wait(800)
                .then(($card) => {
                  // Test hover styling changes shadow
                  expect($card).to.have.css("box-shadow").to.not.eq(shadow);

                  return cy.wrap($card);
                })
                .wait(100)
                .children()
                .eq(2)
                // Get the Degree school link
                .then(($link) => {
                  // Expect / get normal css
                  expect($link).to.have.css("color", "rgb(164, 255, 182)");
                  expect($link).to.have.css(
                    "background-color",
                    "rgb(85, 84, 84)"
                  );
                  expect($link).to.have.css(
                    "border",
                    "1px solid rgb(164, 255, 182)"
                  );
                  const shadow = $link.css("box-shadow");

                  // Hover the school link
                  cy.wrap($link)
                    .realHover({
                      position: "center",
                      scrollBehavior: "center",
                    })
                    .wait(800)
                    .then(($link) => {
                      // Test hover styling changes styling
                      expect($link).to.have.css("color", "rgb(0, 17, 1)");
                      expect($link).to.have.css(
                        "background-color",
                        "rgb(164, 255, 182)"
                      );
                      expect($link).to.have.css(
                        "border",
                        "1px solid rgb(0, 17, 1)"
                      );
                      expect($link).to.have.css("box-shadow").to.not.eq(shadow);
                    });
                });
            });
          cy.wait(300);
        });
      }
    });

    describe(`Certifications section container rendering at Viewport: ${viewportDisplay(
      viewport
    )}`, () => {
      it("Certifications section is rendering the correct layout", () => {
        eduPage
          .getCertificationContainer()
          .should("be.visible")
          .children()
          .should("have.length", 4)
          .then(($children) => {
            cy.wrap($children)
              .eq(0)
              .should("be.visible")
              .and("have.prop", "tagName", "H2");
            cy.wrap($children)
              .eq(1)
              .should("be.visible")
              .and("have.prop", "tagName", "NAV");
            cy.wrap($children)
              .eq(2)
              .should("be.visible")
              .and("have.prop", "tagName", "H3");
            cy.wrap($children)
              .eq(3)
              .should("be.visible")
              .and("have.prop", "tagName", "UL");
          });
      });

      it("Certifications section is rendering the correct styling", () => {
        eduPage
          .getCertificationContainer()
          .should("have.css", "display", "block")
          .children()
          .then(($children) => {
            // Title style
            cy.wrap($children)
              .eq(0)
              .then(($title) => {
                expect($title).to.have.css("position", "relative");
                expect($title).to.have.css("margin");
                expect($title).to.have.css("text-align", "center");
                expect($title).to.have.css("font-size");
                expect(parseFloat($title.css("font-size")))
                  .to.be.lte(60)
                  .and.to.be.gte(26);
                expect($title).to.have.css("color", "rgb(164, 255, 182)");
                expect($title).to.have.css("text-shadow");
              });

            // Description style
            cy.wrap($children)
              .eq(2)
              .then(($description) => {
                expect($description).to.have.css("position", "relative");
                expect($description).to.have.css("text-align", "center");
                expect($description).to.have.css("font-size");
                expect(parseFloat($description.css("font-size")))
                  .to.be.lte(42)
                  .and.to.be.gte(18);
                expect($description).to.have.css("color", "rgb(230, 255, 243)");
              });
          });
      });
    });

    describe(`Certifications Filter rendering at Viewport: ${viewportDisplay(
      viewport
    )}`, () => {
      it("Certifications Filter items are rendering the correct layouts", () => {
        eduPage
          .getCertificationFilters()
          .children("div")
          .should("have.length", 2)
          .each(($div, idx) => {
            cy.wrap($div)
              .children()
              .should("have.length", 2)
              .first()
              .should("be.visible")
              .and("have.prop", "tagName", "H4")
              .and(
                "have.attr",
                "id",
                idx == 0 ? "issuerSelectLabel" : "techSelectLabel"
              )
              .next()
              .should("be.visible")
              .and("have.prop", "tagName", "SELECT")
              .and("have.attr", "id", idx == 0 ? "issuerSelect" : "techSelect");
          });
      });

      it("Certifications Filter container is rendering the correct styling", () => {
        eduPage.getCertificationFilters().then(($container) => {
          expect($container).to.have.css("position", "relative");
          expect($container).to.have.css("left");
          expect($container).to.have.css("transform").to.not.eq("none");
          expect($container).to.have.css("display", "flex");
          expect($container).to.have.css("align-items", "center");
          expect($container).to.have.css("justify-content", "space-around");
          expect($container).to.have.css("margin");
          expect($container).to.have.css("width");
          expect($container).to.have.css("height");
        });
      });

      for (let idx of [0, 1]) {
        const getCurrentFilter = () => {
          return eduPage.getCertificationFilters().children("div").eq(idx);
        };
        it(`The correct styling is rendering on ${
          idx == 0 ? "Issuer Filter" : "Tech Filter"
        }`, () => {
          getCurrentFilter().then(($div) => {
            // Test filter container styles
            expect($div).to.have.css("display", "flex");
            expect($div).to.have.css("flex-direction", "column");
            expect($div).to.have.css("align-items", "center");

            cy.wrap($div)
              .children()
              .should("have.length", 2)
              .first()
              .then(($label) => {
                // Test filter label styles
                expect($label).to.have.css("margin-bottom", "12px");
                expect($label).to.have.css("text-align", "center");
                expect($label).to.have.css("font-size");
                expect(parseFloat($label.css("font-size")))
                  .to.be.lte(48)
                  .and.to.be.gte(20);
                expect($label).to.have.css("font-weight", "900");
                expect($label).to.have.css("color", "rgb(230, 255, 243)");
                expect($label).to.have.css("letter-spacing", "2px");
                expect($label).to.have.css("text-shadow");
              })
              .next()
              .then(($select) => {
                // Test filter select styles
                expect($select).to.have.css("width");
                expect(parseFloat($select.css("width"))).to.be.lte(460);
                expect($select).to.have.css("height", "50px");
                expect($select).to.have.css("padding-left", "10px");
                expect($select).to.have.css("font-size");
                expect(parseFloat($select.css("font-size")))
                  .to.be.lte(34)
                  .and.to.be.gte(20);
                expect($select).to.have.css("color", "rgb(230, 255, 243)");
                expect($select)
                  .to.have.css("background-color")
                  .match(/rgba\(0, 142, 8, 0\.46\d\)/);
                expect($select).to.have.css(
                  "border",
                  "2px solid rgb(164, 255, 182)"
                );
                expect($select).to.have.css("border-radius", "12px");
                expect($select).to.have.css("box-shadow");
              });
          });
        });

        it(`Hover styling is rendering correctly on ${
          idx == 0 ? "Issuer Filter" : "Tech Filter"
        }`, () => {
          getCurrentFilter()
            .children("select")
            .first()
            .then(($select) => {
              expect($select)
                .to.have.css("background-color")
                .match(/rgba\(0, 142, 8, 0\.46\d\)/);
              expect($select).to.have.css("letter-spacing", "0");
              const shadow = $select.css("box-shadow");

              cy.wrap($select)
                .realHover({ position: "center", scrollBehavior: "center" })
                .wait(800)
                .then(($select) => {
                  expect($select).to.have.css(
                    "background-color",
                    "rgb(85, 84, 84)"
                  );
                  expect($select).to.have.css("letter-spacing", "2px");
                  expect($select).to.have.css("box-shadow").to.not.eq(shadow);
                });
            });
          cy.wait(200);
        });
      }

      it("Certification filter values update as expected", () => {
        // Both should start with default Top 10
        for (let idx of [0, 1]) {
          eduPage
            .getCertificationFilter(idx)
            .should("have.value", "top")
            .children("option:selected")
            .should("have.text", "Top 10");
        }
        // Filter to all
        eduPage.filterCertifications(0, 2);
        // Both should display all
        for (let idx of [0, 1]) {
          eduPage
            .getCertificationFilter(idx)
            .should("have.value", "all")
            .children("option:selected")
            .should("have.text", "All");
        }
        // Filter left to a random option
        eduPage.filterCertifications(0, 3);
        // Right should be disabled
        eduPage
          .getCertificationFilter(1)
          .should("have.value", null)
          .children("option:selected")
          .should("be.disabled")
          .and("have.attr", "disabled");

        //! Future tests for other Tech filter options
        //? Filter right to a random option
        // eduPage.filterCertifications(1, 3);
        //? Right should be disabled
        // eduPage
        //   .getCertificationFilter(0)
        //   .should("have.value", "disabled")
        //   .children("option:selected")
        //   .should("be.disabled");

        // Clean Up filter Reseting to default
        eduPage.filterCertifications(0, 1);
        // Both should have returned to default Top 10
        for (let idx of [0, 1]) {
          eduPage
            .getCertificationFilter(idx)
            .should("have.value", "top")
            .children("option:selected")
            .should("have.text", "Top 10");
        }
      });

      it("Certifications filters correctly filter certifications", () => {
        eduPage.filterCertifications(0, 1);

        eduPage.getCertificationList().then(($list) => {
          // Make sure only Top 10 displayed at default
          cy.wrap($list).children().should("have.length", 10);

          // Filter to all
          eduPage.filterCertifications(0, 2);
          // Make sure All has more than top 10
          cy.wrap($list).children().should("have.length.greaterThan", 10);
          // Save The length
          let allLen = 0;
          cy.wrap($list)
            .children()
            .its("length")
            .then((len) => {
              allLen = len;
            });

          // Filter to a random option
          eduPage.filterCertifications(0, 3);
          // Make sure the option is not all selected
          cy.wrap($list)
            .children()
            .its("length")
            .then((len) => {
              expect(len).to.be.lt(allLen);
            });

          // Clean Up filter Reseting to default
          eduPage.filterCertifications(0, 1);
          // Make sure top 10 are showing again
          cy.wrap($list).children().should("have.length", 10);
        });
      });
    });

    describe(`Certifications List and Item rendering at Viewport: ${viewportDisplay(
      viewport
    )}`, () => {
      beforeEach(() => {
        cy.get("body").first().realHover({position: "right"});
        cy.wait(600);
      });
      it("Certifications list is rendering the correct styling", () => {
        eduPage.getCertificationList().then(($list) => {
          expect($list).to.have.css("list-style", "outside none none");
          expect($list).to.have.css("position", "relative");
          expect($list).to.have.css("left");
          expect($list).to.have.css("transform").to.not.eq("none");
          expect($list).to.have.css("display", "flex");
          expect($list).to.have.css("flex-wrap", "wrap");
          expect($list).to.have.css("justify-content", "center");
          expect($list).to.have.css("align-content", "center");
          expect($list).to.have.css("width");
          expect($list).to.have.css("height");
          expect($list).to.have.css("padding");
          expect($list).to.have.css("overflow", "scroll");
        });
      });

      // Test half of the Top 10 certification items
      const oddEven = getOddEven();
      for (let idx = oddEven; idx < 10; idx += 2) {
        const retrieveCurrentCert = () => {
          return eduPage.getCertificationList().children("li").eq(idx);
        };

        it(`FlipCard layout is rendering correct on Certification: ${
          idx % 2 == 0 ? idx + 1 : idx
        } of 5`, () => {
          retrieveCurrentCert()
            .children()
            // Only the flipCard container as a child
            .should("have.length", 1)
            .first()
            .children()
            // Only the flip-able inner card child
            .should("have.length", 1)
            .first()
            .children()
            // Both front and back cards
            .should("have.length", 2);
        });

        it(`Certification layout is rendering correct on Certification: ${
          idx % 2 == 0 ? idx + 1 : idx
        } of 5`, () => {
          retrieveCurrentCert()
            .should("have.prop", "tagName", "LI")
            .then(($li) => {
              // Front card layout
              cy.wrap($li)
                .find("#certCardFront")
                .first()
                .should("be.visible")
                .children()
                .should("have.length", 3)
                .then(($children) => {
                  cy.wrap($children)
                    .eq(0)
                    .should("have.prop", "tagName", "IMG");
                  cy.wrap($children).eq(1).should("have.prop", "tagName", "H5");
                  cy.wrap($children).eq(2).should("have.prop", "tagName", "P");
                });
              // Back card layout
              cy.wrap($li)
                .find("#certCardBack")
                .first()
                // Backside not flipped
                .should("not.be.visible")
                .children()
                .should("have.length", 1)
                .first()
                .children()
                .should("have.length", 2)
                .then(($children) => {
                  cy.wrap($children).eq(0).should("have.prop", "tagName", "P");
                  cy.wrap($children).eq(1).should("have.prop", "tagName", "A");
                });
            });
        });

        it(`Front card is rendering the correct styling on Certification: ${
          idx % 2 == 0 ? idx + 1 : idx
        } of 5`, () => {
          retrieveCurrentCert()
            .find("#certCardFront")
            .first()
            .then(($front) => {
              // Test card conatiner styling
              expect($front).to.have.css("display", "flex");
              expect($front).to.have.css("flex-direction", "column");
              expect($front).to.have.css("justify-content", "space-around");
              expect($front).to.have.css("width");
              expect($front).to.have.css("height");
              expect($front).to.have.css("padding");
              expect($front).to.have.css("color", "rgb(230, 255, 243)");
              expect($front).to.have.css("background-color", "rgb(85, 84, 84)");
              expect($front).to.have.css("border-radius", "20px");
              expect($front).to.have.css("box-shadow").to.not.eq("none");
              expect($front).to.have.css("transition").to.not.eq("none");
            })
            .children()
            .then(($children) => {
              // Test image stylings
              cy.wrap($children)
                .eq(0)
                .then(($img) => {
                  expect($img).to.have.css("margin");
                  expect($img).to.have.css("width");
                  expect(parseFloat($img.css("width")))
                    .to.be.lte(200)
                    .and.to.be.gte(60);
                  expect($img).to.have.css("height");
                  expect(parseFloat($img.css("height")))
                    .to.be.lte(200)
                    .and.to.be.gte(60);
                  expect($img).to.have.css("border-radius");
                });
              // Test Title st
              cy.wrap($children)
                .eq(1)
                .then(($title) => {
                  expect($title).to.have.css("font-size");
                  expect(parseFloat($title.css("font-size")))
                    .to.be.lte(30)
                    .and.to.be.gte(12);
                  expect($title).to.have.css("color", "rgb(0, 255, 13)");
                });
              // Test Description styling
              cy.wrap($children)
                .eq(2)
                .then(($desc) => {
                  expect($desc).to.have.css("margin");
                  expect($desc).to.have.css("font-size");
                  expect(parseFloat($desc.css("font-size")))
                    .to.be.lte(24)
                    .and.to.be.gte(10);
                });
            });
        });

        it(`Hover effects function as expected on Certification: ${
          idx % 2 == 0 ? idx + 1 : idx
        } of 5`, () => {
          retrieveCurrentCert().then(($li) => {
            // Expect front viable and back not
            cy.wrap($li).find("#certCardFront").first().should("be.visible");
            cy.wrap($li).find("#certCardBack").first().should("not.be.visible");

            // Hover the card
            cy.wrap($li)
              .realHover({ position: "center", scrollBehavior: "center" })
              .wait(1500)
              .then(($liHov) => {
                // Expect back visable and front not
                cy.wrap($liHov)
                  .find("#certCardBack")
                  .first()
                  .should("be.visible");
                cy.wrap($liHov)
                  .find("#certCardFront")
                  .first()
                  .should("not.be.visible");
              });
            cy.wait(300);
          });
        });

        it(`Back card is rendering the correct styling on Certification: ${
          idx % 2 == 0 ? idx + 1 : idx
        } of 5`, () => {
          retrieveCurrentCert()
            .realHover({ position: "center", scrollBehavior: "center" })
            .wait(1500)
            .then(($li) => {
              // Get the back
              cy.wrap($li)
                .find("#certCardBack")
                .first()
                .should("be.visible")
                // Test main container style
                .then(($back) => {
                  expect($back).to.have.css("position", "absolute");
                  expect($back).to.have.css("width");
                  expect($back).to.have.css("height");
                  expect($back).to.have.css("padding");
                  expect($back).to.have.css("z-index", "50");
                  expect($back).to.have.css("color", "rgb(230, 255, 243)");
                  expect($back).to.have.css(
                    "background-color",
                    "rgb(18, 15, 15)"
                  );
                  expect($back).to.have.css("border-radius", "20px");
                  expect($back).to.have.css("box-shadow").to.not.eq("none");
                  expect($back).to.have.css("transition").to.not.eq("none");

                  return cy.wrap($back);
                })
                .children()
                .first()
                // Test sub container style
                .then(($subContainer) => {
                  expect($subContainer).to.have.css("display", "flex");
                  expect($subContainer).to.have.css("align-items", "center");
                  expect($subContainer).to.have.css("height");
                  expect($subContainer).to.have.css("padding");
                  expect($subContainer).to.have.css(
                    "background-color",
                    "rgb(85, 84, 84)"
                  );
                  expect($subContainer).to.have.css("border-radius", "20px");
                  expect($subContainer)
                    .to.have.css("box-shadow")
                    .to.not.eq("none");
                  expect($subContainer)
                    .to.have.css("transition")
                    .to.not.eq("none");

                  return cy.wrap($subContainer);
                })
                .children()
                .then(($children) => {
                  // Test description style
                  cy.wrap($children)
                    .eq(0)
                    .then(($p) => {
                      expect($p).to.have.css("position", "relative");
                      expect($p).to.have.css("top");
                      expect($p).to.have.css("margin-bottom");
                      expect($p).to.have.css("max-height");
                      expect($p).to.have.css("vertical-align");
                      expect($p).to.have.css("overflow", "scroll");
                      expect($p).to.have.css("font-size");
                      getWindowInnerWidth().then((width) => {
                        if (width > 600) {
                          expect(parseFloat($p.css("font-size")))
                            .to.be.lte(30)
                            .and.to.be.gte(12);
                        } else {
                          expect(parseFloat($p.css("font-size")))
                            .to.be.lte(24)
                            .and.to.be.gte(10);
                        }
                      });
                      expect($p).to.have.css("font-weight", "700");
                      expect($p).to.have.css("color", "rgb(230, 255, 243)");
                      expect($p).to.have.css("line-height");
                    });

                  // Test link style
                  cy.wrap($children)
                    .eq(1)
                    .then(($a) => {
                      expect($a).to.have.css("position", "absolute");
                      expect($a).to.have.css("left");
                      expect($a).to.have.css("bottom");
                      expect(parseFloat($a.css("bottom")))
                        .to.be.lte(50)
                        .and.to.be.gte(30);
                      expect($a).to.have.css("transform").to.not.eq("none");
                      expect($a).to.have.css("display", "flex");
                      expect($a).to.have.css("align-items", "center");
                      expect($a).to.have.css("justify-content", "center");
                      expect($a).to.have.css("width");
                      expect($a).to.have.css("height");
                      expect(parseFloat($a.css("height"))).to.be.gte(16);
                      expect($a).to.have.css("padding");
                      expect($a).to.have.css("font-size");
                      expect(parseFloat($a.css("font-size")))
                        .to.be.lte(26)
                        .and.to.be.gte(11);
                      expect($a).to.have.css("color", "rgb(230, 255, 243)");
                      expect($a).to.have.css(
                        "background-color",
                        "rgb(12, 43, 33)"
                      );
                      expect($a).to.have.css("border-radius", "8px");
                      expect($a).to.have.css("box-shadow").to.not.eq("none");
                    });
                });
            });
          cy.wait(300);
        });

        it(`Link hover styling renders as expected on Certification: ${
          idx % 2 == 0 ? idx + 1 : idx
        } of 5`, () => {
          retrieveCurrentCert()
            .realHover({ position: "center", scrollBehavior: "center" })
            .wait(1500)
            .then(($li) => {
              cy.wrap($li)
                .find("#certCardBack")
                .first()
                .find("a")
                .first()
                .then(($a) => {
                  // Expect defaults
                  expect($a).to.have.css("color", "rgb(230, 255, 243)");
                  expect($a).to.have.css("background-color", "rgb(12, 43, 33)");
                  expect($a).to.have.css("border").to.include("0px none");
                  const shadow = $a.css("box-shadow");

                  // Hover link
                  cy.wrap($a)
                    .realHover({
                      position: "center",
                      scrollBehavior: "center",
                    })
                    .wait(1500)
                    .then(($a) => {
                      // Expect hover changes
                      expect($a).to.have.css("color", "rgb(0, 255, 13)");
                      expect($a).to.have.css(
                        "background-color",
                        "rgb(18, 15, 15)"
                      );
                      expect($a).to.have.css(
                        "border",
                        "1px solid rgb(0, 255, 13)"
                      );
                      expect($a).to.have.css("box-shadow").to.not.eq(shadow);
                    });
                });
            });
          cy.wait(300);
        });
      }
    });
  });
  if (!Cypress.env("FULL_SPECTRUM")) {
    break;
  }
}
