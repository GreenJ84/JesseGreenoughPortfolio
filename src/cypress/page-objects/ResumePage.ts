/** @format */
/// <reference types="cypress" />

import { getWindowInnerWidth } from "../support/e2e";

export class ResumePage {
  topButton: Function;
  resumeMain: Function;
  resume: Function;
  bottomButton: Function;
  constructor() {
    this.resumeMain = () => {
      return cy.get("#resumePage");
    };
    this.topButton = () => {
      return cy.get("#top-buttons");
    };
    this.resume = () => {
      return cy.get("#resume");
    };
    this.bottomButton = () => {
      return cy.get("#bottom-buttons");
    };
  }

  testButtonGroupLayout(buttonGroup: Cypress.Chainable<JQuery<HTMLElement>>) {
    buttonGroup.within(($section: JQuery<HTMLElement>) => {
      cy.wrap($section).children().should("have.length", 2);
      cy.wrap($section).children("a").should("have.length", 2);

      cy.wrap($section)
        .children("a")
        .first()
        .should("include.text", "Save")
        .and("have.attr", "target", "_blank")
        .and("have.attr", "role", "button")
        .children()
        .should("have.length", 1);

      cy.wrap($section)
        .children("a")
        .last()
        .should("include.text", "View")
        .and("have.attr", "target", "_blank")
        .and("have.attr", "role", "button")
        .children()
        .should("have.length", 1);
    });
  }

  testButtonStyle(button: Cypress.Chainable<JQuery<HTMLButtonElement>>) {
    button
      .should("have.css", "display", "flex")
      .and("have.css", "align-items", "center")
      .and("have.css", "justify-content", "center")
      .and("have.css", "text-align", "center")
      .and("have.css", "color", "rgb(164, 255, 182)")
      .and("have.css", "background-color", "rgba(0, 142, 8, 0.463)")
      .and("have.css", "font-weight", "900")
      .and("have.css", "letter-spacing", "1px")
      .and("have.css", "border", "1px solid rgb(164, 255, 182)")
      .and("have.css", "border-radius", "8px")
      .then(($button) => {
        expect($button).to.have.css("margin");
        expect($button).to.have.css("width");
        expect(parseFloat($button.css("width")))
          .to.be.lte(400)
          .and.to.be.gte(100);
        expect($button).to.have.css("height");
        expect(parseFloat($button.css("height")))
          .to.be.lte(80)
          .and.to.be.gte(25);
        expect($button).to.have.css("padding");
        expect($button).to.have.css("box-shadow");
        expect($button).to.have.css("font-size");
      });
  }

  testButtonHover(button: Cypress.Chainable<JQuery<HTMLButtonElement>>) {
    button
      .should("have.css", "color", "rgb(164, 255, 182)")
      .and("have.css", "background-color", "rgba(0, 142, 8, 0.463)")
      .and("have.css", "transform", "none")
      .realHover({ position: "center", scrollBehavior: "center" })
      .wait(2000)
      .then(($button) => {
        expect($button).to.have.css("color", "rgb(0, 17, 1)");
        expect($button).to.have.css(
          "background-color",
          "rgb(14, 215, 165)"
        );
        expect($button).to.have.css("transform").to.not.eq("none");
      });
  }

  testVisibleNavArrows(navArrow: Cypress.Chainable<JQuery<HTMLElement>>) {
    navArrow
      .should("be.visible")
      .and("have.css", "display", "flex")
      .and("have.css", "align-items", "center")
      .and("have.css", "justify-content", "center")
      .then(($navArrow) => {
        expect($navArrow).to.have.css("padding");
        expect($navArrow).to.have.css("width");
        expect(parseFloat($navArrow.css("width")))
          .to.be.lte(80)
          .and.to.be.gte(40);
        expect($navArrow).to.have.css("aspect-ratio");
        expect($navArrow).to.have.css("font-size");
        expect(parseFloat($navArrow.css("font-size")))
          .to.be.lte(70)
          .and.to.be.gte(20);
        expect($navArrow).to.have.css("color", "rgb(0, 17, 1)");
        expect($navArrow).to.have.css("background-color", "rgb(164, 255, 182)");
        expect($navArrow).to.have.css("border-radius");
        expect($navArrow).to.have.css("box-shadow");

        getWindowInnerWidth().then((width) => {
          if (width >= 1400) {
            expect($navArrow).to.have.css("position", "static");
            expect($navArrow).to.have.css("top", "auto");
            expect($navArrow).to.have.css("transform", "none");
            expect($navArrow).to.have.css("z-index", "auto");
            expect($navArrow).to.have.css("opacity", "1");
          } else {
            expect($navArrow).to.have.css("position", "absolute");
            expect($navArrow).to.have.css("top").to.not.eq("auto");
            expect($navArrow).to.have.css("transform").to.not.eq("none");
            expect($navArrow).to.have.css("z-index", "20");
            expect($navArrow).to.have.css("opacity", "0.5");
          }
        });

        return cy.wrap($navArrow);
      })
      .children()
      .should("have.length", 1);
  }
}
