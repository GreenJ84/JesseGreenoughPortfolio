/// <reference types="cypress" />

import { LayoutComps } from "../page-objects/LayoutComponents"
import { BASEURL, getWindowInnerWidth, setupPageWithTheme, viewPortSetup, viewportDisplay, viewports } from "../support/e2e"

let layoutComp: LayoutComps;
const LAYOUTURLS = () => {
    let extentions = ["/", "/about", "/projects", "/experience", "/resume"]
    extentions.map((ext) => { BASEURL + ext })
    return extentions
}

context("All layout components render correctly across pages", () => {
    before(() => {
        layoutComp = new LayoutComps()
    })

    for (let url of LAYOUTURLS()) {
        let viewport = viewports[0];
        // for (let viewport of viewports) {
            describe(`The Pre-loader renders correctly at viewport: ${viewportDisplay(viewport)}`, () => {
                before(() => { viewPortSetup(viewport) });
                beforeEach(() => { setupPageWithTheme(url, "dark") })

                it("The Preloader is rendering during load times", () => {
                    layoutComp.preload()
                        .should("be.visable")
                });

                it("The Preloader is rendering with the correct attributes and stylings", () => {
                    //! Not yet implmented
                    expect(true).to.be.true;
                });
            });

            describe(`The NavBar renders correctly at viewport: ${viewportDisplay(viewport)}`, () => {
                before(() => { viewPortSetup(viewport) });
                beforeEach(() => { setupPageWithTheme(url, "dark") });
                // NavBar
                it("The correct number of elements render inside the navbar", () => {
                    layoutComp.navbar()
                        .should("be.visible")
                        .children()
                        .should("have.length", 3)
                        .forEach((el: Cypress.Chainable<JQuery<HTMLElement>>) => {
                            el.should("be.visible")
                        })
                });

                it("The NavBar has the correct css stylings", () => {
                    layoutComp.navbar()
                        .should("have.css", "display", "flex")
                        .and("have.css", "justify-content", "space-around")
                        .and("have.css", "align-items", "center")
                        .and("have.css", "position", "fixed")
                        .and("have.css", "z-index", "2000")
                        .and("have.css", "transition", "all 0.3s ease-out 0s")
                        .then(($nav: Cypress.Chainable<JQuery<HTMLElement>>) => {
                            expect($nav).to.have.css("width")
                            expect($nav).to.have.css("max-height")
                            expect($nav).to.have.css("padding")
                            expect($nav).to.have.css("font-size")
                        });
                });

                it("The NavBar changes css stylings on scroll", () => {
                    cy.get('body').then(($body) => {
                        $body[0].scrollBy(0, 100);
                    });
                    layoutComp.navbar()
                        .should("have.css", "display", "flex")
                        .and("have.css", "justify-content", "space-around")
                        .and("have.css", "align-items", "center")
                        .and("have.css", "position", "fixed")
                        .and("have.css", "transition", "all 0.3s ease-out 0s")
                        .and("have.css", "z-index", "2000")
                        .then(($nav: Cypress.Chainable<JQuery<HTMLElement>>) => {
                            expect($nav).to.have.css("width")
                            expect($nav).to.have.css("max-height")
                            expect($nav).to.have.css("padding")
                            expect($nav).to.have.css("background-color").match(/.*rgba\(1, 56, 4, 0.46.*/)
                            expect($nav).to.have.css("box-shadow").match(/.*rgba\(0, 156, 13, 0.87.*/)
                            expect($nav).to.have.css("backdrop-filter").match(/.*blur.*/)
                        });
                });
            });

            describe(`The NavBar's Brand Logo renders correctly at viewport: ${viewportDisplay(viewport)}`, () => {
                before(() => { viewPortSetup(viewport) });
                beforeEach(() => { setupPageWithTheme(url, "dark") });
                // NavBar Brand
                it("The Brand container has the correct css stylings", () => {
                    let width: number = 0;
                    cy.window().then((win) => {
                        width = win.innerWidth;
                    })

                    if (width > 900) {
                        layoutComp.brand()
                            .should("have.css", "position", "relative")
                    } else {
                        layoutComp.brand()
                            .should("have.css", "position", "absolute")
                            .then(($brand: Cypress.Chainable<JQuery<HTMLElement>>) => {
                                expect($brand).to.have.css("top")
                                expect($brand).to.have.css("left")
                            })
                    }
                });

                it("The Brand is rendering the correct layout", () => {
                    layoutComp.brand()
                        .then(($brand: Cypress.Chainable<JQuery<HTMLElement>>) => {
                            $brand.children()
                                .should("have.length", 2);

                            $brand.find("p")
                                .should("have.length", 1)
                                .first()
                                .should("be.visible")
                                .and("have.attr", "id", "mode")
                            
                            $brand.find("img")
                                .should("have.length", 1)
                                .first()
                                .should("be.visible")
                        })
                });

                it("The Brand overlay is rendering and with correct CSS", () => {
                    layoutComp.brand()
                        .find("p")
                        .first()
                        .should("be.visible")
                        .then(($overlay: JQuery<HTMLElement>) => { 
                            expect($overlay).to.have.css("position", "absolute")
                            expect($overlay).to.have.css("display", "flex")
                            expect($overlay).to.have.css("justify-content", "center")
                            expect($overlay).to.have.css("align-items", "center")
                            expect($overlay).to.have.css("z-index", "-500")
                            expect($overlay).to.have.css("display", "none")
                            expect($overlay).to.have.css("top")
                            expect($overlay).to.have.css("left")
                            expect($overlay).to.have.css("font-size")
                        })
                });

                it("The Brand image is rendering and with correct CSS", () => {
                    layoutComp.brand()
                        .find("img")
                        .first()
                        .should("have.attr", "alt", "Theme changing Navigation logo")
                        .and("have.attr", "src", /assets\/logo\.png/)
                        .and("have.css", "position", "relative")
                        .then(($brand: Cypress.Chainable<JQuery<HTMLElement>>) => {
                            expect($brand).to.have.css("width")
                            expect($brand).to.have.css("height")
                            expect($brand).to.have.css("left")
                            expect($brand).to.have.css("border-radius")
                            expect($brand).to.have.css("transform")
                        });
                });

                it("The Brand mouse over effects are functional", () => {
                    let overlay = layoutComp.brand()
                        .find("p");
                    let logo = layoutComp.brand()
                        .find("img");
                    
                    logo.trigger("mouseover");
                    logo.should("have.css", "filter", /.*grayscale.*contrast.*opacity.*/);
                    overlay.should("have.css", "display", "block");

                    logo.trigger("mouseout");
                    logo.should("have.css", "filter", "");
                    overlay.should("have.css", "display", "none");
                });

                it("The Brand effectively changes the logo and overlay on click", () => {
                    let overlay = layoutComp.brand()
                        .find("p").text();
                    let logo = layoutComp.brand()
                        .find("img");
                    
                    logo.click();
                    logo.should("have.attr", "alt", "Theme changing Navigation logo")
                        .and("have.attr", "src", /assets\/CyberHedera1\.png/)
                    
                    expect(overlay).to.not.equal(logo.find("p").text());
                });
            });

            describe(`The NavBar's Collapsable Navigation renders correctly at viewport: ${viewportDisplay(viewport)}`, () => {
                before(() => { viewPortSetup(viewport) });
                beforeEach(() => { setupPageWithTheme(url, "dark") })

                // NavBar Collapse
                it("The Collapse section renders and has the Nav inside", () => {
                    layoutComp.collapse()
                        .should("be.visible")
                        .children()
                        .should("have.length", 1)
                        .first()
                        .should("be.visible")
                });

                it("The Nav has the correct number of Link items", () => {
                    let nav: Cypress.Chainable<JQuery<HTMLElement>> = layoutComp.collapse()
                        .children()
                        .first()
                    
                    if (getWindowInnerWidth() > 900) {
                        nav.children()
                            .should("have.length", 6)
                    } else {
                        nav.children()
                            .should("have.length", 5)
                    }
                });

                it("The Nav has the correct CSS styling", () => {
                    let nav: Cypress.Chainable<JQuery<HTMLElement>> = layoutComp.collapse()
                        .children()
                        .first()
                    
                        if (getWindowInnerWidth() > 900) {
                            // Navbar Nav
                            nav
                                .should("have.css", "display", "flex")
                                .and("have.css", "justify-content", "space-between")
                                .and("have.css", "justify-content", "center")
                                .and("have.css", "transition", "all 0.3s ease-out 0s")
                                .and("have.css", "margin")
                        } else {
                            // NavClosed
                            nav
                                .should("have.css", "display", "none")
                                .and("have.css", "transition", "all 0.3s ease-out 0s")
                        }
                });
                
                it("Each of the Nav Items has the correct layout", () => {
                    let navItems: Cypress.Chainable<JQuery<HTMLElement>> = layoutComp.collapse()
                        .children()
                        .first()
                        .children()
                    
                    for (let i = 0; i < 6; i++) { 
                        layoutComp.testNavItemLayout(navItems.eq(i))
                    }
                });

                it("Each of the Nav Items has the correct CSS stylings", () => {
                    let navItems: Cypress.Chainable<JQuery<HTMLElement>> = layoutComp.collapse()
                        .children()
                        .first()
                        .children()
                    
                    for (let i = 0; i < 6; i++) { 
                        layoutComp.testNavItemLayout(navItems.eq(i))
                    }
                });

                it("Each of the Nav Links has the correct CSS stylings", () => {
                    const width = getWindowInnerWidth();
                    let navItems: Cypress.Chainable<JQuery<HTMLElement>> = layoutComp.collapse()
                        .children()
                        .first()
                        .children()

                    for (let i = 0; i < 6; i++) {
                        layoutComp.testNavLinkStyle(navItems.eq(i), width)
                    }
                });
            });

            describe(`The NavBar Toggle renders correctly at viewport: ${viewportDisplay(viewport)}`, () => {
                before(() => { viewPortSetup(viewport) });
                beforeEach(() => { setupPageWithTheme(url, "dark") });
                // NavBar Toggle
                it("The Toggle renders with the correct number of elements", () => { });
                it("The Toggle renders with the correct css styles", () => { });
                it("The Toggle functionally expands the NavBar", () => { });
            });

            describe(`The footer renders correctly at viewport: ${viewportDisplay(viewport)}`, () => {
                before(() => { viewPortSetup(viewport) });
                beforeEach(() => { setupPageWithTheme(url, "dark") })

                it("The Footer is rendering with the correct layout", () => {

                });
                it("The Footer is rendering the correct text", () => { });
                it("The Footer Nav is rendering the correct number of links", () => { });
                it("Each of the Footer Links has the correct layout", () => { });
                it("Each of the Footer Links render the correct CSS", () => { });
            });

            //! Not implemented yet
            // describe(`The particle renders correctly at viewport: ${viewportDisplay(viewport)}`, () => {
            //     before(() => { viewPortSetup(viewport) });
            //     beforeEach(() => { setupPageWithTheme(url, "dark") })

            //     it("", () => {

            //     })
            // });
        }
    // }
})