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

    //! ======================  Navbar  =========================
    context(`${urlString} Page Navbar component render testing`, () => {
      before(() => {
        setupPageWithTheme(url, "dark");
        cy.wait(200);
      });
      
      let width: number;
      beforeEach(() => {
        viewPortSetup(viewport);
        cy.wait(200);
        getWindowInnerWidth().then((w) => (width = w));
        cy.wait(300);
      });

      after(() => {
        cy.wait(10000);
      });

      describe(`The NavBar container correctly renders at Viewport: ${viewString}`, () => {
        it("Container is rendering the correct layout", () => {
          layoutComp
            .getNavbar()
            .should("be.visible")
            .children()
            // Brand, Collapse, menu toggle
            .should("have.length", 3);
        });

        it("Container is rendering the correct styling", () => {
          cy.scrollTo(0, 0).wait(100);

          layoutComp.getNavbar().then((nav) => {
            expect(nav).to.have.css("display", "flex");
            expect(nav).to.have.css("justify-content", "space-between");
            expect(nav).to.have.css("position", "fixed");
            expect(nav).to.have.css("width");
            expect(nav).to.have.css("height");
            expect(nav).to.have.css("padding");
            expect(nav).to.have.css("z-index", "20");
            expect(nav).to.have.css("transition", "all 0.3s ease-out 0s");
            expect(nav)
              .to.have.css("background-color")
              .match(/rgba\(0, 142, 8, 0\.46\d+\)/);

            if (width > 600) {
              expect(nav).to.have.css("align-items", "center");
              expect(nav).to.have.css("backdrop-filter", "blur(2px)");
            } else {
              expect(nav).to.have.css("align-items", "flex-start");
              expect(nav).to.have.css("backdrop-filter", "blur(25px)");
              expect(nav).to.have.css("padding-top", "15px");
            }
          });
        });

        it("Container changes css stylings as expected on scroll", () => {
          let shadow: string = "";
          let padding: string = "";
          layoutComp.getNavbar().then((nav) => {
            if (width > 600) {
              expect(nav).to.have.css("backdrop-filter", "blur(2px)");
            } else {
              expect(nav).to.have.css("backdrop-filter", "blur(25px)");
            }
            shadow = nav.css("box-shadow");
            padding = nav.css("padding");
          });
          cy.scrollTo(0, 400);
          cy.wait(500);

          layoutComp.getNavbar().then((nav) => {
            if (width > 600) {
              expect(nav).to.have.css("backdrop-filter", "blur(28px)");
            } else {
              expect(nav).to.have.css("backdrop-filter", "blur(25px)");
            }
            expect(nav).to.have.css("box-shadow").to.not.eq(shadow);
            expect(nav).to.have.css("padding").to.not.eq(padding);
          });
          cy.scrollTo(0, 0);
        });
      });

      describe(`The NavBar Brand Logo renders correctly at Viewport: ${viewString}`, () => {
        it("Brand conatiner is rendering the correct layout", () => {
          layoutComp
            .getNavbarBrand()
            .should("be.visible")
            .children()
            .should("have.length", 1)
            .first()
            .should("be.visible")
            .and("have.prop", "tagName", "IMG");
        });

        it("Brand container and image are rendering the correct styling", () => {
          layoutComp
            .getNavbarBrand()
            .should("have.css", "flex", "1 1 0%")
            .find("img")
            .first()
            .then((img) => {
              expect(img)
                .to.have.attr("src")
                .match(/.*assets.*logo\.png.*/);
              expect(img).to.have.attr("alt", "Developer NFT Brand logo");

              expect(img).to.have.css("width");
              expect(parseFloat(img.css("width")))
                .to.be.lte(100)
                .and.to.be.gte(70);
              expect(img).to.have.css("height");
              expect(parseFloat(img.css("height")))
                .to.be.lte(100)
                .and.to.be.gte(70);
              expect(img).to.have.css("border", "3px solid rgb(164, 255, 182)");
              expect(img).to.have.css("border-radius");
              expect(img).to.have.css("box-shadow").to.not.eq("none");
            });
        });

        it("Brand image hover effects change stylings as expected", () => {
          cy.wait(1500);
          layoutComp
            .getNavbarBrand()
            .find("img")
            .first()
            .then((img) => {
              expect(img).to.have.css("box-shadow").to.not.eq("none");
            })
            .realHover({ position: "center", scrollBehavior: "center" })
            .wait(600)
            .then((img) => {
              expect(img).to.have.css("box-shadow", "none");
            });
        });
      });

      describe(`The Navbar Collapsable Navigation renders correctly at Viewport: ${viewString}`, () => {
        beforeEach(() => {
          cy.wait(1500);
          if (width <= 600) {
            layoutComp
              .getNavbarToggle()
              .realClick({ position: "center", scrollBehavior: "center" });
            cy.wait(500);
          }
        });
        afterEach(() => {
          if (width <= 600) {
            layoutComp
              .getNavbarToggle()
              .realClick({ position: "center", scrollBehavior: "center" })
          }
          cy.wait(1500);
        });
        // NavBar Collapse
        it("Collapse container is rendering the correct layout", () => {
          layoutComp
            .getNavbarCollapse()
            .should("be.visible")
            .children()
            .should("have.length", 2)
            .then((children) => {
              getWindowInnerWidth().then((width) => {
                // Test nav list
                cy.wrap(children)
                  .eq(0)
                  .should("have.prop", "tagName", "UL")
                  .children()
                  // Test variable link item length
                  .then((listitems) => {
                    if (width < 1000) {
                      cy.wrap(listitems).should("have.length", 5);
                    } else {
                      cy.wrap(listitems).should("have.length", 6);
                    }
                  });
              });
              // Test Label
              cy.wrap(children)
                .eq(1)
                .should("have.prop", "tagName", "LABEL")
                .children()
                .should("have.length", 2);
            });
        });

        it("Collapse container is rendering the correct stylings", () => {
          layoutComp.getNavbarCollapse().then((container) => {
            expect(container).to.have.css("display", "flex");
            expect(container).to.have.css("align-items", "center");
            expect(container).to.have.css("justify-content", "space-around");
            expect(container).to.have.css("flex", "5 1 0%");
          });
        });

        it("Collapse Nav is rendering the correct styling", () => {
          layoutComp
            .getNavbarCollapse()
            .children("ul")
            .first()
            .then((nav) => {
              getWindowInnerWidth().then((width) => {
                expect(nav).to.have.css("list-style", "outside none none");
                expect(nav).to.have.css("display", "flex");
                expect(nav).to.have.css("justify-content", "space-between");
                expect(nav).to.have.css("align-items", "center");
                expect(nav).to.have.css("transition", "all 0.3s ease-out 0s");
                expect(nav).to.have.css("margin");
                if (width <= 600) {
                  expect(nav).to.have.css("flex-direction", "column");
                  expect(nav).to.have.css("padding-top", "10px");
                }
              });
            });
        });

        for (let idx of [...Array(5).keys()]) {
          it(`Nav item ${idx + 1}/5 is rendering the correct layout`, () => {
            layoutComp
              .getNavItem(idx)
              .should("be.visible")
              .then((navItem) => {
                if (idx === 3 && width >= 600) {
                  cy.wrap(navItem).children().should("have.length", 2);
                } else {
                  cy.wrap(navItem).children().should("have.length", 1);
                }
                return cy.wrap(navItem);
              })
              .children("a")
              .should("have.length", 1)
              .first()
              .should("be.visible")
              .and("contain.text", "")
              .children()
              .should("have.length", 1)
              .first()
              .should("be.visible");
          });

          it(`Nav item ${idx + 1}/5 is rendering the correct stylings`, () => {
            getWindowInnerWidth().then((width) => {
              layoutComp
                .getNavItem(idx)
                .then((navItem) => {
                  expect(navItem).to.have.css("position", "relative");
                  expect(navItem).to.have.css("margin");
                  expect(navItem).to.have.css("padding");
                  expect(navItem).to.have.css("color", "rgb(230, 255, 243)");
                  expect(navItem).to.have.css(
                    "background-color",
                    "rgba(0, 0, 0, 0)"
                  );
                  expect(navItem).to.have.css("border-radius", "0px");
                  return cy.wrap(navItem);
                })
                .children("a")
                .first()
                .then((navLink) => {
                  expect(navLink).to.have.css("display", "flex");
                  if (width > 600) {
                    expect(navLink).to.have.css("flex-direction", "column");
                  } else {
                    expect(navLink).to.have.css("flex-direction", "row");
                    expect(navLink).to.have.css("justify-content", "center");
                  }
                  expect(navLink).to.have.css("align-items", "center");
                  expect(navLink).to.have.css("font-size");
                  expect(parseFloat(navLink.css("font-size")))
                    .to.be.lte(22)
                    .and.to.be.gte(14);
                  expect(navLink).to.have.css("font-weight", "400");
                  expect(navLink).to.have.css("text-shadow").to.not.eq("none");
                  expect(navLink).to.have.css(
                    "transition",
                    "all 0.3s ease-out 0s"
                  );

                  return cy.wrap(navLink);
                })
                .children()
                .first()
                .then((icon) => {
                  if (width <= 600) {
                    expect(icon).to.have.css("margin-right");
                    expect(parseFloat(icon.css("margin-right"))).to.be.gt(0);
                  }
                  expect(icon).to.have.css("margin-bottom");
                  expect(parseFloat(icon.css("margin-bottom"))).to.be.gt(0);
                  expect(icon).to.have.css("font-size");
                  expect(parseFloat(icon.css("font-size")))
                    .to.be.lte(26)
                    .and.to.be.gte(16);
                });
            });
          });

          it(`Nav item ${
            idx + 1
          }/5 hover effects are rendering correctly`, () => {
            cy.wait(500);
            layoutComp
              .getNavItem(idx)
              .then((navItem) => {
                expect(navItem).to.have.css(
                  "background-color",
                  "rgba(0, 0, 0, 0)"
                );
                expect(navItem).to.have.css("border-radius", "0px");

                return cy.wrap(navItem);
              })
              .realHover({ position: "center", scrollBehavior: "center" })
              .wait(1000)
              .then((navItem) => {
                expect(navItem).to.have.css(
                  "background-color",
                  "rgba(195, 255, 203, 0.25)"
                );
                if (width > 1000) {
                  expect(navItem).to.have.css("border-radius", "20px");
                } else {
                  expect(navItem).to.have.css("border-radius", "10px");
                }

                // Education should pop up choices
                if (idx == 3 && width >= 600) {
                  cy.wrap(navItem)
                    .children("dialog")
                    .should("have.length", 1)
                    .first()
                    .should("be.visible");
                }
              });
          });
        }

        it("Education item hover dialog is rendering the correct layout", () => {
          cy.wait(500);
          layoutComp
            .getNavItem(3)
            .realHover({ position: "center", scrollBehavior: "center" })
            .wait(1000)
            .then((navItem) => {
              if (width < 600) {
                cy.wrap(navItem).children("dialog").should("have.length", 0);
              } else {
                // Education should pop up choices
                cy.wrap(navItem)
                  .children("dialog")
                  .first()
                  .children()
                  .should("have.length", 4)
                  .filter("a")
                  .should("have.length", 2)
                  .each((a, idx) => {
                    expect(a).to.have.text(idx == 0 ? "Education" : "Work");
                  });
              }
            });
        });

        it("Education item hover dialog is rendering the correct styling", () => {
          cy.wait(500);
          layoutComp
            .getNavItem(3)
            .realHover({ position: "center", scrollBehavior: "center" })
            .wait(1000)
            .then((navItem) => {
              if (width < 600) {
                cy.wrap(navItem).children("dialog").should("have.length", 0);
              } else {
                // Education should pop up choices
                cy.wrap(navItem)
                  .children("dialog")
                  .first()
                  .then((dialog) => {
                    expect(dialog).to.have.css("visibility", "visible");
                    expect(dialog).to.have.css("position", "absolute");
                    expect(dialog).to.have.css("top");
                    expect(dialog).to.have.css("left");
                    expect(dialog).to.have.css("transform");
                    expect(dialog).to.have.css("display", "flex");
                    expect(dialog).to.have.css("flex-direction", "column");
                    expect(dialog).to.have.css(
                      "justify-content",
                      "space-around"
                    );
                    expect(dialog).to.have.css("align-items", "center");
                    expect(dialog).to.have.css("width");
                    expect(dialog).to.have.css("height");
                    expect(dialog).to.have.css("text-align", "center");
                    expect(dialog).to.have.css("color", "rgb(230, 255, 243)");
                    expect(dialog).to.have.css(
                      "background-color",
                      "rgb(0, 17, 1)"
                    );
                    expect(dialog).to.have.css(
                      "border",
                      "1px solid rgb(230, 255, 243)"
                    );
                    expect(dialog).to.have.css("border-radius", "10px");
                    expect(dialog).to.have.css(
                      "transition",
                      "all 0s ease-in 0s"
                    );

                    return cy.wrap(dialog);
                  })
                  .children("div")
                  .each((div, idx) => {
                    expect(div).to.have.css("display", "block");
                    expect(div).to.have.css("position", "absolute");
                    expect(div).to.have.css("left");
                    expect(div).to.have.css("transform");
                    expect(div).to.have.css("width");
                    expect(div).to.have.css("height");

                    const firstChild = idx == 0;
                    expect(div).to.have.css(
                      "top",
                      firstChild ? "-5px" : "-4px"
                    );
                    expect(div).to.have.css(
                      "border-bottom",
                      `${firstChild ? "7px" : "8px"} solid ${
                        firstChild ? "rgb(230, 255, 243)" : "rgb(0, 17, 1)"
                      }`
                    );
                    expect(div).to.have.css(
                      "border-left",
                      `${firstChild ? "17px" : "16px"} solid rgba(0, 0, 0, 0)`
                    );
                    expect(div).to.have.css(
                      "border-right",
                      `${firstChild ? "17px" : "16px"} solid rgba(0, 0, 0, 0)`
                    );
                  });
              }
            });
        });

        it("Github Fork Button is rendering the correct stylings", () => {
          if (width < 1000) {
            layoutComp
              .getNavbarCollapse()
              .children("ul")
              .first()
              .children("a")
              .should("have.length", 0);
          } else {
            layoutComp
              .getGithubFork()
              .should("be.visible")
              .then((fork) => {
                expect(fork).to.have.css("display", "flex");
                expect(fork).to.have.css("flex-direction", "column");
                expect(fork).to.have.css("margin-right", "60px");
                expect(fork).to.have.css("margin-left").to.not.eq("0px");
                expect(fork).to.have.css("padding");
                expect(fork).to.have.css("text-align", "center");
                expect(fork).to.have.css("color", "rgb(164, 255, 182)");
                expect(fork).to.have.css("background-color", "rgb(12, 43, 33)");
                expect(fork).to.have.css(
                  "border",
                  "1px solid rgb(164, 255, 182)"
                );
                expect(fork).to.have.css("border-radius", "10px");
              });
          }
        });

        it("Github Fork Button is rendering the correct hover effect stylings", () => {
          if (width < 1000) {
            layoutComp
              .getNavbarCollapse()
              .children("ul")
              .first()
              .children("a")
              .should("have.length", 0);
          } else {
            cy.wait(500);
            layoutComp
              .getGithubFork()
              .then((fork) => {
                expect(fork).to.have.css("transform").to.eq("none");
                expect(fork).to.have.css("color", "rgb(164, 255, 182)");
                expect(fork).to.have.css("background-color", "rgb(12, 43, 33)");
                expect(fork).to.have.css("border-color", "rgb(164, 255, 182)");
                expect(fork).to.have.css("box-shadow").to.eq("none");
              })
              .realHover({ position: "center", scrollBehavior: "center" })
              .wait(1500)
              .then((fork) => {
                expect(fork).to.have.css("transform").to.not.eq("none");
                expect(fork).to.have.css("color", "rgb(12, 43, 33)");
                expect(fork).to.have.css(
                  "background-color",
                  "rgb(164, 255, 182)"
                );
                expect(fork).to.have.css("border-color", "rgb(12, 43, 33)");
                expect(fork).to.have.css("box-shadow").to.not.eq("none");
              });
          }
        });
      });

      describe(`The Navbar Theme switch renders correctly at Viewport: ${viewString}`, () => {
        beforeEach(() => {
          if (width <= 600) {
            layoutComp
              .getNavbarToggle()
              .realClick({ position: "center", scrollBehavior: "center" })
              .wait(1500);
          }
        });
        afterEach(() => {
          if (width <= 600) {
            layoutComp
              .getNavbarToggle()
              .realClick({ position: "center", scrollBehavior: "center" })
              .wait(1500);
          }
        });
        // NavBar Toggle
        it("The Switch is rendering the correct layout", () => {
          layoutComp
            .getNavbarCollapse()
            .children("label")
            .first()
            .should("be.visible")
            .children()
            .should("have.length", 2)
            .then((children) => {
              cy.wrap(children)
                .eq(0)
                .should("have.prop", "tagName", "INPUT")
                .and("have.attr", "type", "checkbox");

              cy.wrap(children).eq(1).should("have.prop", "tagName", "SPAN");
            });
        });

        it("The Switch is rendering the correct styling", () => {
          layoutComp
            .getThemeSwitch()
            .then(($switch) => {
              if (width > 600) {
                expect($switch).to.have.css("position", "relative");
                expect($switch).to.have.css("bottom").to.eq("0px");
                expect($switch).to.have.css("right").to.eq("0px");
              } else {
                expect($switch).to.have.css("position", "absolute");
                expect($switch).to.have.css("bottom").to.not.eq("0px");
                expect($switch).to.have.css("right").to.not.eq("0px");
              }
              expect($switch).to.have.css("display", "block");
              expect($switch).to.have.css("width");
              expect(parseFloat($switch.css("width")))
                .to.be.lte(70)
                .and.to.be.gte(40);
              expect($switch).to.have.css("height");
              expect(parseFloat($switch.css("height")))
                .to.be.lte(45)
                .and.to.be.gte(30);

              return cy.wrap($switch);
            })
            .children()
            .then((children) => {
              cy.wrap(children)
                .eq(0)
                .then((input) => {
                  expect(input).to.have.prop("type", "checkbox");
                  expect(input).to.have.prop("checked", true);
                  expect(input).to.have.css("position", "absolute");
                  expect(input).to.have.css("top", "0px");
                  expect(input).to.have.css("left", "0px");
                  expect(input).to.have.css("right", "0px");
                  expect(input).to.have.css("bottom", "0px");
                  expect(input).to.have.css("opacity", "0");
                });

              cy.wrap(children)
                .eq(1)
                .then((span) => {
                  expect(span).to.have.css("position", "absolute");
                  expect(span).to.have.css("top", "0px");
                  expect(span).to.have.css("left", "0px");
                  expect(span).to.have.css("right", "0px");
                  expect(span).to.have.css("bottom", "0px");
                  expect(span).to.have.css(
                    "background-color",
                    "rgb(164, 255, 182)"
                  );
                  expect(span).to.have.css("border-radius", "10px");
                  expect(span).to.have.css("transition").to.not.eq("none");
                  expect(span).to.have.css("cursor", "pointer");
                });
            });
        });

        const getThemeSlider = () => {
          return layoutComp.getThemeSwitch().children().last();
        };

        it("The Switch correctly renders styling changes on hover", () => {
          cy.wait(500);
          getThemeSlider()
            .then((slider) => {
              expect(slider).to.have.css(
                "background-color",
                "rgb(164, 255, 182)"
              );

              const win = slider[0].ownerDocument.defaultView;
              const after = win!.getComputedStyle(slider[0], "after");
              const textShadow = after.getPropertyValue("text-shadow");

              expect(textShadow).to.eq("none");
            })
            .realHover({ position: "center", scrollBehavior: "center" })
            .wait(1500)
            .then((slider) => {
              expect(slider).to.have.css(
                "background-color",
                "rgb(111, 255, 118)"
              );

              const win = slider[0].ownerDocument.defaultView;
              const after = win!.getComputedStyle(slider[0], "after");
              const textShadow = after.getPropertyValue("text-shadow");

              expect(textShadow).to.not.eq("none");
            });
        });

        it("The Switch correctly renders styling changes on click", () => {
          cy.get("body")
            .first()
            .realHover({ position: "center", scrollBehavior: "center" })
            .wait(1000);

          let content: any = null;
          getThemeSlider()
            .then((slider) => {
              expect(slider).to.have.css(
                "background-color",
                "rgb(164, 255, 182)"
              );

              const win = slider[0].ownerDocument.defaultView;
              const after = win!.getComputedStyle(slider[0], "after");

              expect(after.getPropertyValue("background-color")).to.eq(
                "rgb(12, 43, 33)"
              );
              content = after.getPropertyValue("content");
            })
            .realClick({ position: "center", scrollBehavior: "center" })
            .wait(1500);

          cy.get("body")
            .first()
            .realHover({ position: "center", scrollBehavior: "center" })
            .wait(2000);

          getThemeSlider()
            .then((slider) => {
              expect(slider).to.have.css(
                "background-color",
                "rgb(33, 51, 132)"
              );

              const win = slider[0].ownerDocument.defaultView;
              const after = win!.getComputedStyle(slider[0], "after");

              expect(after.getPropertyValue("background-color")).to.eq(
                "rgb(2, 198, 201)"
              );
              expect(after.getPropertyValue("content")).to.not.eq(content);
            })
            // Reset the theme
            .realClick({ position: "center", scrollBehavior: "center" })
            .wait(2500);
        });
      });

      describe(`The Navbar Menu toggle renders correctly at Viewport: ${viewString}`, () => {
        let width: number;

        // NavBar Toggle
        it("The Toggle is rendering the correct layout", () => {
          getWindowInnerWidth().then((w) => (width = w));
          layoutComp
            .getNavbarToggle()
            .then((toggle) => {
              expect(toggle).to.have.attr("id", "navbarToggle");
            })
            .children()
            .should("have.length", 3)
            .each(($el) => {
              expect($el).to.have.prop("tagName", "SPAN");
            });
        });

        it("The Toggle is rendering the correct styling", () => {
          cy.log(`${width}px`);
          if (width > 600) {
            layoutComp.getNavbarToggle().should("have.css", "display", "none");
          } else {
            layoutComp
              .getNavbarToggle()
              .then((toggle) => {
                expect(toggle).to.have.css("display", "block");
                expect(toggle).to.have.css("position", "absolute");
                expect(toggle).to.have.css("top", "15px");
                expect(toggle).to.have.css("right");
                expect(toggle).to.have.css(
                  "background-color",
                  "rgba(0, 0, 0, 0)"
                );
                expect(toggle).to.have.css("border-color", "rgba(0, 0, 0, 0)");

                return cy.wrap(toggle);
              })
              .children()
              .each(($el, idx) => {
                expect($el).to.have.css("position", "static");
                expect($el).to.have.css("display", "block");
                expect($el).to.have.css("left", "0px");
                expect($el).to.have.css("margin-top", "5px");
                expect($el).to.have.css("margin-bottom", "5px");
                expect($el).to.have.css("height");
                expect($el).to.have.css("width", "27px");
                expect($el).to.have.css(
                  "transform",
                  "matrix(1, 0, 0, 1, 0, 0)"
                );
                expect($el).to.have.css(
                  "background-color",
                  "rgb(164, 255, 182)"
                );
                expect($el).to.have.css("opacity", "1");

                if (idx === 0 || idx === 2) {
                  expect($el).to.have.css("transition").to.include("transform");
                } else {
                  expect($el).to.have.css("transition").to.eq("all 0s ease 0s");
                }
              });
          }
        });

        it("The Toggle correctly renders styling changes on click", () => {
          cy.log(`${width}px`);
          if (width > 600) {
            layoutComp.getNavbarToggle().should("have.css", "display", "none");
          } else {
            layoutComp
              .getNavbarToggle()
              .children()
              .each(($el) => {
                expect($el).to.have.css("position", "static");
                expect($el).to.have.css("left", "0px");
                expect($el).to.have.css(
                  "transform",
                  "matrix(1, 0, 0, 1, 0, 0)"
                );
              });

            layoutComp
              .getNavbarToggle()
              .realClick({ position: "center", scrollBehavior: "center" })
              .wait(1500)
              .children()
              .each(($el, idx) => {
                if (idx === 0 || idx === 2) {
                  expect($el).to.have.css("position", "absolute");
                  expect($el).to.have.css("top", "10px");
                  expect($el).to.have.css("left", "12px");
                  expect($el)
                    .to.have.css("transform")
                    .to.not.eq("matrix(1, 0, 0, 1, 0, 0)");
                } else {
                  expect($el).to.have.css(
                    "background-color",
                    "rgba(0, 0, 0, 0)"
                  );
                  expect($el).to.have.css("visibility", "hidden");
                }
              });

            layoutComp
              .getNavbarToggle()
              .realClick({ position: "center", scrollBehavior: "center" })
              .wait(2000);
          }
        });

        it("The Toggle functionally expands the Navbar", () => {
          cy.log(`${width}px`);
          if (width > 600) {
            layoutComp.getNavbarToggle().should("have.css", "display", "none");
          } else {
            layoutComp.getNavbarCollapse().should("not.be.visible");

            layoutComp
              .getNavbarToggle()
              .realClick({ position: "center", scrollBehavior: "center" })
              .wait(1500);

            layoutComp.getNavbarCollapse().should("be.visible");

            layoutComp
              .getNavbarToggle()
              .realClick({ position: "center", scrollBehavior: "center" })
              .wait(2000);
          }
        });
      });
    });
    //! ======================  Footer  =========================
    // context(
    //   `Footer component renders correctly on Page: ${urlString} at Viewport: ${viewString}`,
    //   () => {
    //     before(() => {
    //       setupPageWithTheme(url, "dark");
    //       cy.wait(200);
    //     });
    //     beforeEach(() => {
    //       viewPortSetup(viewport);
    //       cy.wait(200);
    //     });

    //     describe(`The footer renders correctly on Page: ${urlString} at Viewport: ${viewString}`, () => {
    //       it("The Footer is rendering with the correct layout", () => {
    //         layoutComp
    //           .footer()
    //           .should("be.visible")
    //           .children()
    //           .should("have.length", 1)
    //           .first()
    //           .then(($footer: JQuery<HTMLElement>) => {
    //             if (urlString === "Home") {
    //               cy.wrap($footer).children().should("have.length", 2);
    //             } else {
    //               cy.wrap($footer).children().should("have.length", 3);
    //             }
    //           });
    //       });

    //       it("The Footer is rendering the correct text", () => {
    //         let textItems = layoutComp
    //           .footer()
    //           .children()
    //           .should("have.length", 1)
    //           .first()
    //           .children("div");

    //         textItems.then((texts: JQuery<HTMLElement>) => {
    //           cy.wrap(texts)
    //             .first()
    //             .invoke("text")
    //             .should("match", /.*Designed and Developed by.*/);

    //           cy.wrap(texts)
    //             .last()
    //             .invoke("text")
    //             .should("match", /.*Copyright.*/);
    //         });
    //       });

    //       it("The Footer Nav is correctly rendering the navigation links", () => {
    //         if (urlString === "Home") {
    //           layoutComp
    //             .footer()
    //             .children()
    //             .first()
    //             .should("be.visible")
    //             .children()
    //             .should("have.length", 2);
    //         } else {
    //           layoutComp
    //             .footer()
    //             .children()
    //             .first()
    //             .should("be.visible")
    //             .children()
    //             .should("have.length", 3)
    //             .last()
    //             .should("be.visible")
    //             .find("ul")
    //             .first()
    //             .should("be.visible")
    //             .children("li")
    //             .should("have.length", 4);
    //         }
    //       });

    //       it("The Footer Nav List have the correct stylings", () => {
    //         if (urlString !== "Home") {
    //           layoutComp
    //             .footer()
    //             .children()
    //             .first()
    //             .children("nav")
    //             .first()
    //             .should("have.attr", "aria-label", "Personal Social Links")
    //             .children("ul")
    //             .first()
    //             .should("have.css", "display", "flex")
    //             .and("have.css", "justify-content", "center")
    //             .and("have.css", "justify-content", "center")
    //             .then(($ul: Cypress.Chainable<JQuery<HTMLElement>>) => {
    //               expect($ul).to.have.css("margin-top");
    //               expect($ul).to.have.css("padding");
    //             });
    //         }
    //       });

    //       it("Each of the Footer Links has the correct layout", () => {
    //         if (urlString !== "Home") {
    //           let linkItems: Cypress.Chainable<JQuery<HTMLElement>> = layoutComp
    //             .footer()
    //             .children()
    //             .first()
    //             .children("nav")
    //             .first()
    //             .children("ul")
    //             .first()
    //             .children("li");

    //           linkItems.each(($item, idx) => {
    //             layoutComp.testFooterItemLayout(cy.wrap($item), idx);
    //           });
    //         }
    //       });

    //       it("Each of the Footer Links render the correct CSS", () => {
    //         if (urlString !== "Home") {
    //           let linkItems: Cypress.Chainable<JQuery<HTMLElement>> = layoutComp
    //             .footer()
    //             .children()
    //             .first()
    //             .children("nav")
    //             .first()
    //             .children("ul")
    //             .first()
    //             .children("li");

    //           linkItems.each(($item) => {
    //             layoutComp.testFooterItemStyle(cy.wrap($item));
    //           });
    //         }
    //       });
    //     });
    //   }
    // );

    //! ======================  Flip Card  =========================
    // context(
    //   `Flip Card components render correctly on Page: ${urlString} at Viewport: ${viewString}`,
    //   () => {
    //     before(() => {
    //       setupPageWithTheme(url, "dark");
    //       cy.wait(200);
    //     });
    //     beforeEach(() => {
    //       viewPortSetup(viewport);
    //       cy.wait(200);
    //     });
    //   }
    // );

    //! ======================  Extras  =========================
    // context(
    //   `Addition layout extra components render correctly on Page: ${urlString} at Viewport: ${viewString}`,
    //   () => {
    //     before(() => {
    //       setupPageWithTheme(url, "dark");
    //       cy.wait(200);
    //     });
    //     beforeEach(() => {
    //       viewPortSetup(viewport);
    //       cy.wait(200);
    //     });
    //   }
    // );

    if (!Cypress.env("FULL_SPECTRUM")) {
      break;
    }
  }
  if (!Cypress.env("FULL_SPECTRUM")) {
    break;
  }
}
