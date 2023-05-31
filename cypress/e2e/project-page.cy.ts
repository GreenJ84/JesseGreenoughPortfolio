/** @format */

/// <reference types="cypress" />

import { ProjectPage } from "../page-objects/ProjectPage";
import {
  BASEURL,
  setupPageWithTheme,
  viewPortSetup,
  viewportDisplay,
  viewports,
} from "../support/e2e";

const PROJURL = BASEURL + "/projects";
const projPage = new ProjectPage();

let viewport = viewports[0];
// for (let viewport of viewports) {
context(`Project page testing at Viewport ${viewportDisplay(viewport)}`, () => {
  before(() => {
    viewPortSetup(viewport);
    setupPageWithTheme(PROJURL, "dark");
  });

  describe("The Page and Projects containers render correctly", () => {
    it("The page containers render the correct stying", () => { 
      projPage.pageContainer().should("be.visible");
    });
    
    it("The projects containers renders the correct layout", () => { 
      projPage.projectsContainer().should("be.visible");
    });
    
    it("The projects container render the correct layout", () => { 
      projPage.projectsContainer().should("be.visible");
    });
    
    it("The projects container render the correct stying", () => {
      projPage.projectsContainer().should("be.visible");
    });
  });

  describe("The Projects filter render correctly", () => {
    it("The Filters have the correct layout", () => { 
      projPage.projectsFilter().should("be.visible");
    });
    
    it("The Filters have the correct styling", () => { 
      projPage.projectsFilter().should("be.visible");
    });
    
    it("The Filters functionally change during activation", () => { 
      projPage.projectsFilter().should("be.visible");
    });
    
    it("The Filters correctly adjust how the Title renders", () => { 
      projPage.projectsFilter().should("be.visible");
      projPage.projectsTitle().should("be.visible");
    });
    
    it("The Filters adjust the displayed projects correctly", () => {
      projPage.projectsFilter().should("be.visible");
      projPage.projectsList().should("be.visible");
    });
  });

  describe("The projects list renders correctly", () => {
    it("The project list title has the correct styling", () => {
      projPage.projectsTitle().should("be.visible");
    });

    it("The projects list renders the correct styling", () => {
      projPage.projectsList().should("be.visible");
    });

    it("Projects items are rendering the correct layout", () => {
      projPage.projectItem(0).should("be.visible");
    });
    
    it("Projects items are rendering the correct styling", () => { 
      projPage.projectItem(0).should("be.visible");
    });
  });

  describe("The projects detail cards render correctly", () => { 
    it("The projects detail cards activate and close correctly", () => { 
      projPage.projectItem(0).should("be.visible");
    })

    it("The projects detail cards have the correct layout", () => {
      projPage.projectItem(0).should("be.visible");
    });

    it("The projects detail cards left sides have the correct stylings", () => {
      projPage.projectItem(0).should("be.visible");
    });

    it("The projects detail cards right sides have the correct stylings", () => {
      projPage.projectItem(0).should("be.visible");
    });

    it("All the projects detail cards have the noticable hover effects", () => {
      projPage.projectItem(0).should("be.visible");
    });
  })
});

// }
