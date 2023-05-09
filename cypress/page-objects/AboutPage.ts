import { BASEURL } from "../support/e2e";

export class AboutPage {
    aboutMain: Cypress.Chainable<JQuery<HTMLElement>>;
    aboutIntro: Cypress.Chainable<JQuery<HTMLElement>>;
    aboutDetail: Cypress.Chainable<JQuery<HTMLElement>>;

    constructor() {
        cy.visit(BASEURL + "/about");
        this.aboutMain = cy.get('#aboutMain');
        this.aboutIntro = cy.get('#aboutIntro');
        this.aboutDetail = cy.get('#aboutDetail');
    }

    testIntroListItem(item: Cypress.Chainable<JQuery<HTMLElement>>) { 
        item
            .children()
            .first()
            .should("have.attr", "height", "1em")
            .and("have.attr", "width", "1em")
            .and("have.attr", "viewBox", "0 0 16 16")
            .children()
            .should("have.length", 1)
            .next()
            .contains("")
    }

}