/** @format */
/// <reference types="cypress" />

const buttonStyleTesting = (button: Cypress.Chainable<JQuery<HTMLButtonElement>>) => {
  button
    .should('have.css', 'display', 'flex')
    .should('have.css', 'align-items', 'center')
    .should('have.css', 'justify-content', 'center')
    .should('have.css', 'text-align', 'center')
    .should('have.css', 'margin', 'center')
    .should('have.css', 'color', 'rgb(0, 255, 13)')
    .should('have.css', 'background-color', 'rgba(14, 215, 165, 0.924)')
    .should('have.css', 'font-size', '1.8vw')
    .should('have.css', 'font-weight', '900')
    .should('have.css', 'border', '1px solid rgba(14, 215, 165, 0.924)')
    .should('have.css', 'border-radius', '8px')
    .should('have.css', 'box-shadow', '3px 3px 1px rgba(14, 215, 165, 0.924)')
    .trigger('mouseover')
    .should('have.css', 'color', 'rgb(36, 94, 36)')
    .should('have.css', 'background-color', 'rgba(14, 215, 165, 0.924)')
    .should('have.css', 'border-radius', '30px')
    .should('have.css', 'font-weight', '800')
    .should('have.css', 'box-shadow', '8px 8px 5px black')
    .trigger('mouseout')
    .should('have.css', 'color', 'rgb(0, 255, 13)')
    .should('have.css', 'background-color', 'rgba(14, 215, 165, 0.924)')
    .should('have.css', 'border-radius', '8px')
    .should('have.css', 'font-weight', '900')
    .should('have.css', 'box-shadow', '3px 3px 1px rgba(14, 215, 165, 0.924)')
  
}

export class ResumePage {
  topButton: Cypress.Chainable<JQuery<HTMLElement>>;
  resumeHolder: Cypress.Chainable<JQuery<HTMLElement>>;
  resume: Cypress.Chainable<JQuery<HTMLElement>>;
  bottomButton: Cypress.Chainable<JQuery<HTMLElement>>;
  constructor() {
    this.topButton = cy.get("#top-buttons");
    this.resumeHolder = cy.get("#resumePage");
    this.resume = cy.get("#resume");
    this.bottomButton = cy.get("#bottom-buttons");
  }

  testButtonLayout(buttons: Cypress.Chainable<JQuery<HTMLElement>>) {
    buttons
      .children()
      .should("have.length", 2)
      .first()
      .should("have.text", "Download")
      .children()
      .should("have.length", 2)

    buttons
      .children()
      .last()
      .should("have.text", "View")
      .children()
      .should("have.length", 2)
  }

  testButtonStyle(buttons: Cypress.Chainable<JQuery<HTMLElement>>) {
    let button: Cypress.Chainable<JQuery<HTMLButtonElement>> = buttons
      .get("button")
      .first();
    buttonStyleTesting(button);

    button = buttons
      .get("button")
      .last();
    buttonStyleTesting(button);
    
  }
}
