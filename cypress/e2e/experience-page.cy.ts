/** @format */

/// <reference types="cypress" />

import {
  BASEURL,
  setupPageWithTheme,
  viewPortSetup,
  viewports,
} from "../support/e2e";
import { ExperiencePage } from "../page-objects/ExperiencePage";

const EXPURL = BASEURL + "/experience";
const expPage = new ExperiencePage();

let viewport = viewports[0];
// viewports.forEach(viewport => {
context("Experience Page is rendering correctly", () => {
  before(() => {
    viewPortSetup(viewport);
    setupPageWithTheme(EXPURL, "dark");
  });
  beforeEach(() => {
    expPage.toggleExperienceSections(0);
  });

  describe("Experience Page rendering", () => {
    it("Page layout is rendering correctly", () => {
      expPage
        .pageContainer()
        .should("be.visible")
        .children()
        .should("have.length", 2)
        .then(($children) => {
          expect($children.eq(0)).to.be.visible;
          expect($children.eq(0)).to.have.id("experienceToggle");

          expect($children.eq(1)).to.be.visible;
          expect($children.eq(1)).to.have.id("educationContainer");
        });
    });

    it("Page container styling is correct", () => {
      expPage
        .pageContainer()
        .should("be.visible")
        .then(($main) => {
          expect($main).to.have.css("margin");
          expect($main).to.have.css("padding");
        });
    });

    it("Nav Buttons layout is correct", () => {
      expPage
        .experienceToggle()
        .should("be.visible")
        .children()
        .should("have.length", 2)
        .then(($children) => {
          expect($children.eq(0)).to.be.visible;
          expect($children.eq(0)).to.have.text("Education");

          expect($children.eq(1)).to.be.visible;
          expect($children.eq(1)).to.have.text("Work");
        });
    });

    it("Nav Buttons styling is correct", () => {
      expPage
        .experienceToggle()
        .should("be.visible")
        .children("button")
        .then(($children) => {
          for (let idx = 0; idx < $children.length; idx++) {
            // First button active styling
            expect($children.eq(idx)).to.have.css("display", "flex");
            expect($children.eq(idx)).to.have.css("justify-content", "center");
            expect($children.eq(idx)).to.have.css("padding");
            expect($children.eq(idx)).to.have.css("font-size");
            expect($children.eq(idx)).to.have.css("width");
            expect($children.eq(idx)).to.have.css("border-radius");
          }
        });
    });

    it("Page shifts sections correctly with the nav buttons", () => {
      expPage.educationContainer().should("be.visible");
      expPage.workContainer().should("not.exist");
      expPage
        .experienceToggle()
        .should("be.visible")
        .children()
        .then(($buttons) => {
          // First button active styling
          expect($buttons.eq(0))
            .to.have.css("color")
            .match(/rgb\(255, 0, 0\)/);
          expect($buttons.eq(0))
            .to.have.css("box-shadow")
            .match(/^(rgb\(247, 4, 4\)(\s-?\dpx){4}(,\s)?){4}/);
          expect($buttons.eq(0)).to.have.css("transform");

          // Second button not active styling
          expect($buttons.eq(1))
            .to.have.css("color")
            .match(/^rgb\(0,\s255,\s13\)/);
          expect($buttons.eq(1))
            .to.have.css("background-color")
            .match(/^rgb\(12,\s27,\s22\)/);
          expect($buttons.eq(1))
            .to.have.css("box-shadow")
            .match(
              /^(rgb\(6, 255, 19\)(\s-?\dpx){4},\s){2}rgb\(0, 0, 0\)(\s-?\dpx){4}/
            );
        });

      expPage.toggleExperienceSections(1);
      expPage.educationContainer().should("not.exist");
      expPage.workContainer().should("be.visible");

      expPage
        .experienceToggle()
        .should("be.visible")
        .children()
        .then(($buttons) => {
          // Toggle Experience

          // First button not active styling
          expect($buttons.eq(0))
            .to.have.css("color")
            .match(/^rgb\(0,\s+255,\s+13\)/);
          expect($buttons.eq(0))
            .to.have.css("background-color")
            .match(/^rgb\(12,\s*27,\s*22\)/);
          expect($buttons.eq(0))
            .to.have.css("box-shadow")
            .match(
              /^(rgb\(6, 255, 19\)(\s-?\dpx){4},\s){2}rgb\(0, 0, 0\)(\s-?\dpx){4}/
            );

          // Second button active styling
          expect($buttons.eq(1))
            .to.have.css("color")
            .match(/^rgb\(255, 0, 0\)/);
          expect($buttons.eq(1))
            .to.have.css("box-shadow")
            .match(/^(rgb\(247, 4, 4\)(\s-?\dpx){4}(,\s)?){4}/);
          expect($buttons.eq(1)).to.have.css("transform");
        });
    });
  });

  describe("Education experience rendering", () => {
    it("Education Layout is rendering correctly", () => {
      expPage
        .educationContainer()
        .should("be.visible")
        .children()
        .should("have.length", 3)
        .then(($children) => {
          expect($children.eq(0)).to.have.id("educationIntro");
          expect($children.eq(1)).to.have.id("degreeContainer");
          expect($children.eq(2)).to.have.id("certificationContainer");
        });
    });

    it("Section intro layout is correct", () => {
      expPage
        .educationInto()
        .should("be.visible")
        .children()
        .should("have.length", 3)
        .then(($children) => {
          expect($children.eq(0)).to.have.text(
            "Basic Qualifications and Certifications"
          );
          expect($children.eq(1)).to.be.visible;
          expect($children.eq(2)).to.include.text(
            "I actively participate in tech"
          );
        });
    });

    it("Section intro styling is correct", () => {
      expPage
        .educationInto()
        .should("be.visible")
        .within(($section) => {
          expect($section).to.have.css("display", "flex");
          expect($section).to.have.css("flex-direction", "column");
          expect($section).to.have.css("align-items", "center");

          cy.wrap($section)
            .children("h1")
            .first()
            .then(($title) => {
              expect($title).to.have.css("position", "relative");
              expect($title).to.have.css("width");
              expect($title).to.have.css("margin-top");
              expect($title).to.have.css("transform");
              expect($title).to.have.css("text-align", "center");
              expect($title).to.have.css("font-size");
              expect($title)
                .to.have.css("color")
                .match(/^rgb\(0, 255, 13\)/);
              expect($title)
                .to.have.css("text-shadow")
                .match(/^rgb\(6, 255, 19\)(\s-?\d+px){3}/);
            });

          cy.wrap($section)
            .children("p")
            .first()
            .then(($p) => {
              expect($p).to.have.css("position", "relative");
              expect($p).to.have.css("margin-top");
              expect($p).to.have.css("width");
              expect($p).to.have.css("text-align", "center");
              expect($p).to.have.css("font-size");
              expect($p)
                .to.have.css("color")
                .match(/^rgb\(206, 255, 208\)/);
            });
        });
    });

    it("Degree subsection layout is rendering correct", () => {
      expPage
        .degreeContainer()
        .should("be.visible")
        .children()
        .should("have.length", 2)
        .then(($children) => {
          expect($children.eq(0)).to.have.text("Degrees Recieved");
          expect($children.eq(1)).to.have.id("degreeList");
        });
    });

    it("Degree subsection styling is correct", () => {
      expPage
        .degreeContainer()
        .should("have.css", "display", "block")
        .then(($container) => {
          cy.wrap($container)
            .children("h2")
            .first()
            .should("be.visible")
            .then(($h2) => {
              expect($h2).to.have.css("margin");
              expect($h2).to.have.css("text-align", "center");
              expect($h2).to.have.css("font-size");
              expect($h2).to.have.css("color");
              expect($h2).to.have.css("text-shadow");
            });

          cy.wrap($container)
            .children("ul#degreeList")
            .first()
            .should("be.visible")
            .and("have.css", "all"); //!, "unset")
        });
    });

    it("Degree item layouts are rendering correct", () => {
      expPage
        .degreeList()
        .should("be.visible")
        .children("li")
        .should("have.length.greaterThan", 1)
        .then((children) => {
          const len = children.length;
          const oddEven = Math.ceil(Math.random() * 100) % 2;

          for (let i = 0; i < len; i++) {
            if (i % 2 === oddEven) {
              cy.wrap(children)
                .eq(i)
                .should("be.visible")
                .then(($li) => {
                  cy.wrap($li)
                    .children("a")
                    .should("have.length", 1)
                    .first()
                    .should("be.visible")
                    .then(($a) => {
                      expect($a)
                        .to.have.attr("href")
                        .match(/^https?:\/\/.*/);
                    })
                    .children("img")
                    .should("have.length", 1)
                    .first()
                    .should("be.visible")
                    .then(($img) => {
                      expect($img)
                        .to.have.attr("src")
                        .match(/.*url=https.*imgs\.search\.brave\.com\.*/);
                      expect($img)
                        .to.have.attr("alt")
                        .match(/.* icon$/);
                    });
                });
            }
          }
        });
    });

    it("Degree items styling is correct", () => {
      expPage
        .degreeList()
        .should("be.visible")
        .children("li")
        .then((children) => {
          const len = children.length;
          const oddEven = Math.ceil(Math.random() * 100) % 2;

          for (let i = 0; i < len; i++) {
            if (i % 2 === oddEven) {
              cy.wrap(children)
                .eq(i)
                .should("be.visible")
                .then(($li) => {
                  expect($li).to.have.css("display", "flex");
                  expect($li).to.have.css("position", "relative");
                  expect($li).to.have.css("justify-content", "space-between");
                  expect($li).to.have.css("align-items", "center");
                  expect($li).to.have.css("padding");
                  expect($li).to.have.css("margin-bottom");

                  cy.wrap($li)
                    .children("a")
                    .first()
                    .should("be.visible")
                    .then(($a) => {
                      expect($a).to.have.css("cursor", "pointer");
                    })
                    .children("img")
                    .first()
                    .should("be.visible")
                    .then(($img) => {
                      expect($img).to.have.css("width");
                      expect($img).to.have.css("height");
                      expect($img).to.have.css("margin-right");
                      expect($img)
                        .to.have.css("border")
                        .match(/^(-?\d+(\.\d+)?px)\ssolid\srgb\(6, 255, 19\)/);
                      expect($img).to.have.css("border-radius");
                      expect($img)
                        .to.have.css("box-shadow")
                        .match(/^rgb\(6, 255, 19\)(\s-?\d+px){4}$/);
                    });
                });
            }
          }
        });
    });

    it("Certifications section layout is rendering correct", () => {
      expPage
        .certificateContainer()
        .should("be.visible")
        .children()
        .then((children) => {
          // Container Title
          cy.wrap(children)
            .eq(0)
            .should("be.visible")
            .and("have.prop", "tagName", "H2")
            .and("have.text", "Certifications Achieved");

          // Certifications Filter
          cy.wrap(children)
            .eq(1)
            .should("be.visible")
            .and("have.prop", "tagName", "NAV")
            .and("have.attr", "id", "certificationFilter");

          // Filter Subtitle
          cy.wrap(children)
            .eq(2)
            .should("be.visible")
            .and("have.prop", "tagName", "H3")
            .and("include.text", "certifications");

          // Certifactions List
          cy.wrap(children)
            .eq(3)
            .should("be.visible")
            .and("have.prop", "tagName", "UL")
            .and("have.attr", "id", "certificationList");
        });
    });

    it("Certifications section styling is correct", () => {
      expPage
        .certificateContainer()
        .should("be.visible")
        .then(($article) => {
          expect($article).to.have.css("display", "block");
        })
        .children()
        .then((children) => {
          // Container Title
          cy.wrap(children)
            .eq(0)
            .then(($h2) => {
              expect($h2).to.have.css("margin");
              expect($h2).to.have.css("text-align", "center");
              expect($h2).to.have.css("font-size");
              expect($h2)
                .to.have.css("color")
                .match(/^rgb\(0, 255, 13\)/);
              expect($h2)
                .to.have.css("text-shadow")
                .match(/^rgb\(6, 255, 19\)(\s\d+(\.\d+)?px){3}/);
            });
          // Filter SubTitle
          cy.wrap(children)
            .eq(2)
            .then(($h3) => {
              expect($h3).to.have.css("text-align", "center");
              expect($h3).to.have.css("font-size");
              expect($h3)
                .to.have.css("color")
                .match(/^rgb\(206, 255, 208\)/);
            });
        });
    });
    it("Certifications Filter layout is correct correct", () => {
      expPage
        .certificationFilter()
        .should("be.visible")
        .children("div")
        .should("have.length", 2)
        .then(($filters) => {
          cy.wrap($filters)
            .eq(0)
            .children()
            .then(($children) => {
              cy.wrap($children)
                .eq(0)
                .should("have.prop", "tagName", "H4")
                .and("have.attr", "id", "issuerSelectLabel");

              cy.wrap($children)
                .eq(1)
                .should("have.prop", "tagName", "SELECT")
                .and("have.attr", "id", "issuerSelect");
            });
          cy.wrap($filters)
            .eq(1)
            .children()
            .then(($children) => {
              cy.wrap($children)
                .eq(0)
                .should("have.prop", "tagName", "H4")
                .and("have.attr", "id", "techSelectLabel");

              cy.wrap($children)
                .eq(1)
                .should("have.prop", "tagName", "SELECT")
                .and("have.attr", "id", "techSelect");
            });
        });
    });

    it("Certifications Filter styling is correct correct", () => {
      expPage
        .certificationFilter()
        .then(($nav) => {
          expect($nav).to.have.css("display", "flex");
          expect($nav).to.have.css("position", "relative");
          expect($nav).to.have.css("top", "-20px");
          expect($nav).to.have.css("left");
          expect($nav).to.have.css("width");
          expect($nav).to.have.css("height", "100px");
          expect($nav).to.have.css("align-items", "center");
          expect($nav).to.have.css("justify-content", "space-around");
          expect($nav).to.have.css("transform");
        })
        .children("div")
        .should("have.length", 2)
        .then(($filters) => {
          for (let idx of [0, 1]) {
            cy.wrap($filters)
              .eq(idx)
              .then(($container) => {
                expect($container).to.have.css("display", "flex");
                expect($container).to.have.css("flex-direction", "column");
                expect($container).to.have.css("align-items", "center");
              })
              .children()
              .then(($children) => {
                cy.wrap($children)
                  .eq(0)
                  .then(($h4) => {
                    expect($h4).to.have.css("margin-bottom", "8px");
                    expect($h4).to.have.css("text-align", "center");
                    expect($h4).to.have.css("font-size");
                    expect($h4)
                      .to.have.css("color")
                      .match(/^rgb\(206, 255, 208\)$/);
                  });

                cy.wrap($children)
                  .eq(1)
                  .then(($select) => {
                    expect($select).to.have.css("padding-left", "10px");
                    expect($select).to.have.css("height", "50px");
                    expect($select).to.have.css("width");
                    expect($select).to.have.css("border-radius", "12px");
                    expect($select).to.have.css("font-size");
                    expect($select)
                      .to.have.css("color")
                      .match(/^rgba\(14, 215, 165, 0\.925\)$/);
                    expect($select)
                      .to.have.css("background-color")
                      .match(/^rgb\(24, 60, 24\)$/);
                  });
              });
          }
        });
    });

    it("Certifications filtering filters correctly", () => {
      const issuerFilter = () => {
        return expPage
          .certificationFilter()
          .children("div")
          .eq(0)
          .children("select")
          .first();
      };
      const techFilter = () => {
        return expPage
          .certificationFilter()
          .children("div")
          .eq(1)
          .children("select")
          .first();
      };

      // Both start at TOP certifications
      issuerFilter().should("have.prop", "selectedIndex", 1);
      techFilter().should("have.prop", "selectedIndex", 1);
      for (let i of [0, 1]) {
        // both Change to All when selected
        expPage.filterCertifications(i, 2);
        issuerFilter().should("have.prop", "selectedIndex", 2);
        techFilter().should("have.prop", "selectedIndex", 2);

        //! Tech specific option not yet implemented
        if (i === 0) {
          expPage.filterCertifications(i, 3);
          // The Opposite Changes to disable when specific option selected
          issuerFilter()
            .should("have.prop", "selectedIndex", i === 0 ? 3 : 0)
            .find("option:selected")
            .should(i === 0 ? "be.visible" : "be.disabled");

          techFilter()
            .should("have.prop", "selectedIndex", i === 0 ? 0 : 3)
            .find("option:selected")
            .should(i === 0 ? "be.disabled" : "be.visible");
        }
      }
      // Reset Certifications
      expPage.filterCertifications(0, 1);
    });

    it("Certifications filtering renders correctly", () => {
      // Starts with top 10
      expPage.certificationList().children().should("have.length", 10);

      // All Should be larger than 10 (gt 50)
      expPage.filterCertifications(0, 2);
      expPage
        .certificationList()
        .children()
        .should("have.lengthOf.greaterThan", 50);

      // Reset Certifications
      expPage.filterCertifications(0, 1);
    });

    it("Certifications list styling is correct correct", () => {
      expPage
        .certificationList()
        .should("be.visible")
        .then(($ul) => {
          expect($ul).to.have.css("display", "flex");
          expect($ul).to.have.css("flex-wrap", "wrap");
          expect($ul).to.have.css("justify-content", "space-evenly");
          expect($ul).to.have.css("align-items");
          expect($ul).to.have.css("padding");
          expect($ul).to.have.css("height");
          expect($ul).to.have.css("overflow", "scroll");
        });
    });

    it("Certification items layouts are rendering correct", () => {
      expPage
        .certificationList()
        .children()
        .then(($listitems) => {
          let oddEven = Math.ceil(Math.random() * 100) % 2;
          for (let i = 0; i < $listitems.length; i++) {
            if (i % 2 === oddEven) {
              cy.wrap($listitems)
                .eq(i)
                .should("be.visible")
                .then(($li) => {
                  cy.wrap($li)
                    .children()
                    .should("have.length", 1)
                    .first()
                    .should("have.prop", "tagName", "DIV")
                    .children()
                    .should("have.length", 3)
                    .then(($items) => {
                      // Issuer Logo
                      cy.wrap($items)
                        .eq(0)
                        .should("have.prop", "tagName", "IMG");
                      // Name
                      cy.wrap($items)
                        .eq(1)
                        .should("have.prop", "tagName", "H5");
                      // Issuer
                      cy.wrap($items).eq(2).should("have.prop", "tagName", "P");
                    });
                });
            }
          }
        });
    });

    it("Certification items styling is correct", () => {
      expPage
        .certificationList()
        .children()
        .then(($listitems) => {
          let oddEven = Math.ceil(Math.random() * 100) % 2;
          for (let i = 0; i < $listitems.length; i++) {
            if (i % 2 === oddEven) {
              cy.wrap($listitems)
                .eq(i)
                .then(($li) => {
                  // Item container style
                  expect($li).to.have.css("display", "flex");
                  expect($li).to.have.css("flex-direction", "column");
                  expect($li).to.have.css("justify-content", "space-between");
                  expect($li).to.have.css("text-align", "center");
                  expect($li).to.have.css("position", "relative");
                  expect($li).to.have.css("width");
                  expect($li).to.have.css("height");
                  expect($li).to.have.css("margin");
                  expect($li).to.have.css("padding");
                  expect($li)
                    .to.have.css("color")
                    .match(/^rgb\(206, 255, 208\)$/);
                  expect($li)
                    .to.have.css("background-color")
                    .match(/^rgb\(25, 25, 25\)$/);
                  expect($li).to.have.css("border-radius", "20px");
                  expect($li)
                    .to.have.css("box-shadow")
                    .match(/^rgb\(6, 255, 19\)(\s\d+px){4}$/);

                  cy.wrap($li)
                    .children("div")
                    .first()
                    // Display container style
                    .then(($div) => {
                      expect($div).to.have.css("height");
                      expect($div).to.have.css("padding");
                      expect($div).to.have.css("border-radius", "20px");
                      expect($div)
                        .to.have.css("background-color")
                        .match(/^rgb\(60, 60, 60\)$/);
                    })
                    .children()
                    .then(($items) => {
                      // Logo style
                      cy.wrap($items)
                        .eq(0)
                        .then(($img) => {
                          expect($img).to.have.css("margin");
                          expect($img).to.have.css("width");
                          expect($img).to.have.css("height");
                          expect($img).to.have.css("border-radius");
                        });

                      // Title style
                      cy.wrap($items)
                        .eq(1)
                        .then(($h5) => {
                          expect($h5).to.have.css("font-size");
                        });

                      // Issuer name style
                      cy.wrap($items)
                        .eq(2)
                        .then(($p) => {
                          expect($p).to.have.css("font-size");
                        });
                    });
                });
            }
          }
        });
    });
  });

  // describe("Work experience rendering", () => {
  //   before(() => {
  //     expPage.experienceToggle().children("button").last().click();
  //   })
  //   it("Work Layout is rendering correctly", () => {
  //     expPage.workContainer().should("be.visible");
  //   });

  //   it("Section intro layout is correct", () => {
  //     expPage.workInto().should("be.visible");
  //   });

  //   it("Section intro styling is correct", () => {
  //     expPage.workInto().should("be.visible");
  //   });

  //   it("Work List layout is rendering correct", () => {
  //     expPage.workList().should("be.visible");
  //   });

  //   it("Work List styling is correct", () => {
  //     expPage.workList().should("be.visible");
  //   });

  //   it("Work item layouts are rendering correct", () => {
  //     expPage.workList().should("be.visible");
  //   });

  //   it("Work item styling is correct", () => {
  //     expPage.workList().should("be.visible");
  //   });

  //   it("Work filtering works correctly", () => {
  //     expPage.workToggle().should("be.visible");
  //   });
  // });
  // })
});
