/** @format */

/// <reference types="cypress" />

import { AboutPage } from "../page-objects/AboutPage";
import { BASEURL, viewports, setUpStandard } from "../support/e2e";

let aboutPage: AboutPage;
const ABOUTURL = `${BASEURL}/about`;

describe("About Page render testing at all viewport sizes", () => {
  before(() => {
    aboutPage = new AboutPage();
    cy.window().then((win) => {
      win.localStorage.setItem("theme", "dark");
    });
    cy.visit(ABOUTURL);
  });

  viewports.forEach((viewport) => {
    describe(`About Page Main section is rendering as expected at size: ${
      typeof viewport == "string"
        ? viewport
        : `${viewport.width} x ${viewport.height}`
    }`, () => {
      before(() => setUpStandard(viewport));

      it("About Main is visible and rendering all children", () => {
        aboutPage.aboutMain
          .should("be.visible")
          .children()
          .should("have.length", 2)
      });

      it("About Main is correctly rendering all CSS", () => { 
        aboutPage.aboutMain
          .should("have.css", "position", `relative`)
          .should("have.css", "margin", "0 auto")
          .should("have.css", "padding", "8rem 0 4rem")
          .should("have.css", "color", "rgb()")
      })

      it("About Main Logo is rendering with correct styles", () => { 
        aboutPage.aboutMain
          .find("img")
          .should("be.visible")
          .should("have.attr", "src", "/assets/about.png")
          .and("have.attr", "display", "block")
          .and("have.attr", "alt", "An animated image of a developer, happily working away with code at a standing office desk of the future with holographic displays")
          .and("have.attr", "max-width", "70rem")
          .and("have.attr", "max-height", "45rem")
          .and("have.attr", "filter", "hue-rotate(260deg)");
      })
    });

    describe(`About Page developer Introduction section is rendering as expected at size: ${
      typeof viewport == "string"
        ? viewport
        : `${viewport.width} x ${viewport.height}`
    }`, () => {
      before(() => setUpStandard(viewport));

      it("About Page developer introduction is visible and rendering childeren", () => {
        aboutPage.aboutIntro
          .should("be.visible")
          .children()
          .should("have.length", 2);
      });

      it("About Page developer introduction is correctly rendering container css", () => {
        aboutPage.aboutIntro
          .should("have.css", "margin", "0")
          .should("have.css", "color", "rgb(206, 255, 208)")
          .should("have.css", "font-size")
      });

      it("About Page developer introduction is correctly rendering introduction text", () => {
        aboutPage.aboutIntro
          .find("p")
          .should("be.visible")
          .should("have.length", 1)
          .should("have.css", "text-align", "left")
          .should("contain.text", "Jesse Greenough")
          .should("contain.text", "Full-Stack Developer")
          .should("contain.text", "my favorite color is Green")
          .should("contain.text", "Apart from learning and coding, some other activities that I love")
          .find("span")
          .should("have.length", 3)
          .find("br")
          .should("have.length", 6)
      });

      it("About Page developer introduction is rendering the correct amount of developer activities", () => {
        aboutPage.aboutIntro
          .find("ul")
          .should("be.visible")
          .children()
          .should("have.length", 7)
      });

      it("About Page developer introduction is rendering  developer activities correctly", () => {
        aboutPage.aboutIntro.get("ul").within(() => {
            cy.get("li")
              .should("have.length", 7);
          
          let listItem: Cypress.Chainable<JQuery<HTMLElement>>;
          
          listItem = cy.get("li")
            .eq(0)
          aboutPage.testIntroListItem(listItem)

          listItem = cy.get("li")
            .eq(1)
          aboutPage.testIntroListItem(listItem)
          
          listItem = cy.get("li")
            .eq(2)
          aboutPage.testIntroListItem(listItem)
          
          listItem = cy.get("li")
            .eq(3)
          aboutPage.testIntroListItem(listItem)
          
          listItem = cy.get("li")
            .eq(4)
          aboutPage.testIntroListItem(listItem)
          
          listItem = cy.get("li")
            .eq(5)
          aboutPage.testIntroListItem(listItem)
          
          listItem = cy.get("li")
            .eq(6)
        aboutPage.testIntroListItem(listItem)
          });
        });
    });

    describe(`About Page developer details section is rendering as expected at size: ${
      typeof viewport == "string"
        ? viewport
        : `${viewport.width} x ${viewport.height}`
    }`, () => {
      before(() => setUpStandard(viewport));

      it("About Page Developers details section is visible and rendering all children", () => {
        aboutPage.aboutDetail
          .should("be.visible")
          .children()
          .should("have.length", 6);
      });

      it("About Page Developers details section has the correct visible styled title", () => {
        aboutPage.aboutDetail
          .find("h1")
          .should("be.visible")
          .should("have.length", 1)
          .should("contain.text", "All About Me")
          .should("have.css", "color", "rgb(206, 255, 208)")
        .should("have.css", "text-align", "center")
      });

      it("About Page Developers details section has all text pieces with correct container css", () => {
        aboutPage.aboutDetail
          .find("p")
          .should("be.visible")
          .should("have.length", 5)
        
        aboutPage.aboutDetail
          .within(() => { 
            let para: Cypress.Chainable<JQuery<HTMLParagraphElement>>;

            para = cy.get("p").eq(0);
            aboutPage.testDetailParagraphsStyle(para);

            para = cy.get("p").eq(1);
            aboutPage.testDetailParagraphsStyle(para);

            para = cy.get("p").eq(2);
            aboutPage.testDetailParagraphsStyle(para);

            para = cy.get("p").eq(3);
            aboutPage.testDetailParagraphsStyle(para);

            para = cy.get("p").eq(4);
            aboutPage.testDetailParagraphsStyle(para);

            para = cy.get("p").eq(5);
            aboutPage.testDetailParagraphsStyle(para);
          })
      });

      it("About Page Developers details section rendering matches all text expectations ", () => {
        aboutPage.testDetailParagraphText(
          aboutPage.aboutDetail.get("p")
        );
      });
    });

  });
});
