/** @format */

export class WorkPage {
  getWorkContainer: () => Cypress.Chainable<JQuery<HTMLElement>>;
  getWorkIntro: () => Cypress.Chainable<JQuery<HTMLElement>>;
  getWorkToggles: () => Cypress.Chainable<JQuery<HTMLElement>>;
  toggleWorkSection: (toggleIdx: number) => void;
  getWorkList: () => Cypress.Chainable<JQuery<HTMLElement>>;

  constructor() {
    this.getWorkContainer = () => cy.get("#workContainer");
    this.getWorkIntro = () => cy.get("#workIntro");
    this.getWorkToggles = () => cy.get("#workToggle");
    this.toggleWorkSection = (toggleIdx: number) => {
      this.getWorkToggles().eq(toggleIdx).realClick({ position: "center" });
    };

    this.getWorkList = () => cy.get("#workList");
  }
}
