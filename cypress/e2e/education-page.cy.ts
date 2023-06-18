/** @format */

/// <reference types="cypress" />

import {
  BASEURL,
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

    describe(`Education Page container rendering at Viewport: ${viewportDisplay(
      viewport
    )}`, () => {
      it("The Page is rendering the correct layout", () => {
        
      });

      it("The Page container is rendering the correct styling", () => {
        
      });

      it("Intro is rendering the correct text", () => {
        
      });

      it("Intro is rendering the correct styling", () => {
        
      });
    });

    describe(`Degree section rendering at Viewport: ${viewportDisplay(
      viewport
    )}`, () => {
      it("Degree section is rendering the correct layout", () => {});

      it("Degree section is rendering the correct stlying", () => {});

      it("Degree items are rendering the correct layouts", () => {});

      it("Degree Images are rendering the correct styling", () => { });

      it("Degree cards are rendering the correct layouts", () => {});

      it("Degree cards are rendering the correct styling", () => { });
      
      it("Degree item hover effects functiona as expected", () => { })
    });

    describe(`Certifications section rendering at Viewport: ${viewportDisplay(
      viewport
    )}`, () => {
      it("Certifications section is rendering the correct layout", () => {});

      it("Certifications section is rendering the correct styling", () => {});

      it("Certifications Filter items are rendering the correct layouts", () => { });
      
      it("Certification filter hover styling is rendering correctly", () => { });
      
      it("Certification filter values update as expected", () => { });
      
      it("Certifications filters correctly filter certifications", () => {});

      it("Certifications list styling is correct correct", () => {});

      it("Certification items layouts are rendering correct", () => {});

      it("Certification items styling is correct", () => { });
      
      it("Certification link hover styling renders as expected", () => {});
    });

  });
  if (!Cypress.env("FULL_SPECTRUM")) {
    break;
  }
}
