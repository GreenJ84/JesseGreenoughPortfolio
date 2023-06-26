/** @format */

/// <reference types="cypress" />

import { ResumePage } from "../page-objects/ResumePage";
import {
  BASEURL,
  getWindowInnerWidth,
  setupPageWithTheme,
  viewportDisplay,
  viewports,
  viewPortSetup,
} from "../support/e2e";

const RESUMEURL = `${BASEURL}/resume`;
const resumePage: ResumePage = new ResumePage();

for (let viewport of viewports) {
  const viewString = viewportDisplay(viewport);
  context("Resume Page render testing", () => {
    before(() => {
      setupPageWithTheme(RESUMEURL, "dark");
      cy.wait(1000);
    });

    beforeEach(() => {
      viewPortSetup(viewport);
      cy.wait(1000);
    });

    describe(`Resume Page container renders as expected at size: ${viewString}`, () => {
      it("The resume Page renders the correct main layout", () => {
        resumePage
          .resumeMain()
          .should("be.visible")
          .children()
          .should("have.length", 3)
          .each(($child: JQuery<HTMLElement>) => {
            expect($child).to.have.prop("tagName", "SECTION");
          });

        resumePage.resumeMain().within(() => {
          resumePage.topButton().should("be.visible");
          resumePage.resume().should("be.visible");
          resumePage.bottomButton().should("be.visible");
        });
      });

      it("The resume Page renders the correct css styles", () => {
        resumePage.resumeMain().should("have.css", "padding");
      });
    });

    describe(`Resume holder renders as expected at size: ${viewString}`, () => {
      it("The layout of the resume section is correct", () => {
        resumePage
          .resume()
          .should("be.visible")
          .children()
          .should("have.length", 3);

        resumePage.resume().within(() => {
          cy.get("img").should("have.length", 1);

          cy.get("div").should("have.length", 2);
        });
      });

      it("The css styles of the resume section are correct", () => {
        resumePage
          .resume()
          .should("have.css", "position", "relative")
          .and("have.css", "display", "flex")
          .and("have.css", "justify-content", "space-around")
          .and("have.css", "align-items", "center")
          .and("have.css", "margin");
      });

      it("The resume image renders the correct contents and styles", () => {
        resumePage
          .resume()
          .children("img")
          .first()
          .then(($img: JQuery<HTMLElement>) => {
            expect($img).to.have.attr("id", "resumeImage");
            expect($img)
              .to.have.attr("src")
              .to.match(
                /public.*assets.*JesseGreenough\.React\.Resume_03\.png.*/
              );
            expect($img).to.have.attr("alt").to.include("My Resume");

            expect($img).to.have.css("width");
            expect(parseFloat($img.css("width"))).to.be.lte(1200);
            expect($img).to.have.css("border-radius", "15px");
            expect($img)
              .to.have.css("box-shadow")
              .match(/(rgb\(0, 0, 0\)(\s\d+px){4}(,\s)?)/);
            expect($img).to.have.css("z-index", "10");
            expect($img).to.have.css("transform");
          });
      });

      it("The resume image expands when clicked at large viewport", () => {
        getWindowInnerWidth().then((width) => {
          if (width >= 1400) {
            // resumePage
            //   .resume()
            //   .children("img")
            //   .first()
            //   .scrollIntoView()
            //   .realClick({ position: "center", clickCount: 2 })
            //   .wait(2000)
            //   .then(($img: JQuery<HTMLElement>) => {
            //     expect($img).to.have.css("z-index", "30");
            //   });
            // resumePage
            //   .resume()
            //   .children("img")
            //   .first()
            //   .realClick({ position: "center", clickCount: 3 })
            //   .wait(2000)
            //   .then(($img: JQuery<HTMLElement>) => {
            //     expect($img).to.have.css("z-index", "10");
            //   });
          } else {
            resumePage.resume().should("be.visible");
          }
        });
      });
    });

    describe(`Resume navigation renders as expected at size: ${viewString}`, () => {
      it("The resume navigation arrows render correctly with the viewport sizes", () => {
        let left = () => resumePage.resume().children("div").eq(0);
        let right = () => resumePage.resume().children("div").eq(1);
        // Test two active arrows by rotating once right
        right().realClick({ position: "center", scrollBehavior: "center" }).wait(400);

        resumePage.testVisibleNavArrows(left());
        resumePage.testVisibleNavArrows(right());
      });

      it("The resume navigation correctly applies hover functionality", () => {});

      it("The resume navigation correctly cycles through resumes and renders based on viewport", () => {});
    });

    describe(`Resume Page buttons are rendering as expected at size: ${viewString}`, () => {
      it("The buttons inside each group have the correct layout", () => {
        resumePage.testButtonGroupLayout(resumePage.topButton());
        resumePage.testButtonGroupLayout(resumePage.bottomButton());
      });

      it("The buttons in the top group have the correct css styling", () => {
        resumePage.testButtonStyle(
          resumePage.topButton().children("a").first()
        );

        resumePage.testButtonStyle(resumePage.topButton().children("a").last());
      });

      it("The buttons in the bottom group have the correct css styling", () => {
        resumePage.testButtonStyle(
          resumePage.bottomButton().children("a").first()
        );

        resumePage.testButtonStyle(
          resumePage.bottomButton().children("a").last()
        );
      });

      it("The buttons in the top group correctly apply hover functionality", () => {
        resumePage.testButtonHover(
          resumePage.topButton().children("a").first()
        );

        resumePage.testButtonHover(resumePage.topButton().children("a").last());
      });

      it("The buttons in the bottom group correctly apply hover functionality", () => {
        resumePage.testButtonHover(
          resumePage.bottomButton().children("a").first()
        );

        resumePage.testButtonHover(
          resumePage.bottomButton().children("a").last()
        );
      });
    });
  });

  if (!Cypress.env("FULL_SPECTRUM")) {
    break;
  }
}
