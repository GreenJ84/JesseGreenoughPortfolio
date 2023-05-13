import { getWindowInnerWidth } from "../support/e2e";

export class LayoutComps {
    preload: Function;
    navbar: Function;
    brand: Function;
    collapse: Function;
    toggle: Function;
    footer: Function;

    constructor() {
        this.preload = () => { 
            cy.get("#navbar")
        }
        this.navbar = () => {
            cy.get("#navbar")
        }
        this.brand = () => {
            cy.get("#navbarBrand")
        }
        this.collapse = () => {
            cy.get("#responsive-navbar-nav")
        }
        this.toggle = () => {
            cy.get("#navbarToggle")
        }
        this.footer = () => {
            cy.get("#footer")
        }
    }

    testNavItemLayout(navItem: Cypress.Chainable<JQuery<HTMLElement>>) { 
        navItem.children()
            .should("have.length", 1)

        navItem
            .find("a")
            .should("have.length", 1)
            .first()
            .should("be.visible")
            .should("contain.text", "")
            .children()
            .should("have.length", 1)
    }
    
    testNavItemStyle(navItem: Cypress.Chainable<JQuery<HTMLElement>>) {
        navItem
            .should("be.visible")
            .and("have.css", "position", "relative")
            .then(($item: JQuery<HTMLElement>) => {
                expect($item).to.have.css("margin");
                expect($item).to.have.css("padding");
            })
        navItem.trigger("mouseover");
        navItem
            .should("have.css", "border-radius", "20px")
            .and("have.css", "background-color")

        navItem.trigger("mouseout");
    }

    testNavLinkStyle(navItem: Cypress.Chainable<JQuery<HTMLElement>>, width: number) {
        navItem
            .find("a")
            .first()
            .should("be.visible")
            .and("have.css", "display", "flex")
            .and("have.css", "align-items", "center")
            .and("have.css", "font-weight", "400")
            .and("have.css", "transition", "all 0.3s ease-out 0s")
            .and("have.css", "position", "relative")
            .then(($link: JQuery<HTMLElement>) => {
                expect($link).to.have.css("color").match(/rgb\(111, 255, 118\)/);
                expect($link).to.have.css("text-shadow").match(/.*rgba\(0, 156, 13, 0\.87.*\)/);
                expect($link).to.have.css("font-size");

                if (width > 900) {
                    expect($link).to.have.css("flex-direction", "column");
                } else {
                    expect($link).to.have.css("flex-direction", "row");
                    expect($link).to.have.css("padding");
                }
            })
    }
}