/** @format */
/// <reference types="cypress" />

import { getOddEven } from "../support/e2e";

const oddEven = () => {
  return getOddEven() === 0 ? "even" : "odd";
};
export class WorkPage {
  getWorkContainer: () => Cypress.Chainable<JQuery<HTMLElement>>;

  getWorkIntro: () => Cypress.Chainable<JQuery<HTMLElement>>;

  getToggleSection: () => Cypress.Chainable<JQuery<HTMLElement>>;
  getWorkToggle: (idx: number) => Cypress.Chainable<JQuery<HTMLElement>>;
  toggleWorkSection: (toggleIdx: number) => void;

  getWorkList: () => Cypress.Chainable<JQuery<HTMLElement>>;
  getOddEvenListItems: () => Cypress.Chainable<JQuery<HTMLElement>>;

  constructor() {
    this.getWorkContainer = () => cy.get("#workContainer");

    this.getWorkIntro = () => cy.get("#workIntro");

    this.getToggleSection = () => cy.get("#workToggle");

    this.getWorkToggle = (idx: number) =>
      this.getToggleSection().children().eq(idx);

    this.toggleWorkSection = (toggleIdx: number) => {
      this.getToggleSection().eq(toggleIdx).realClick({ position: "center" });
    };

    this.getWorkList = () => cy.get("#workList");
    this.getOddEvenListItems = () => {
      return this.getWorkList()
        .children("li")
        .filter(`:nth-child(${oddEven()})`);
    };
  }

  activeToggleTest = (toggle: Cypress.Chainable<JQuery<HTMLElement>>) => {
    toggle.should("be.visible").then((toggle) => {
      expect(toggle)
        .to.have.css("background-color")
        .match(/rgba\(0, 142, 8, 0\.46\d+\)/);
      expect(toggle).to.have.css("border", "2px solid rgb(12, 43, 33)");
      expect(toggle).to.have.css("box-shadow").to.not.eq("none");
      expect(toggle).to.have.css("transform").to.not.eq("none");
      expect(toggle).to.have.css("opacity", "1");
    });
  };

  inactiveToggleTest = (toggle: Cypress.Chainable<JQuery<HTMLElement>>) => {
    toggle.should("be.visible").then((toggle) => {
      expect(toggle)
        .to.have.css("background-color")
        .match(/rgba\(195, 255, 203, 0\.25\)/);
      expect(toggle).to.have.css("border", "1px solid rgb(230, 255, 243)");
      expect(toggle).to.have.css("box-shadow", "none");
      expect(toggle).to.have.css("transform", "none");
      expect(toggle).to.have.css("opacity", "0.8");
    });
  };

  toggleHoverTest = (toggle: Cypress.Chainable<JQuery<HTMLElement>>) => {
    toggle.should("be.visible").then((toggle) => {
      let width = parseFloat(toggle.css("width"));

      cy.wrap(toggle)
        .then(($toggle) => {
          expect($toggle).to.have.css("border-radius", "10px");
        })
        .realHover({ position: "center", scrollBehavior: "center" })
        .wait(2000)
        .then(($toggle) => {
          expect(toggle).to.have.css("background-color", "rgb(85, 84, 84)");
          expect(toggle).to.have.css("border", "1px solid rgb(230, 255, 243)");
          expect($toggle).to.have.css("border-radius", "20px");
          expect(toggle).to.have.css("box-shadow").to.not.eq("none");
          expect(toggle).to.have.css("transform").to.not.eq("none");
          expect(toggle).to.have.css("opacity", "1");
        });
    });
  };
}
