/** @format */

/// <reference types="cypress" />

import {
  BASEURL,
  setupPageWithTheme,
  viewPortSetup,
  viewports,
} from "../support/e2e";
import { ExperiencePage } from "../page-objects/ExperiencePage";
import { viewportDisplay } from "../support/e2e";

const EXPURL = BASEURL + "/experience";
const expPage = new ExperiencePage();

for (let viewport of viewports) {
  context("Experience Page render testing", () => {
    before(() => {
      setupPageWithTheme(EXPURL, "dark");
      cy.wait(3000);
    });

    beforeEach(() => {
      viewPortSetup(viewport);
      cy.wait(1000);
    });

    describe(`Experience Page rendering at Viewport: ${viewportDisplay(
      viewport
    )}`, () => {
      it("Page layout is rendering correctly", () => {
        expPage
          .pageContainer()
          .should("be.visible")
          .children()
          .should("have.length", 2)
          .each(($child) => {
            expect($child).to.be.visible;

            cy.wrap($child)
              .children()
              .should("have.length", 1)
              .first()
              .children()
              .should("have.length", 2);
          });
      });

      it("Page container styling is correct", () => {
        expPage
          .pageContainer()
          .should("be.visible")
          .then(($main) => {
            expect($main).to.have.css("padding");
          });
      });
    });

    describe(`Education Card is interactive as expected at Viewport: ${viewportDisplay(
      viewport
    )}`, () => {
      afterEach(() => {
        cy.get("body").first().realHover({ position: "right" });
        cy.wait(1000);
      });

      it("Education Card is rendering correctly at start", () => {
        expPage
          .getCardContainer(0)
          .should("be.visible")
          .then(($cardContainer) => {
            expect($cardContainer).to.have.css("margin");
            expect($cardContainer).to.have.css("width");
            expect(parseFloat($cardContainer.css("width")))
              .to.be.lte(750)
              .and.to.be.gte(220);
            expect($cardContainer).to.have.css("height");
            expect(parseFloat($cardContainer.css("height")))
              .to.be.lte(500)
              .and.to.be.gte(180);

            cy.wrap($cardContainer)
              .find("#eduFront")
              .first()
              .should("be.visible");
            cy.wrap($cardContainer)
              .find("#eduBack")
              .first()
              .should("not.be.visible");
          });
        cy.wait(1000);
      });

      it("Education Card is rendering the correct layout", () => {
        expPage.getCardContainer(0).then(($cardContainer) => {
          cy.wrap($cardContainer)
            .find("#eduFront")
            .children()
            .should("have.length", 1)
            .first()
            .should("have.prop", "tagName", "H1");

          cy.wrap($cardContainer)
            .find("#eduBack")
            .children()
            .should("have.length", 2)
            .first()
            .should("have.prop", "tagName", "P")
            .next()
            .should("have.prop", "tagName", "A");
        });
        cy.wait(1000);
      });

      it("Education Card front is rendering correct styling", () => {
        expPage
          .getCardContainer(0)
          .find("#eduFront")
          .first()
          .then(($front) => {
            expect($front).to.have.css("display", "flex");
            expect($front).to.have.css("flex-direction", "column");
            expect($front).to.have.css("align-items", "center");
            expect($front).to.have.css("justify-content", "space-evenly");
            expect($front).to.have.css("width");
            expect(parseFloat($front.css("width")))
              .to.be.lte(750)
              .and.to.be.gte(220);
            expect($front).to.have.css("height");
            expect(parseFloat($front.css("height")))
              .to.be.lte(500)
              .and.to.be.gte(180);
            expect($front).to.have.css("padding");
            expect($front).to.have.css("color", "rgb(230, 255, 243)");
            expect($front).to.have.css("background-color", "rgb(18, 15, 15)");
            expect($front).to.have.css(
              "border",
              "1.5px solid rgb(164, 255, 182)"
            );
            expect($front).to.have.css("border-radius", "20px");
            expect($front).to.have.css("box-shadow");

            cy.wrap($front)
              .children()
              .first()
              .then(($frontTitle) => {
                expect($frontTitle).to.have.css("max-width");
                expect($frontTitle).to.have.css("font-size");
                expect(parseFloat($frontTitle.css("font-size")))
                  .to.be.lte(38)
                  .and.to.be.gte(16);
                expect($frontTitle).to.have.css("letter-spacing"), "1.5px";

                cy.wrap($frontTitle)
                  .find("span")
                  .should("have.css", "color", "rgb(164, 255, 182)");
              });
          });
        cy.wait(1000);
      });

      it("Education Card hover interaction functions as expected", () => {
        expPage
          .getCardContainer(0)
          .then(($cardContainer) => {
            cy.wrap($cardContainer)
              .find("#eduFront")
              .first()
              .should("be.visible");
            cy.wrap($cardContainer)
              .find("#eduBack")
              .first()
              .should("not.be.visible");

            return cy.wrap($cardContainer);
          })
          .realHover({ position: "center", scrollBehavior: "center" })
          .wait(3000)
          .then(($cardContainer) => {
            cy.wrap($cardContainer)
              .find("#eduFront")
              .first()
              .should("not.be.visible");
            cy.wrap($cardContainer)
              .find("#eduBack")
              .first()
              .should("be.visible");
          });
        cy.wait(1000);
      });

      it("Education Card back is rendering the correct layout", () => {
        expPage
          .getCardContainer(0)
          .realHover({ position: "center", scrollBehavior: "center" })
          .wait(3000)
          .then(($cardContainer) => {
            cy.wrap($cardContainer)
              .find("#eduBack")
              .should("be.visible")
              .children()
              .should("have.length", 2)
              .first()
              .should("have.prop", "tagName", "P")
              .and("be.visible")
              .next()
              .should("have.prop", "tagName", "A")
              .and("be.visible");
          });
        cy.wait(1000);
      });

      it("Education Card back is rendering the correct styling", () => {
        expPage
          .getCardContainer(0)
          .realHover({ position: "center", scrollBehavior: "center" })
          .wait(3000)
          .then(($cardContainer) => {
            cy.wrap($cardContainer)
              .find("#eduBack")
              .should("be.visible")
              .then(($back) => {
                expect($back).to.have.css("display", "flex");
                expect($back).to.have.css("flex-direction", "column");
                expect($back).to.have.css("align-items", "center");
                expect($back).to.have.css("justify-content", "space-evenly");
                expect($back).to.have.css("width");
                expect(parseFloat($back.css("width")))
                  .to.be.lte(750)
                  .and.to.be.gte(220);
                expect($back).to.have.css("height");
                expect(parseFloat($back.css("height")))
                  .to.be.lte(500)
                  .and.to.be.gte(180);
                expect($back).to.have.css("padding");
                expect($back).to.have.css("color", "rgb(230, 255, 243)");
                expect($back).to.have.css(
                  "background-color",
                  "rgb(18, 15, 15)"
                );
                expect($back).to.have.css(
                  "border",
                  "1.5px solid rgb(164, 255, 182)"
                );
                expect($back).to.have.css("border-radius", "20px");
                expect($back).to.have.css("box-shadow");

                cy.wrap($back)
                  .children("p")
                  .first()
                  .then(($p) => {
                    expect($p).to.have.css("font-size");
                    expect(parseFloat($p.css("font-size")))
                      .to.be.lte(34)
                      .and.to.be.gte(14);
                    expect($p).to.have.css("overflow", "scroll");
                  });

                cy.wrap($back)
                  .children("a")
                  .first()
                  .then(($a) => {
                    expect($a).to.have.css("display", "flex");
                    expect($a).to.have.css("align-items", "center");
                    expect($a).to.have.css("justify-content", "center");
                    expect($a).to.have.css("margin-bottom");
                    expect(parseFloat($a.css("margin-bottom"))).to.be.lte(10);
                    expect($a).to.have.css("width");
                    expect($a).to.have.css("height");
                    expect($a).to.have.css("font-size");
                    expect(parseFloat($a.css("font-size")))
                      .to.be.lte(30)
                      .and.to.be.gte(12);
                    expect($a).to.have.css("background-color", "rgb(0, 17, 1)");
                    expect($a).to.have.css(
                      "border",
                      "0.5px solid rgb(230, 255, 243)"
                    );
                    expect($a).to.have.css("border-radius", "10px");
                    expect($a).to.have.css("box-shadow");
                  });
              });
          });
        cy.wait(1000);
      });
    });

    describe(`Work Card is interactive as expected at Viewport: ${viewportDisplay(
      viewport
    )}`, () => {
      afterEach(() => {
        cy.get("body").first().realHover({ position: "right" });
        cy.wait(1000);
      });

      it("Work Card is rendering correct layout at start", () => {
        expPage
          .getCardContainer(1)
          .should("be.visible")
          .then(($cardContainer) => {
            expect($cardContainer).to.have.css("margin");
            expect($cardContainer).to.have.css("width");
            expect(parseFloat($cardContainer.css("width")))
              .to.be.lte(750)
              .and.to.be.gte(220);
            expect($cardContainer).to.have.css("height");
            expect(parseFloat($cardContainer.css("height")))
              .to.be.lte(500)
              .and.to.be.gte(180);

            cy.wrap($cardContainer)
              .find("#workFront")
              .first()
              .should("be.visible");
            cy.wrap($cardContainer)
              .find("#workBack")
              .first()
              .should("not.be.visible");
          });
        cy.wait(1000);
      });

      it("Work Card front is rendering correct layout", () => {
        expPage.getCardContainer(1).then(($cardContainer) => {
          cy.wrap($cardContainer)
            .find("#workFront")
            .children()
            .should("have.length", 1)
            .first()
            .should("have.prop", "tagName", "H1");

          cy.wrap($cardContainer)
            .find("#workBack")
            .children()
            .should("have.length", 2)
            .first()
            .should("have.prop", "tagName", "P")
            .next()
            .should("have.prop", "tagName", "A");
        });
        cy.wait(1000);
      });

      it("Work Card front is rendering correct styling", () => {
        expPage
          .getCardContainer(1)
          .find("#workFront")
          .first()
          .then(($front) => {
            expect($front).to.have.css("display", "flex");
            expect($front).to.have.css("flex-direction", "column");
            expect($front).to.have.css("align-items", "center");
            expect($front).to.have.css("justify-content", "space-evenly");
            expect($front).to.have.css("width");
            expect(parseFloat($front.css("width")))
              .to.be.lte(750)
              .and.to.be.gte(220);
            expect($front).to.have.css("height");
            expect(parseFloat($front.css("height")))
              .to.be.lte(500)
              .and.to.be.gte(180);
            expect($front).to.have.css("padding");
            expect($front).to.have.css("color", "rgb(230, 255, 243)");
            expect($front).to.have.css("background-color", "rgb(18, 15, 15)");
            expect($front).to.have.css(
              "border",
              "1.5px solid rgb(164, 255, 182)"
            );
            expect($front).to.have.css("border-radius", "20px");
            expect($front).to.have.css("box-shadow");

            cy.wrap($front)
              .children()
              .first()
              .then(($frontTitle) => {
                expect($frontTitle).to.have.css("max-width");
                expect($frontTitle).to.have.css("font-size");
                expect(parseFloat($frontTitle.css("font-size")))
                  .to.be.lte(38)
                  .and.to.be.gte(16);
                expect($frontTitle).to.have.css("letter-spacing"), "1.5px";

                cy.wrap($frontTitle)
                  .find("span")
                  .should("have.css", "color", "rgb(164, 255, 182)");
              });
          });
        cy.wait(1000);
      });

      it("Work Card hover interaction functions as expected", () => {
        expPage
          .getCardContainer(1)
          .then(($cardContainer) => {
            cy.wrap($cardContainer)
              .find("#workFront")
              .first()
              .should("be.visible");
            cy.wrap($cardContainer)
              .find("#workBack")
              .first()
              .should("not.be.visible");

            return cy.wrap($cardContainer);
          })
          .realHover({ position: "center", scrollBehavior: "center" })
          .wait(3000)
          .then(($cardContainer) => {
            cy.wrap($cardContainer)
              .find("#workFront")
              .first()
              .should("not.be.visible");
            cy.wrap($cardContainer)
              .find("#workBack")
              .first()
              .should("be.visible");
          });
        cy.wait(1000);
      });

      it("Work Card back is rendering the correct layout", () => {
        expPage
          .getCardContainer(1)
          .realHover({ position: "center", scrollBehavior: "center" })
          .wait(3000)
          .then(($cardContainer) => {
            cy.wrap($cardContainer)
              .find("#workBack")
              .should("be.visible")
              .children()
              .should("have.length", 2)
              .first()
              .should("have.prop", "tagName", "P")
              .and("be.visible")
              .next()
              .should("have.prop", "tagName", "A")
              .and("be.visible");
          });
        cy.wait(1000);
      });

      it("Work Card back is rendering the correct styling", () => {
        expPage
          .getCardContainer(1)
          .realHover({ position: "center", scrollBehavior: "center" })
          .wait(3000)
          .then(($cardContainer) => {
            cy.wrap($cardContainer)
              .find("#workBack")
              .should("be.visible")
              .then(($back) => {
                expect($back).to.have.css("display", "flex");
                expect($back).to.have.css("flex-direction", "column");
                expect($back).to.have.css("align-items", "center");
                expect($back).to.have.css("justify-content", "space-evenly");
                expect($back).to.have.css("width");
                expect(parseFloat($back.css("width")))
                  .to.be.lte(750)
                  .and.to.be.gte(220);
                expect($back).to.have.css("height");
                expect(parseFloat($back.css("height")))
                  .to.be.lte(500)
                  .and.to.be.gte(180);
                expect($back).to.have.css("padding");
                expect($back).to.have.css("color", "rgb(230, 255, 243)");
                expect($back).to.have.css(
                  "background-color",
                  "rgb(18, 15, 15)"
                );
                expect($back).to.have.css(
                  "border",
                  "1.5px solid rgb(164, 255, 182)"
                );
                expect($back).to.have.css("border-radius", "20px");
                expect($back).to.have.css("box-shadow");

                cy.wrap($back)
                  .children("p")
                  .first()
                  .then(($p) => {
                    expect($p).to.have.css("font-size");
                    expect(parseFloat($p.css("font-size")))
                      .to.be.lte(34)
                      .and.to.be.gte(14);
                    expect($p).to.have.css("overflow", "scroll");
                  });

                cy.wrap($back)
                  .children("a")
                  .first()
                  .then(($a) => {
                    expect($a).to.have.css("display", "flex");
                    expect($a).to.have.css("align-items", "center");
                    expect($a).to.have.css("justify-content", "center");
                    expect($a).to.have.css("margin-bottom");
                    expect(parseFloat($a.css("margin-bottom"))).to.be.lte(10);
                    expect($a).to.have.css("width");
                    expect($a).to.have.css("height");
                    expect($a).to.have.css("font-size");
                    expect(parseFloat($a.css("font-size")))
                      .to.be.lte(30)
                      .and.to.be.gte(12);
                    expect($a).to.have.css("background-color", "rgb(0, 17, 1)");
                    expect($a).to.have.css(
                      "border",
                      "0.5px solid rgb(230, 255, 243)"
                    );
                    expect($a).to.have.css("border-radius", "10px");
                    expect($a).to.have.css("box-shadow");
                  });
              });
          });
        cy.wait(1000);
      });
    });
  });

  if (!Cypress.env("FULL_SPECTRUM")) {
    break;
  }
}
