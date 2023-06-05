/** @format */

/// <reference types="cypress" />

import { AboutPage } from "../page-objects/AboutPage";
import {
  BASEURL,
  setupPageWithTheme,
  viewports,
  viewPortSetup,
  viewportDisplay,
} from "../support/e2e";

const ABOUTURL = `${BASEURL}/about`;
const aboutPage: AboutPage = new AboutPage();

for (let viewport of viewports) {
  const viewString = viewportDisplay(viewport);
  context(`About Page render testing at viewport size: ${viewString}`, () => {
    before(() => {
      viewPortSetup(viewport);
      setupPageWithTheme(ABOUTURL, "dark");
      cy.wait(1000);
    });

    // let viewport = viewports[0];
    describe(`About Page Main section is rendering as expected at size: ${viewString}`, () => {
      it("About Main is visible and rendering all children", () => {
        aboutPage
          .aboutMain()
          .should("be.visible")
          .children()
          .should("have.length", 2);
      });

      it("About Main is correctly rendering all CSS", () => {
        aboutPage
          .aboutMain()
          .should("have.css", "position", "relative")
          .should("have.css", "color", "rgb(206, 255, 208)")
          .then((div: Cypress.Chainable<JQuery<HTMLDivElement>>) => {
            expect(div).to.have.css("margin");
            expect(div).to.have.css("padding");
          });
      });

      it("About Main Logo is rendering with correct styles", () => {
        aboutPage
          .aboutMain()
          .find("img")
          .should("be.visible")
          .should(
            "have.attr",
            "src",
            "/_next/image?url=%2Fassets%2Fabout.png&w=1920&q=75"
          )
          .should(
            "have.attr",
            "alt",
            "An animated image of a developer, happily working away with code at a standing office desk of the future with holographic displays"
          )
          .then((img: Cypress.Chainable<JQuery<HTMLImageElement>>) => {
            expect(img).to.have.css("display", "block");
            expect(img).to.have.css("filter", "hue-rotate(260deg)");
            expect(img).to.have.css("max-width");
            expect(img).to.have.css("max-height");
            expect(img).to.have.css("margin");
          });
      });
    });

    describe(`About Page developer Introduction section is rendering as expected at size: ${viewString}`, () => {
      it("About Page developer introduction is visible and rendering childeren", () => {
        aboutPage
          .aboutIntro()
          .should("be.visible")
          .children()
          .should("have.length", 2);
      });

      it("About Page developer introduction is correctly rendering container css", () => {
        aboutPage
          .aboutIntro()
          .should("have.css", "color", "rgb(206, 255, 208)")
          .then((div: Cypress.Chainable<JQuery<HTMLDivElement>>) => {
            expect(div).to.have.css("margin");
            expect(div).to.have.css("font-size");
          });
      });

      it("About Page developer introduction is correctly rendering introduction text", () => {
        aboutPage
          .aboutIntro()
          .find("p")
          .should("be.visible")
          .and("have.length", 1)
          .and("have.css", "text-align", "left")
          .and("contain.text", "Jesse Greenough")
          .and("contain.text", "Full-Stack Developer")
          .and("contain.text", "my favorite color is Green")
          .and(
            "contain.text",
            "Apart from learning and coding, some other activities that I love"
          )
          .find("span")
          .should("have.length", 3);

        aboutPage.aboutIntro().find("p").find("br").should("have.length", 6);
      });

      it("About Page developer introduction is rendering the correct amount of developer activities", () => {
        aboutPage
          .aboutIntro()
          .find("ul")
          .should("be.visible")
          .children()
          .should("have.length", 7);
      });

      it("About Page developer introduction is rendering developer activities correctly", () => {
        aboutPage
          .aboutIntro()
          .find("ul")
          .within(() => {
            cy.get("li").should("have.length", 7);

            let listItem: Cypress.Chainable<JQuery<HTMLElement>>;

            listItem = cy.get("li").eq(0);
            aboutPage.testIntroListItem(listItem);

            listItem = cy.get("li").eq(1);
            aboutPage.testIntroListItem(listItem);

            listItem = cy.get("li").eq(2);
            aboutPage.testIntroListItem(listItem);

            listItem = cy.get("li").eq(3);
            aboutPage.testIntroListItem(listItem);

            listItem = cy.get("li").eq(4);
            aboutPage.testIntroListItem(listItem);

            listItem = cy.get("li").eq(5);
            aboutPage.testIntroListItem(listItem);

            listItem = cy.get("li").eq(6);
            aboutPage.testIntroListItem(listItem);
          });
      });
    });

    describe(`About Page developer details section is rendering as expected at size: ${viewString}`, () => {
      it("About Page Developers details section is visible and rendering all children", () => {
        aboutPage
          .aboutDetail()
          .should("be.visible")
          .children()
          .should("have.length", 6);
      });

      it("About Page Developers details section has the correct visible styled title", () => {
        aboutPage
          .aboutDetail()
          .find("h1")
          .should("be.visible")
          .and("have.length", 1)
          .and("contain.text", "All About Me")
          .and("have.css", "color", "rgb(206, 255, 208)")
          .and("have.css", "text-align", "center");
      });

      it("About Page Developers details section has all text pieces with correct container css", () => {
        aboutPage
          .aboutDetail()
          .find("p")
          .should("be.visible")
          .and("have.length", 5);

        aboutPage.aboutDetail().within(() => {
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
        });
      });

      it("About Page Developers details section rendering matches all text expectations ", () => {
        aboutPage.testDetailParagraphText(aboutPage.aboutDetail());
      });
    });
  });
  if (!Cypress.env("FULL_SPECTRUM")) {
    break;
  }
}
