/** @format */

/// <reference types="cypress" />

import { LayoutComps } from "../page-objects/LayoutComponents";
import {
  BASEURL,
  getWindowInnerWidth,
  setupPageWithTheme,
  viewPortSetup,
  viewportDisplay,
  viewports,
} from "../support/e2e";

const layoutComp: LayoutComps = new LayoutComps();
const LAYOUTURLS = () => {
  let extentions = ["/", "/about", "/projects", "/experience", "/resume"];
  extentions.map((ext) => {
    BASEURL + ext;
  });
  return extentions;
};

for (let viewport of viewports) {
  const viewString = viewportDisplay(viewport);
  for (let url of LAYOUTURLS().slice(0, 1)) {
    const urlString =
      url.length > 1 ? url.replace("/", "").toLocaleUpperCase() : "Home";
    context(
      `All layout components render correctly on Page: ${urlString} at Viewport: ${viewString}`,
      () => {
        before(() => {
          viewPortSetup(viewport);
          setupPageWithTheme(url, "dark");
        });

        describe(`The NavBar renders correctly on Page: ${urlString} at Viewport: ${viewString}`, () => {
          // NavBar
          it("The correct number of elements render inside the navbar", () => {
            layoutComp
              .navbar()
              .should("be.visible")
              .children()
              .should("have.length", 3);
          });

          it("The NavBar has the correct css stylings", () => {
            layoutComp
              .navbar()
              .should("have.css", "display", "flex")
              .and("have.css", "justify-content", "space-around")
              .and("have.css", "align-items", "center")
              .and("have.css", "position", "fixed")
              .and("have.css", "z-index", "2000")
              .and("have.css", "transition", "all 0.3s ease-out 0s")
              .then(($nav: Cypress.Chainable<JQuery<HTMLElement>>) => {
                expect($nav).to.have.css("width");
                expect($nav).to.have.css("max-height");
                expect($nav).to.have.css("padding");
                expect($nav).to.have.css("font-size");
              });
          });

          it("The NavBar changes css stylings on scroll", () => {
            let nav: Cypress.Chainable<JQuery<HTMLSpanElement>> = layoutComp
              .navbar()
              .should("have.css", "display", "flex")
              .and("have.css", "justify-content", "space-around")
              .and("have.css", "align-items", "center")
              .and("have.css", "position", "fixed")
              .and("have.css", "transition", "all 0.3s ease-out 0s")
              .and("have.css", "z-index", "2000");

            cy.scrollTo(0, 400);
            cy.wait(500);

            nav.then(($nav: JQuery<HTMLElement>) => {
              expect($nav).to.have.css("width");
              expect($nav).to.have.css("max-height");
              expect($nav).to.have.css("padding");
              expect($nav)
                .to.have.css("background-color")
                .match(/.*rgba\(1, 56, 4, 0.46.*/);
              expect($nav)
                .to.have.css("box-shadow")
                .match(/.*rgba\(0, 156, 13, 0.87.*/);
              expect($nav)
                .to.have.css("backdrop-filter")
                .match(/.*blur.*/);
            });
            cy.scrollTo("top");
          });
        });

        describe(`The NavBar's Brand Logo renders correctly on Page: ${urlString} at Viewport: ${viewString}`, () => {
          // NavBar Brand
          it("The Brand container has the correct css stylings", () => {
            getWindowInnerWidth().then((width: number) => {
              if (width > 900) {
                expect(width).to.be.greaterThan(900);
                layoutComp.brand().should("have.css", "position", "relative");
              } else {
                expect(width).to.be.lessThan(900);
                layoutComp
                  .brand()
                  .should("have.css", "position", "absolute")
                  .then(($brand: Cypress.Chainable<JQuery<HTMLElement>>) => {
                    expect($brand).to.have.css("top");
                    expect($brand).to.have.css("left");
                  });
              }
            });
          });

          it("The Brand is rendering the correct layout", () => {
            layoutComp
              .brand()
              .should("be.visible")
              .children()
              .should("have.length", 2);

            layoutComp
              .brand()
              .should("be.visible")
              .find("p")
              .should("have.length", 1)
              .first()
              .should("not.be.visible")
              .and("have.attr", "id", "mode");

            layoutComp
              .brand()
              .should("be.visible")
              .find("img")
              .should("have.length", 1)
              .first()
              .should("be.visible");
          });

          it("The Brand overlay is rendering and with correct CSS", () => {
            layoutComp
              .brand()
              .find("p")
              .first()
              .should("not.be.visible")
              .then(($overlay: JQuery<HTMLElement>) => {
                expect($overlay).to.have.css("display", "none");
                expect($overlay).to.have.css("position", "absolute");
                expect($overlay).to.have.css("justify-content", "center");
                expect($overlay).to.have.css("align-items", "center");
                expect($overlay).to.have.css("z-index", "-500");
                expect($overlay).to.have.css("top");
                expect($overlay).to.have.css("left");
                expect($overlay).to.have.css("font-size");
              });
          });

          it("The Brand image is rendering and with correct CSS", () => {
            layoutComp
              .brand()
              .find("img")
              .first()
              .should("have.attr", "alt", "Theme changing Navigation logo")
              .and("have.css", "position", "relative")
              .then(($brand: Cypress.Chainable<JQuery<HTMLElement>>) => {
                expect($brand)
                  .to.have.attr("src")
                  .match(/.*assets.*logo\.png.*/);
                expect($brand).to.have.css("width");
                expect($brand).to.have.css("height");
                expect($brand).to.have.css("left");
                expect($brand).to.have.css("border-radius");
                expect($brand).to.have.css("transform");
              });
          });

          it("The Brand mouse hover effects are functional", () => {
            let overlay = layoutComp
              .brand()
              .find("p")
              .first()
              .should("not.be.visible");
            let logo = layoutComp
              .brand()
              .find("img")
              .first()
              .should("be.visible");

            logo.trigger("mouseover");
            logo.then((logo) => {
              expect(logo)
                .to.have.css("filter")
                .match(/.*grayscale.*contrast.*opacity.*/);
            });
            overlay.should("have.css", "display", "block");

            logo.trigger("mouseout");
            logo.should("have.css", "filter", "none");
            overlay.should("have.css", "display", "inline");
          });

          it("The Brand effectively changes the logo and overlay on click", () => {
            let overlay: string = layoutComp
              .brand()
              .find("p")
              .first()
              .invoke("text");

            let logo = layoutComp
              .brand()
              .find("img")
              .first()
              .should("be.visible");

            logo
              .should("have.attr", "alt", "Theme changing Navigation logo")
              .then(($brand: JQuery<HTMLElement>) => {
                expect($brand)
                  .to.have.attr("src")
                  .match(/.*assets.*logo\.png.*/);
              });
            logo.click();
            logo.then(($brand: JQuery<HTMLElement>) => {
              expect($brand)
                .to.have.attr("src")
                .match(/.*assets.*CyberHedera1\.png.*/);
            });
            expect(overlay).to.not.equal(
              layoutComp.brand().find("p").first().invoke("text")
            );

            // Reset
            logo.click();
          });
        });

        describe(`The NavBar's Collapsable Navigation renders correctly on Page: ${urlString} at Viewport: ${viewString}`, () => {
          // NavBar Collapse
          it("The Collapse section renders and has the Nav inside", () => {
            layoutComp
              .collapse()
              .should("be.visible")
              .children()
              .should("have.length", 1)
              .first()
              .should("be.visible");
          });

          it("The Nav has the correct number of Link items", () => {
            let nav: Cypress.Chainable<JQuery<HTMLElement>> = layoutComp
              .collapse()
              .children()
              .first();

            getWindowInnerWidth().then((width) => {
              if (width > 900) {
                nav.children().should("have.length", 6);
              } else {
                nav.children().should("have.length", 5);
              }
            });
          });

          it("The Nav has the correct CSS styling", () => {
            let nav: Cypress.Chainable<JQuery<HTMLElement>> = layoutComp
              .collapse()
              .children()
              .first();

            getWindowInnerWidth().then((width) => {
              if (width > 900) {
                // Navbar Nav
                nav
                  .should("have.css", "display", "flex")
                  .and("have.css", "justify-content", "space-between")
                  .and("have.css", "transition", "all 0.3s ease-out 0s")
                  .and("have.css", "margin");
              } else {
                // NavClosed
                nav
                  .should("have.css", "display", "none")
                  .and("have.css", "transition", "all 0.3s ease-out 0s");
              }
            });
          });

          it("Each of the Nav Items has the correct layout", () => {
            let navItems: Cypress.Chainable<JQuery<HTMLElement>> = layoutComp
              .collapse()
              .children()
              .first()
              .children("div");

            for (let i = 0; i < 6; i++) {
              navItems.each(($item) => {
                layoutComp.testNavItemLayout(cy.wrap($item));
              });
            }
          });

          it("Each of the Nav Links has the correct CSS stylings", () => {
            const width = getWindowInnerWidth();
            let navItems: Cypress.Chainable<JQuery<HTMLElement>> = layoutComp
              .collapse()
              .children()
              .first()
              .children("div");

            for (let i = 0; i < 6; i++) {
              navItems.each(($item, idx) => {
                layoutComp.testNavLinkStyle(cy.wrap($item), width, idx);
              });
            }
          });
        });

        describe(`The NavBar Toggle renders correctly on Page: ${urlString} at Viewport: ${viewString}`, () => {
          // NavBar Toggle
          it("The Toggle renders with the correct number of elements", () => {});
          it("The Toggle renders with the correct css styles", () => {});
          it("The Toggle functionally expands the NavBar", () => {});
        });

        describe(`The footer renders correctly on Page: ${urlString} at Viewport: ${viewString}`, () => {
          it("The Footer is rendering with the correct layout", () => {
            layoutComp
              .footer()
              .should("be.visible")
              .children()
              .should("have.length", 1)
              .first()
              .then(($footer: JQuery<HTMLElement>) => {
                if (urlString === "Home") {
                  cy.wrap($footer).children().should("have.length", 2);
                } else {
                  cy.wrap($footer).children().should("have.length", 3);
                }
              });
          });

          it("The Footer is rendering the correct text", () => {
            let textItems = layoutComp
              .footer()
              .children()
              .should("have.length", 1)
              .first()
              .children("div");

            textItems.then((texts: JQuery<HTMLElement>) => {
              cy.wrap(texts)
                .first()
                .invoke("text")
                .should("match", /.*Designed and Developed by.*/);

              cy.wrap(texts)
                .last()
                .invoke("text")
                .should("match", /.*Copyright.*/);
            });
          });

          it("The Footer Nav is correctly rendering the navigation links", () => {
            if (urlString === "Home") {
              layoutComp
                .footer()
                .children()
                .first()
                .should("be.visible")
                .children()
                .should("have.length", 2);
            } else {
              layoutComp
                .footer()
                .children()
                .first()
                .should("be.visible")
                .children()
                .should("have.length", 3)
                .last()
                .should("be.visible")
                .find("ul")
                .first()
                .should("be.visible")
                .children("li")
                .should("have.length", 4);
            }
          });

          it("The Footer Nav List have the correct stylings", () => {
            if (urlString !== "Home") {
              layoutComp
                .footer()
                .children()
                .first()
                .children("nav")
                .first()
                .should("have.attr", "aria-label", "Personal Social Links")
                .children("ul")
                .first()
                .should("have.css", "display", "flex")
                .and("have.css", "justify-content", "center")
                .and("have.css", "justify-content", "center")
                .then(($ul: Cypress.Chainable<JQuery<HTMLElement>>) => {
                  expect($ul).to.have.css("margin-top");
                  expect($ul).to.have.css("padding");
                });
            }
          });

          it("Each of the Footer Links has the correct layout", () => {
            if (urlString !== "Home") {
              let linkItems: Cypress.Chainable<JQuery<HTMLElement>> = layoutComp
                .footer()
                .children()
                .first()
                .children("nav")
                .first()
                .children("ul")
                .first()
                .children("li");

              linkItems.each(($item, idx) => {
                layoutComp.testFooterItemLayout(cy.wrap($item), idx);
              });
            }
          });

          it("Each of the Footer Links render the correct CSS", () => {
            if (urlString !== "Home") {
              let linkItems: Cypress.Chainable<JQuery<HTMLElement>> = layoutComp
                .footer()
                .children()
                .first()
                .children("nav")
                .first()
                .children("ul")
                .first()
                .children("li");

              linkItems.each(($item) => {
                layoutComp.testFooterItemStyle(cy.wrap($item));
              });
            }
          });
        });

        //! Not implemented yet
        // describe(`The particle renders correctly  at viewport: on Page: ${urlString} at Viewport: ${viewString}`, () => {
        //     before(() => { viewPortSetup(viewport) });
        //     beforeEach(() => { setupPageWithTheme(url, "dark") })

        //     it("", () => {

        //     })
        // });
      }
    );
  }
  if (!Cypress.env("FULL_SPECTRUM")) {
    break;
  }
}
