/** @format */
/// <reference types="cypress" />

export class ResumePage {
  topButton: Function;
  resumeMain: Function;
  resume: Function;
  bottomButton: Function;
  constructor() {
    this.topButton = () => { return cy.get("#top-buttons")};
    this.resumeMain = () => { return cy.get("#resumePage")};
    this.resume = () => { return cy.get("#resume")};
    this.bottomButton = () => { return cy.get("#bottom-buttons")};
  }

  testButtonGroupLayout(buttonGroup: Cypress.Chainable<JQuery<HTMLElement>>) {
    buttonGroup.within(() => {
      cy.get("a")
        .children()
        .should("have.length", 2);
      
      cy.get("a")
        .first()
        .should("include.text", "Download")
        .and('have.attr', 'target', '_blank')
        .and("have.attr", "role", "button")
        .children()
        .should("have.length", 1);
  
      cy.get("a")
        .last()
        .should("include.text", "View")
        .and('have.attr', 'target', '_blank')
        .and("have.attr", "role", "button")
        .children()
        .should("have.length", 1);
    })
  };

  testButtonStyle(button: Cypress.Chainable<JQuery<HTMLButtonElement>>) {
    button
      .should('have.css', 'display', 'flex')
      .and('have.css', 'align-items', 'center')
      .and('have.css', 'justify-content', 'center')
      .and('have.css', 'text-align', 'center')
      .and('have.css', 'color', 'rgb(0, 255, 13)')
      .and('have.css', 'background-color', 'rgb(36, 94, 36)')
      .and('have.css', 'font-weight', '900')
      .and('have.css', 'border', '1px solid rgba(14, 215, 165, 0.925)')
      .and('have.css', 'border-radius', '8px')
      .then(($button) => {
        expect($button).to.have.css('margin');
        expect($button).to.have.css('box-shadow').to.match(/.*rgba\(14, 215, 165, 0\.925\).*/);
        expect($button).to.have.css('font-size');
      })
  };

  testButtonHover(button: Cypress.Chainable<JQuery<HTMLButtonElement>>) {
    button.realHover()
      .then(($button) => {
        expect($button).to.have.css('color', 'rgb(36, 94, 36)')
        expect($button).to.have.css('background-color', 'rgba(14, 215, 165, 0.925)')
        expect($button).to.have.css('border-radius', '30px')
        expect($button).to.have.css('font-weight', '800')
        expect($button).to.have.css('box-shadow').to.match(/.*rgb\(0, 0, 0\).*/);
    })
  };

  testVisibleNavArrows(navArrow: Cypress.Chainable<JQuery<HTMLElement>>) { 
    // cy.log(`${navArrow}`)
    navArrow
      .should("be.visible")
      .and("have.css", "position", "absolute")
      .and("have.css", "display", "flex")
      .and("have.css", "align-items", "center")
      .and("have.css", "justify-content", "center")
      .and("have.css", "color", "rgb(0, 255, 13)")
      .and("have.css", "background-color", "rgba(210, 210, 210, 0.3)")
      .then(($div) => {
        expect($div).to.have.css("padding");
        expect($div).to.have.css("border-radius");
      })
      .children()
      .should("have.length", 1);
  };
}
