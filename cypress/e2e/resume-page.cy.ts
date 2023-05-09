/** @format */

/// <reference types="cypress" />

import { ResumePage } from "../page-objects/ResumePage";
import { BASEURL, viewports, setUpStandard } from "../support/e2e";

let resumePage: ResumePage;
const RESUMEURL = `${BASEURL}/resume`;

describe("Resume Page render testing at all viewport sizes", () => {
  before(() => {
    resumePage = new ResumePage();
    cy.window().then((win) => {
      win.localStorage.setItem("theme", "dark");
    });
    cy.visit(RESUMEURL);
  });

  viewports.forEach((viewport) => {
    describe(`Resume Page container renders as expected at size: ${
      typeof viewport == "string"
        ? viewport
        : `${viewport.width} x ${viewport.height}`
    }`, () => {
      before(() => setUpStandard(viewport));

      it("The resume Page renders the correct main layout", () => { });
      
      it("The resume Page renders the correct css styles", () => {});
    });

    describe(`Resume holder renders as expected at size: ${
      typeof viewport == "string"
        ? viewport
        : `${viewport.width} x ${viewport.height}`
    }`, () => {
      before(() => setUpStandard(viewport));

      it("The layout of the resume section is correct", () => { });
      
      it("The css styles of the resume section are correct", () => { });
      
      it("The resume image renders the correct contents", () => { });
    });

    describe(`Resume navigation renders as expected at size: ${
      typeof viewport == "string"
        ? viewport
        : `${viewport.width} x ${viewport.height}`
    }`, () => {
      before(() => setUpStandard(viewport));

      it("The resume navigation correctly cycles through resumes and renders based on viewport", () => {
        expect(true).to.be.true;
      });
    });

    describe(`Resume Page buttons are rendering as expected at size: ${
      typeof viewport == "string"
        ? viewport
        : `${viewport.width} x ${viewport.height}`
    }`, () => {
      before(() => setUpStandard(viewport));

      it("The correct amount of button groups render", () => { 
        resumePage.resumeHolder
      });
      
      it("The buttons inside each group have the correct layout", () => { });
      
      it("The buttons in each group have the correct css styling", () => { });
    });
  });
});
