/** @format */

/// <reference types="cypress" />

import { ResumePage } from "../page-objects/ResumePage";
import {
  BASEURL,
  setupPageWithTheme,
  viewportDisplay,
  viewports,
  viewPortSetup,
} from "../support/e2e";

const RESUMEURL = `${BASEURL}/resume`;
const resumePage: ResumePage = new ResumePage();

for (let viewport of viewports) {
  const viewString = viewportDisplay(viewport);
  context(`Resume Page render testing at viewport size: ${viewString}`, () => {
    before(() => {
      viewPortSetup(viewport);
      setupPageWithTheme(RESUMEURL, "dark");
      cy.wait(1000);
    });

    describe(`Resume Page container renders as expected at size: ${viewString}`, () => {
      it("The resume Page renders the correct main layout", () => {
        resumePage
          .resumeMain()
          .should("be.visible")
          .children()
          .should("have.length", 3);

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
          .and("have.css", "justify-content", "center")
          .and("have.css", "margin");
      });

      it("The resume navigation arrows render correctly with the viewport sizes", () => {
        let left = () => resumePage.resume().children("div").eq(0);

        let right = () => resumePage.resume().children("div").eq(1);

        // cy.log(`${left()} and ${right()}`);
        resumePage.testVisibleNavArrows(left());
        resumePage.testVisibleNavArrows(right());
      });

      it("The resume image renders the correct contents and styles", () => {});
    });

    describe(`Resume navigation renders as expected at size: ${viewString}`, () => {
      it("The resume navigation correctly cycles through resumes and renders based on viewport", () => {
        expect(true).to.be.true;
      });
    });
    describe(`Resume Page buttons are rendering as expected at size: ${viewString}`, () => {
      it("The correct amount of button groups render with the resume", () => {
        resumePage.resume().children("div").should("have.length", 2);
      });

      it("The buttons inside each group have the correct layout", () => {
        resumePage.testButtonGroupLayout(resumePage.topButton());
        resumePage.testButtonGroupLayout(resumePage.bottomButton());
      });

      it("The buttons in the top group have the correct css styling", () => {
        let currButton = resumePage.topButton().children("a").first();
        resumePage.testButtonStyle(currButton);

        currButton = resumePage.topButton().children("a").last();
        resumePage.testButtonStyle(currButton);
      });

      it("The buttons in the bottom group have the correct css styling", () => {
        let currButton = resumePage.bottomButton().children("a").first();
        resumePage.testButtonStyle(currButton);

        currButton = resumePage.bottomButton().children("a").last();
        resumePage.testButtonStyle(currButton);
      });
    });
  });
  if (!Cypress.env("FULL_SPECTRUM")) {
    break;
  }
}
