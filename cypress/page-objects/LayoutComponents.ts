
const platforms = ["github", "twitter", "linkedin", "instagram"]
export class LayoutComps {
    preload: Function;
    navbar: Function;
    brand: Function;
    collapse: Function;
    toggle: Function;
    footer: Function;

    constructor() {
        this.preload = (): Cypress.Chainable<JQuery<HTMLElement>> => {
            return cy.get("#navbar")
        }
        this.navbar = (): Cypress.Chainable<JQuery<HTMLElement>> => {
            return cy.get("#navbar")
        }
        this.brand = (): Cypress.Chainable<JQuery<HTMLElement>> => {
            return cy.get("#navbarBrand")
        }
        this.collapse = (): Cypress.Chainable<JQuery<HTMLElement>> => {
            return cy.get("#responsive-navbar-nav")
        }
        this.toggle = (): Cypress.Chainable<JQuery<HTMLElement>> => {
            return cy.get("#navbarToggle")
        }
        this.footer = (): Cypress.Chainable<JQuery<HTMLElement>> => {
            return cy.get("#footer")
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

    testFooterItemLayout(footerLink: Cypress.Chainable<JQuery<HTMLElement>>, idx: number) {
        footerLink
            .should("have.attr", "role", "presentation")
            .find("a")
            .should("have.length", 1)
            .first()
            .should("have.attr", "target", "_blank")
            .and("have.attr", "rel", "noopener noreferrer")
            .then((li) => {
                expect(li).to.have.attr("href").contains(platforms[idx])
            })
            .children()
            .should("have.length", 1)
    }

    testFooterItemStyle(footerLink: Cypress.Chainable<JQuery<HTMLElement>>) {
        footerLink
            .then(($item: JQuery<HTMLElement>) => {
                expect($item).to.have.css("padding");
            })
            .find("a")
            .first()
            .should("be.visible")
            .and("have.css", "color", /.*rgb\(206, 255, 208\).*/)
            .then(($link: JQuery<HTMLElement>) => {
                $link.trigger("mouseover");
                expect($link).to.have.css("color").match(/.*rgb\(0, 255, 13\).*/);
                $link.trigger("mouseout");
            })
            .children()
            .first()
            .should("be.visible")
            .and("have.css", "font-size");
    }
}