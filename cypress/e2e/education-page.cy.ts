/** @format */

/// <reference types="cypress" />

import {
  BASEURL,
  getOddEven,
  setupPageWithTheme,
  viewPortSetup,
  viewports,
} from "../support/e2e";
import { viewportDisplay } from "../support/e2e";
import { EducationPage } from "../page-objects/EducationPage";

const EDUURL = BASEURL + "/experience/education";
const eduPage = new EducationPage();

for (let viewport of viewports) {
  context("Education Page render Testing", () => {
    before(() => {
      setupPageWithTheme(EDUURL, "dark");
      cy.wait(1000);
    });

    beforeEach(() => {
      viewPortSetup(viewport);
      cy.wait(1000);
    });

    // describe(`Education Page container rendering at Viewport: ${viewportDisplay(
    //   viewport
    // )}`, () => {
    //   it("The Page is rendering the correct layout", () => {
    //     eduPage
    //       .pageContainer()
    //       .should("be.visible")
    //       .children()
    //       .should("have.length", 4)
    //       .then(($children) => {
    //         expect($children.eq(0)).to.be.visible;
    //         expect($children.eq(0)).to.have.prop("tagName", "P");

    //         expect($children.eq(1)).to.be.visible;
    //         expect($children.eq(1)).to.have.prop("tagName", "H1");
    //         expect($children.eq(1)).to.have.id("educationTitle");

    //         expect($children.eq(2)).to.be.visible;
    //         expect($children.eq(2)).to.have.prop("tagName", "SECTION");
    //         expect($children.eq(2)).to.have.id("degreeContainer");

    //         expect($children.eq(3)).to.be.visible;
    //         expect($children.eq(3)).to.have.prop("tagName", "SECTION");
    //         expect($children.eq(3)).to.have.id("certificationContainer");
    //       });
    //   });

    //   it("The Page container is rendering the correct styling", () => {
    //     eduPage
    //       .pageContainer()
    //       .should("be.visible")
    //       .then(($main) => {
    //         expect($main).to.have.css("margin");
    //         expect($main).to.have.css("padding");
    //       });
    //   });

    //   it("Intro is rendering the correct text", () => {
    //     eduPage
    //       .pageContainer()
    //       .children()
    //       .then(($children) => {
    //         expect($children.eq(0))
    //           .to.include.text("participate in tech-related activities")
    //           .and.to.include.text("further my understanding and knowledge");

    //         expect($children.eq(1)).to.have.text(
    //           "Educational Experience, Qualifications and Certifications"
    //         );
    //       });
    //   });

    //   it("Intro is rendering the correct styling", () => {
    //     eduPage.pageContainer().within(($section) => {
    //       cy.wrap($section)
    //         .children("p")
    //         .first()
    //         .then(($p) => {
    //           expect($p).to.have.css("position", "relative");
    //           expect($p).to.have.css("margin");
    //           expect($p).to.have.css("width");
    //           expect(parseFloat($p.css("width"))).to.be.lte(900);
    //           expect($p).to.have.css("text-align", "center");
    //           expect($p).to.have.css("font-size");
    //           expect(parseFloat($p.css("font-size")))
    //             .to.be.lte(52)
    //             .and.to.be.gte(16);
    //           expect($p).to.have.css("color", "rgb(230, 255, 243)");
    //         });

    //       cy.wrap($section)
    //         .children("h1")
    //         .first()
    //         .then(($title) => {
    //           expect($title).to.have.css("position", "relative");
    //           expect($title).to.have.css("width");
    //           expect($title).to.have.css("margin");
    //           expect($title).to.have.css("text-align", "center");
    //           expect($title).to.have.css("font-size");
    //           expect($title).to.have.css("color", "rgb(164, 255, 182)");
    //           expect($title)
    //             .to.have.css("text-shadow")
    //             .match(/^rgb\(14, 215, 165\)(\s\d+px){3}/);
    //           expect($title).to.have.css("transform");
    //         });
    //     });
    //   });
    // });

    // describe(`Degree section rendering at Viewport: ${viewportDisplay(
    //   viewport
    // )}`, () => {
    //   it("Degree section is rendering the correct layout", () => {
    //     eduPage.degreeContainer().within(($section) => {
    //       cy.wrap($section)
    //         .children()
    //         .should("have.length", 3)
    //         .then(($children) => {
    //           cy.wrap($children)
    //             .eq(0)
    //             .should("be.visible")
    //             .and("have.prop", "tagName", "H2");
    //           cy.wrap($children)
    //             .eq(1)
    //             .should("be.visible")
    //             .and("have.prop", "tagName", "svg");
    //           cy.wrap($children)
    //             .eq(2)
    //             .should("be.visible")
    //             .and("have.prop", "tagName", "UL");
    //         });
    //     });
    //   });

    //   it("Degree container is rendering the correct styling", () => {
    //     eduPage.degreeContainer().within(($section) => {
    //       cy.wrap($section)
    //         .children()
    //         .eq(0)
    //         .scrollIntoView()
    //         .then(($h2) => {
    //           expect($h2).to.have.css("position", "relative");
    //           expect($h2).to.have.css("margin");
    //           expect($h2).to.have.css("width");
    //           expect($h2).to.have.css("text-align", "center");
    //           expect($h2).to.have.css("font-size");
    //           expect(parseFloat($h2.css("font-size")))
    //             .to.be.lte(60)
    //             .and.to.be.gte(26);
    //           expect($h2).to.have.css("color", "rgb(164, 255, 182)");
    //           expect($h2)
    //             .to.have.css("text-shadow")
    //             .match(/^rgb\(164, 255, 182\)(\s\d+px){3}/);
    //           expect($h2).to.have.css("opacity", "1");
    //         });

    //       cy.wrap($section)
    //         .children()
    //         .eq(1)
    //         .then(($img) => {
    //           expect($img).to.have.css("position", "relative");
    //           expect($img).to.have.css("margin");
    //           expect($img).to.have.css("width");
    //           expect(parseFloat($img.css("width")))
    //             .to.be.lte(900)
    //             .and.to.be.gte(250);
    //           expect($img).to.have.css("height");
    //           expect($img).to.have.css("animation");
    //         });
    //     });
    //   });

    //   it("Degree items are rendering the correct layouts", () => {
    //     eduPage
    //       .degreeList()
    //       .children("li")
    //       // Test Each Degree item layout
    //       .each(($degree: JQuery<HTMLLIElement>, _) => {
    //         cy.wrap($degree)
    //           .should("be.visible")
    //           .and("have.prop", "tagName", "LI")
    //           .children()
    //           .should("have.length", 2)
    //           .then(($children) => {
    //             cy.wrap($children)
    //               .eq(0)
    //               .should("be.visible")
    //               .and("have.prop", "tagName", "A");

    //             cy.wrap($children)
    //               .eq(1)
    //               .should("be.visible")
    //               .and("have.prop", "tagName", "DIV");
    //           });
    //       });
    //   });

    //   it("Degree item containers are rendering the correct styling", () => {
    //     eduPage
    //       .degreeList()
    //       .children("li")
    //       // Test Each Degree item styling
    //       .each(($degree: JQuery<HTMLLIElement>, _) => {
    //         expect($degree).to.have.css("position", "relative");
    //         expect($degree).to.have.css("display", "flex");
    //         expect($degree).to.have.css("align-items", "center");
    //         expect($degree).to.have.css("justify-content", "space-evenly");
    //         expect($degree).to.have.css("padding");
    //         expect($degree).to.have.css("margin-bottom");
    //       });
    //   });

    //   it("Degree Images are rendering the correct styling", () => {
    //     eduPage
    //       .degreeList()
    //       .children("li")
    //       // Get Each Degree item
    //       .each(($degree: JQuery<HTMLLIElement>, _) => {
    //         // Get the degree Image
    //         cy.wrap($degree)
    //           .getDegreeImg()
    //           .then(($img) => {
    //             // Test the degree Image
    //             expect($img).to.have.css("margin-right", "10px");
    //             expect($img).to.have.css("width");
    //             expect($img).to.have.css("height");
    //             expect($img).to.have.css("border");
    //             expect($img).to.have.css("border-radius");
    //             expect($img).to.have.css("box-shadow");
    //           });
    //       });
    //   });

    //   it("Degree cards are rendering the correct layouts", () => {
    //     eduPage
    //       .degreeList()
    //       .children("li")
    //       // Get Each Degree item
    //       .each(($degree: JQuery<HTMLLIElement>, _) => {
    //         // Get the degree Card
    //         cy.wrap($degree)
    //           .getDegreeCard()
    //           .should("be.visible")
    //           .children()
    //           .should("have.length", 3)
    //           .then(($children) => {
    //             // Test the correct position and tags of each child element
    //             cy.wrap($children)
    //               .eq(0)
    //               .should("have.prop", "tagName", "DIV")
    //               .children()
    //               .should("have.length", 3)
    //               .then(($headChildren) => {
    //                 cy.wrap($headChildren)
    //                   .eq(0)
    //                   .should("have.prop", "tagName", "H3");

    //                 cy.wrap($headChildren)
    //                   .eq(1)
    //                   .should("have.prop", "tagName", "P");

    //                 cy.wrap($headChildren)
    //                   .eq(2)
    //                   .should("have.prop", "tagName", "P");
    //               });

    //             cy.wrap($children)
    //               .eq(1)
    //               .should("have.prop", "tagName", "DIV")
    //               .children()
    //               .should("have.length", 1)
    //               .first()
    //               .should("have.prop", "tagName", "UL");

    //             cy.wrap($children)
    //               .eq(2)
    //               .should("have.prop", "tagName", "A")
    //               .and("include.text", "Visit Site");
    //           });
    //       });
    //   });

    //   it("Degree card containers and heads are rendering the correct styling", () => {
    //     eduPage
    //       .degreeList()
    //       .children("li")
    //       // Get Each Degree item
    //       .each(($degree: JQuery<HTMLLIElement>, _) => {
    //         // Get the degree Card
    //         cy.wrap($degree)
    //           .getDegreeCard()
    //           .should("be.visible")
    //           .then(($cardContainer) => {
    //             // Test container styling
    //             expect($cardContainer).to.have.css("position", "relative");
    //             expect($cardContainer).to.have.css("width");
    //             expect(parseFloat($cardContainer.css("width")))
    //               .to.be.lte(800)
    //               .and.to.be.gte(240);
    //             expect($cardContainer).to.have.css("height");
    //             expect(parseFloat($cardContainer.css("height")))
    //               .to.be.lte(600)
    //               .and.to.be.gte(260);
    //             expect($cardContainer).to.have.css(
    //               "background-color",
    //               "rgb(18, 15, 15)"
    //             );
    //             expect($cardContainer).to.have.css("border-radius", "30px");
    //             expect($cardContainer).to.have.css("box-shadow");

    //             return cy.wrap($cardContainer);
    //           })
    //           .children()
    //           .first()
    //           .then(($head) => {
    //             // Test head container styling
    //             expect($head).to.have.css("height");
    //             expect($head).to.have.css("padding");
    //             expect($head).to.have.css("color", "rgb(164, 255, 182)");
    //             expect($head).to.have.css(
    //               "background-color",
    //               "rgb(85, 84, 84)"
    //             );
    //             expect($head).to.have.css("border-radius");
    //             expect($head).to.have.css("box-shadow");

    //             // Test head title styling
    //             cy.wrap($head)
    //               .children()
    //               .eq(0)
    //               .then(($headTitle) => {
    //                 expect($headTitle).to.have.css("margin");
    //                 expect($headTitle).to.have.css("text-align", "center");
    //                 expect($headTitle).to.have.css("font-size");
    //                 expect(parseFloat($headTitle.css("font-size")))
    //                   .to.be.lte(40)
    //                   .and.to.be.gte(20);
    //                 expect($headTitle).to.have.css("text-shadow");
    //               });

    //             // Test head date styling
    //             cy.wrap($head)
    //               .children()
    //               .eq(1)
    //               .then(($headDate) => {
    //                 expect($headDate).to.have.css("margin");
    //                 expect($headDate).to.have.css("text-align", "center");
    //                 expect($headDate).to.have.css("font-size");
    //                 expect(parseFloat($headDate.css("font-size")))
    //                   .to.be.lte(28)
    //                   .and.to.be.gte(10);
    //                 expect($headDate).to.have.css("letter-spacing");
    //               });

    //             // Test head description styling
    //             cy.wrap($head)
    //               .children()
    //               .eq(2)
    //               .then(($headDescription) => {
    //                 expect($headDescription).to.have.css(
    //                   "position",
    //                   "relative"
    //                 );
    //                 expect($headDescription).to.have.css("left");
    //                 expect($headDescription).to.have.css("margin");
    //                 expect($headDescription).to.have.css("font-size");
    //                 expect(parseFloat($headDescription.css("font-size")))
    //                   .to.be.lte(32)
    //                   .and.to.be.gte(12);
    //                 expect($headDescription).to.have.css("letter-spacing");
    //               });
    //           });
    //       });
    //   });

    //   it("Degree card bodies are rendering the correct styling", () => {
    //     eduPage
    //       .degreeList()
    //       .children("li")
    //       // Get Each Degree item
    //       .each(($degree: JQuery<HTMLLIElement>, _) => {
    //         // Get the degree Card
    //         cy.wrap($degree)
    //           .getDegreeCard()
    //           .children()
    //           .then(($children) => {
    //             // Get the body element
    //             cy.wrap($children)
    //               .eq(1)
    //               .then(($body) => {
    //                 // Test the body container styling
    //                 expect($body).to.have.css("position", "relative");
    //                 expect($body).to.have.css("display", "flex");
    //                 expect($body).to.have.css("flex-direction", "column");
    //                 expect($body).to.have.css("margin");
    //                 expect($body).to.have.css("width");
    //                 expect($body).to.have.css("height");
    //                 expect($body).to.have.css("padding");
    //                 expect($body).to.have.css("color", "rgb(230, 255, 243)");
    //                 expect($body).to.have.css(
    //                   "background-color",
    //                   "rgb(18, 15, 15)"
    //                 );
    //                 expect($body).to.have.css(
    //                   "border-radius",
    //                   "0px 0px 20px 20px"
    //                 );
    //                 expect($body).to.have.css("box-shadow");

    //                 // Get the details list
    //                 cy.wrap($body)
    //                   .children()
    //                   .first()
    //                   .then(($list) => {
    //                     // Test the list styling
    //                     expect($list).to.have.css("margin");
    //                     expect($list).to.have.css("width");
    //                     expect($list).to.have.css("height");
    //                     expect($list).to.have.css("padding");
    //                   })
    //                   .children()
    //                   // test each detail styling
    //                   .each(($detail, _) => {
    //                     expect($detail).to.have.css(
    //                       "list-style",
    //                       "outside none none"
    //                     );
    //                     expect($detail).to.have.css("padding");
    //                     expect($detail).to.have.css("text-indent", "10px");
    //                     expect($detail).to.have.css("font-size");
    //                     expect(parseFloat($detail.css("font-size")))
    //                       .to.be.lte(30)
    //                       .and.to.be.gte(12);
    //                     expect($detail).to.have.css("line-height");
    //                     expect(
    //                       parseFloat($detail.css("line-height"))
    //                     ).to.be.gte(12);
    //                   });
    //               });
    //           });
    //       });
    //   });

    //   it("Degree card links are rendering the correct styling", () => {
    //     eduPage
    //       .degreeList()
    //       .children()
    //       // Get Each Degree item
    //       .each(($degree, _) => {
    //         // Get the degree Card
    //         cy.wrap($degree)
    //           .getDegreeCard()
    //           .children()
    //           .then(($children) => {
    //             // Get the button element
    //             cy.wrap($children)
    //               .eq(2)
    //               .then(($button) => {
    //                 // Test the button styling
    //                 expect($button).to.have.css("position", "absolute");
    //                 expect($button).to.have.css("left");
    //                 expect($button).to.have.css("bottom");
    //                 expect($button).to.have.css("display", "flex");
    //                 expect($button).to.have.css("align-items", "center");
    //                 expect($button).to.have.css("justify-content", "center");
    //                 expect($button).to.have.css("width");
    //                 expect(parseFloat($button.css("width"))).to.be.gte(60);
    //                 expect($button).to.have.css("height");
    //                 expect(parseFloat($button.css("height"))).to.be.gte(20);
    //                 expect($button).to.have.css("font-size");
    //                 expect(parseFloat($button.css("font-size")))
    //                   .to.be.lte(24)
    //                   .and.to.be.gte(10);
    //                 expect($button).to.have.css("color", "rgb(164, 255, 182)");
    //                 expect($button).to.have.css(
    //                   "background-color",
    //                   "rgb(85, 84, 84)"
    //                 );
    //                 expect($button).to.have.css(
    //                   "border",
    //                   "1px solid rgb(164, 255, 182)"
    //                 );
    //                 expect($button).to.have.css("border-radius", "10px");
    //                 expect($button).to.have.css("box-shadow");
    //               });
    //           });
    //       });
    //   });

    //   it("Degree item hover effects function as expected", () => {
    //     eduPage
    //       .degreeList()
    //       .children()
    //       // Get Each Degree item
    //       .each(($degree, _) => {
    //         // Get the degree Image
    //         cy.wrap($degree)
    //           .getDegreeImg()
    //           .then(($image) => {
    //             // Expect / get normal css
    //             expect($image).to.have.css("transform", "none");
    //             const shadow = $image.css("box-shadow");
    //             // Hover image
    //             cy.wrap($image)
    //               .realHover({ position: "center", scrollBehavior: "center" })
    //               .wait(2000)
    //               .then(($img) => {
    //                 // Test hover styling changes styling
    //                 expect($img).to.have.css("transform").to.not.eq("none");
    //                 expect($img).to.have.css("box-shadow").to.not.eq(shadow);
    //               });
    //           });
    //         cy.wait(500);

    //         // Get the degree Card
    //         cy.wrap($degree)
    //           .getDegreeCard()
    //           .then(($card) => {
    //             // Get normal shadow css
    //             const shadow = $card.css("box-shadow");
    //             // Hover over the card
    //             cy.wrap($card)
    //               .realHover({ position: "center", scrollBehavior: "center" })
    //               .wait(2000)
    //               .then(($card) => {
    //                 // Test hover styling changes shadow
    //                 expect($card).to.have.css("box-shadow").to.not.eq(shadow);
    //               });
    //             cy.wait(500);

    //             // Get school link
    //             cy.wrap($card)
    //               .children()
    //               .eq(2)
    //               .then(($link) => {
    //                 // Expect / get normal css
    //                 expect($link).to.have.css("color", "rgb(164, 255, 182)");
    //                 expect($link).to.have.css(
    //                   "background-color",
    //                   "rgb(85, 84, 84)"
    //                 );
    //                 expect($link).to.have.css(
    //                   "border",
    //                   "1px solid rgb(164, 255, 182)"
    //                 );
    //                 const shadow = $link.css("box-shadow");

    //                 // Hover the school link
    //                 cy.wrap($link)
    //                   .realHover({
    //                     position: "center",
    //                     scrollBehavior: "center",
    //                   })
    //                   .wait(2000)
    //                   .then(($link) => {
    //                     // Test hover styling changes styling
    //                     expect($link).to.have.css("color", "rgb(0, 17, 1)");
    //                     expect($link).to.have.css(
    //                       "background-color",
    //                       "rgb(164, 255, 182)"
    //                     );
    //                     expect($link).to.have.css(
    //                       "border",
    //                       "1px solid rgb(0, 17, 1)"
    //                     );
    //                     expect($link)
    //                       .to.have.css("box-shadow")
    //                       .to.not.eq(shadow);
    //                   });
    //               });
    //           });
    //         cy.wait(1000);
    //       });
    //   });
    // });

    describe(`Certifications section rendering at Viewport: ${viewportDisplay(
      viewport
    )}`, () => {
      it("Certifications section is rendering the correct layout", () => {});

      it("Certifications section is rendering the correct styling", () => {});

      it("Certifications Filter items are rendering the correct layouts", () => {});

      it("Certification filter hover styling is rendering correctly", () => {});

      it("Certification filter values update as expected", () => {});

      it("Certifications filters correctly filter certifications", () => {});

      it("Certifications list styling is correct correct", () => {});

      it("Certification items layouts are rendering correct", () => {});

      it("Certification items styling is correct", () => {});

      it("Certification link hover styling renders as expected", () => {});
    });
  });
  if (!Cypress.env("FULL_SPECTRUM")) {
    break;
  }
}
