/** @format */

/// <reference types="cypress" />

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
    describe(`Resume Page Main resume section is rendering as expected at size: ${
      typeof viewport == "string"
        ? viewport
        : `${viewport.width} x ${viewport.height}`
    }`, () => {
      before(() => setUpStandard(viewport));

      it("", () => {});
    });
  });
});
