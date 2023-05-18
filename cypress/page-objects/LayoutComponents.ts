/** @format */

/// <reference types="cypress" />

const platforms = ["github", "twitter", "linkedin", "instagram"];
export class LayoutComps {
  preload: Function;
  navbar: Function;
  brand: Function;
  collapse: Function;
  toggle: Function;
  footer: Function;

  constructor() {
    this.preload = (): Cypress.Chainable<JQuery<HTMLElement>> => {
      return cy.get("");
    };
    this.navbar = (): Cypress.Chainable<JQuery<HTMLElement>> => {
      return cy.get("#navbar");
    };
    this.brand = (): Cypress.Chainable<JQuery<HTMLElement>> => {
      return cy.get("#navbarBrand");
    };
    this.collapse = (): Cypress.Chainable<JQuery<HTMLElement>> => {
      return cy.get("#responsive-navbar-nav");
    };
    this.toggle = (): Cypress.Chainable<JQuery<HTMLElement>> => {
      return cy.get("#navbarToggle");
    };
    this.footer = (): Cypress.Chainable<JQuery<HTMLElement>> => {
      return cy.get("#footer");
    };
  }

  testNavItemLayout(navItem: Cypress.Chainable<JQuery<HTMLElement>>) {
    navItem
      .find("a")
      .should("have.length", 1)
      .first()
      .debug()
      .should("be.visible")
      .should("contain.text", "")
      .debug()
      .find("svg")
      .should("be.visible");
  }

  testNavItemStyle(navItem: Cypress.Chainable<JQuery<HTMLElement>>) {
    navItem
      .should("be.visible")
      .and("have.css", "position", "relative")
      .then(($item: JQuery<HTMLElement>) => {
        expect($item).to.have.css("margin");
        expect($item).to.have.css("padding");
      });
    navItem.trigger("mouseover");
    navItem
      .should("have.css", "border-radius", "20px")
      .and("have.css", "background-color");

    navItem.trigger("mouseout");
  }

  testNavLinkStyle(
    navItem: Cypress.Chainable<JQuery<HTMLElement>>,
    width: Cypress.Chainable<number>,
    idx: number
  ) {
    navItem
      .find("a")
      .should("be.visible")
      .and("have.css", "display", "flex")
      .and("have.css", "font-weight", "400")
      .then(($link: JQuery<HTMLElement>) => {
        if (idx !== 5) {
          expect($link).to.have.css("align-items");
          expect($link).to.have.css("transition");
          expect($link)
            .to.have.css("color")
            .match(/rgb\(111, 255, 118\)/);
          expect($link)
            .to.have.css("text-shadow")
            .match(/.*rgba\(0, 156, 13, 0\.87.*\)/);
          expect($link).to.have.css("font-size");
        } else {
          expect($link)
            .to.have.css("color")
            .match(/rgb\(0, 33, 26\).*/);
          expect($link)
            .to.have.css("background-color")
            .match(/.*rgb\(36, 94, 36\).*/);
          expect($link).to.have.css("border-radius", "10px");
          expect($link).to.have.css("margin-left");
          expect($link).to.have.css("vertical-align");
          expect($link).to.have.css("text-align");
          expect($link).to.have.css("padding");
        }

        width.then((w) => {
          if (w > 900) {
            expect($link).to.have.css("flex-direction", "column");
          } else {
            expect($link).to.have.css("flex-direction", "row");
            expect($link).to.have.css("padding");
          }
        });
      });
  }

  testFooterItemLayout(
    footerLink: Cypress.Chainable<JQuery<HTMLElement>>,
    idx: number
  ) {
    footerLink
      .should("have.attr", "role", "presentation")
      .find("a")
      .should("have.length", 1)
      .first()
      .should("have.attr", "target", "_blank")
      .and("have.attr", "rel", "noopener noreferrer")
      .then((li) => {
        expect(li).to.have.attr("href").contains(platforms[idx]);
      })
      .children("svg")
      .should("have.length", 1);
  }

  testFooterItemStyle(footerLink: Cypress.Chainable<JQuery<HTMLElement>>) {
    footerLink.then(($item: JQuery<HTMLElement>) => {
      expect($item).to.have.css("padding");
    });
    let link = footerLink
      .find("a")
      .first()
      .should("be.visible")
      .then(($link: JQuery<HTMLElement>) => {
        expect($link)
          .to.have.css("color")
          .match(/.*rgb\(206, 255, 208\).*/);
      });

    link.trigger("mouseover");
    link.trigger("mouseover");
    link.then(($link) => {
      expect($link).to.have.css("color");
    });

    link.trigger("mouseout");
    link.children().first().should("be.visible").and("have.css", "font-size");
  }
}
