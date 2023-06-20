/** @format */

import { WorkPage } from "../page-objects/WorkPage";
import {
  BASEURL,
  setupPageWithTheme,
  viewPortSetup,
  viewportDisplay,
  viewports,
} from "../support/e2e";

const WORKURL = BASEURL + "/experience/work";
const workPage = new WorkPage();

for (let viewport of viewports) {
  context("Work Page render testing", () => {
    before(() => {
      setupPageWithTheme(WORKURL, "dark");
      cy.wait(1000);
    });

    beforeEach(() => {
      viewPortSetup(viewport);
      cy.wait(500);
    });

    describe(`Work Page Container rendering on Viewport: ${viewportDisplay(
      viewport
    )}`, () => {
      it("Container is rendering the correct layout", () => { });
      it("Container is rendering the correct styling", () => { });
    });
    describe(`Work Page Intro rendering on Viewport: ${viewportDisplay(
      viewport
    )}`, () => {
      it("Intro is rendering the correct layout", () => { });
      it("Intro contiainer and title is rendering the correct styling", () => { });
      it("Intro Body is rendering the correct text", () => { });
      it("Intro Body is rendering the correct styling", () => { });
    });
    describe(`Work Page Filter rendering on Viewport: ${viewportDisplay(
      viewport
    )}`, () => {
      it("Toggle container is rendering the correct layout", () => { });
      it("Toggle container is rendering the correct styling", () => { });
      it("Toggle items are rendering the correct styling", () => { });
      it("Toggle item hover effects are rendering correctly", () => { });
      it("Toggling items effectively change their stylings", () => { });
      it("Toggling item effictively change the work displayed", () => { });
    });
    describe(`Work Page List and Items Rendering on Viewport: ${viewportDisplay(
      viewport
    )}`, () => {
      it("List is rendering the correct layout", () => { });
      it("List container is rendering the correct styling", () => { });
      it("List items are rendering the correct layout", () => { });
      it("List item images are rendering the correct styling", () => { });
      it("List item bodies are rendering the correct styling", () => { });
      it("List item hover effects are rendering correctly", () => { });
    });
  });
}
