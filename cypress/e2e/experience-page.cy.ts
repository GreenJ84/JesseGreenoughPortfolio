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

  describe("Experience Page rendering", () => {
    it("Page layout is rendering correctly", () => {
      expPage.pageContainer().should("be.visible");
    });

    it("Page container styling is correct", () => {
      expPage.pageContainer().should("be.visible");
    });

    it("Nav Buttons layout is correct", () => {
      expPage.experienceToggle().should("be.visible");
    });

    it("Nav Buttons styling is correct", () => {
      expPage.experienceToggle().should("be.visible");
    });

    it("Page shits sections correctly with the nav buttons", () => {
      expPage.experienceToggle().should("be.visible");
      expPage.educationContainer().should("be.visible");
      expPage.workContainer().should("not.exist");
    });
  });

  describe("Education experience rendering", () => {
    it("Education Layout is rendering correctly", () => {
      expPage.educationContainer().should("be.visible");
    });

    it("Section intro layout is correct", () => {
      expPage.educationInto().should("be.visible");
    });

    it("Section intro styling is correct", () => {
      expPage.educationInto().should("be.visible");
    });

    it("Degree subsection layout is rendering correct", () => {
      expPage.degreeContainer().should("be.visible");
    });

    it("Degree subsection styling is correct", () => {
      expPage.degreeContainer().should("be.visible");
    });

    it("Degree items layouts are rendering correct", () => {
      expPage.degreeList().should("be.visible");
    });

    it("Degree items styling is correct", () => {
      expPage.degreeList().should("be.visible");
    });

    it("Certifications layout is rendering correct", () => {
      expPage.certificateContainer().should("be.visible");
    });

    it("Certifications styling is correct", () => {
      expPage.certificateContainer().should("be.visible");
    });

    it("Certification items layouts are rendering correct", () => {
      expPage.certificationList().should("be.visible");
    });

    it("Certification items styling is correct", () => {
      expPage.certificationList().should("be.visible");
    });

    it("Certifications filtering works correctly", () => {
      expPage.certificationFilter().should("be.visible");
    });
  });

  describe("Work experience rendering", () => {
    before(() => { 
      expPage.experienceToggle().children("button").last().click();
    })
    it("Work Layout is rendering correctly", () => {
      expPage.workContainer().should("be.visible");
    });

    it("Section intro layout is correct", () => {
      expPage.workInto().should("be.visible");
    });

    it("Section intro styling is correct", () => {
      expPage.workInto().should("be.visible");
    });

    it("Work List layout is rendering correct", () => {
      expPage.workList().should("be.visible");
    });

    it("Work List styling is correct", () => {
      expPage.workList().should("be.visible");
    });

    it("Work item layouts are rendering correct", () => {
      expPage.workList().should("be.visible");
    });

    it("Work item styling is correct", () => {
      expPage.workList().should("be.visible");
    });

    it("Work filtering works correctly", () => {
      expPage.workToggle().should("be.visible");
    });
  });
  // })
});
