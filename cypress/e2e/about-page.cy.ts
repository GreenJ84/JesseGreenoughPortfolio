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
    describe(`About Page container is rendering as expected at size: ${viewString}`, () => {
      it("About Main is rendering the correct layout", () => {
        aboutPage
          .aboutMain()
          .should("be.visible")
          .children()
          .should("have.length", 2);
      });

      it("About Main is rendering the correct styling", () => {
        aboutPage.aboutMain().then(($container: JQuery<HTMLElement>) => {
          expect($container).to.have.css("position", "relative");
          expect($container).to.have.css("padding");
        });
      });
    });

    describe(`About Page developer Introduction section is rendering as expected at size: ${viewString}`, () => {
      it("About Page introduction is rendering the correct layout", () => {
        aboutPage
          .aboutIntro()
          .should("be.visible")
          .children()
          .should("have.length", 3)
          .then(($children: JQuery<HTMLElement>) => {
            cy.wrap($children)
              .eq(0)
              .should("have.prop", "tagName", "H1")
              .and("include.text", "Break the Ice");

            cy.wrap($children).eq(1).should("have.prop", "tagName", "P");

            cy.wrap($children).eq(2).should("have.prop", "tagName", "UL");
          });
      });

      it("About Page introduction container is rendering the correct styling", () => {
        aboutPage.aboutIntro().then(($container: JQuery<HTMLElement>) => {
          expect($container).to.have.css("position", "relative");
          expect($container).to.have.css("margin");
          expect($container).to.have.css("padding");
          expect($container).to.have.css("width");
          expect(parseFloat($container.css("width"))).to.be.lte(1200);
          expect($container).to.have.css("color", "rgb(230, 255, 243)");
          expect($container).to.have.css("backdrop-filter");
        });
      });

      it("About Page introduction children are rendering the correct styling", () => {
        aboutPage
          .aboutIntro()
          .children()
          .then(($children: JQuery<HTMLElement>) => {
            cy.wrap($children)
              .eq(0)
              .then(($title: JQuery<HTMLElement>) => {
                expect($title).to.have.css("margin-bottom", "60px");
                expect($title).to.have.css("text-align", "center");
                expect($title).to.have.css("font-size");
                expect(parseFloat($title.css("font-size")))
                  .to.be.lte(60)
                  .and.to.be.gte(26);
              });

            cy.wrap($children)
              .eq(1)
              .then(($paragraph: JQuery<HTMLElement>) => {
                expect($paragraph).to.have.css("font-size");
                expect(parseFloat($paragraph.css("font-size")))
                  .to.be.lte(34)
                  .and.to.be.gte(14);
              });

            cy.wrap($children)
              .eq(2)
              .then(($list: JQuery<HTMLElement>) => {
                expect($list).to.have.css("list-style-type", "none");
              });
          });
      });

      it("About Page introduction is rendering the correct text", () => {
        aboutPage
          .aboutIntro()
          .children("p")
          .should("have.length", 1)
          .first()
          .should("be.visible")
          .and("contain.text", "Jesse Greenough")
          .and("contain.text", "Full-Stack Developer")
          .and("contain.text", "my favorite colors are Green and Blue")
          .and("contain.text", "other activities that I love")
          .children("span")
          .should("have.length", 4);

        aboutPage
          .aboutIntro()
          .children("p")
          .first()
          .children("br")
          .should("have.length", 6);
      });

      it("About Page introduction is rendering the correct amount of developer activities", () => {
        aboutPage
          .aboutIntro()
          .children("ul")
          .first()
          .should("be.visible")
          .children()
          .should("have.length", 7);
      });

      it("About Page introduction developer activities is rendering the correct styling", () => {
        aboutPage
          .aboutIntro()
          .children("ul")
          .first()
          .children("li")
          .each(($li: JQuery<HTMLElement>) => {
            aboutPage.testIntroListItem(cy.wrap($li));
          });
      });
    });

    describe(`About Page developer details section is rendering as expected at size: ${viewString}`, () => {
      it("About Page Developers details section is rendering the correct layout", () => {
        aboutPage
          .aboutDetail()
          .should("be.visible")
          .then(($container: JQuery<HTMLElement>) => {
            cy.wrap($container)
              .children("h1")
              .should("have.length", 1)
              .first()
              .should("be.visible")
              .children()
              .should("have.length", 1);

            cy.wrap($container)
              .children("p")
              .should("have.length", 5)
              .each(($p) => {
                expect($p).to.be.visible;
              });
          });
      });

      it("About Page Developers details container is rendering the correct styling", () => {
        aboutPage.aboutDetail().then(($container: JQuery<HTMLElement>) => {
          expect($container).to.have.css("padding");
          expect($container).to.have.css("color", "rgb(230, 255, 243)");
          expect($container).to.have.css("backdrop-filter");
        });
      });

      it("About Page details section title is rendering the correct styling", () => {
        aboutPage
          .aboutDetail()
          .children("h1")
          .first()
          .should("contain.text", "All About Me")
          .and("have.css", "color", "rgb(230, 255, 243)")
          .and("have.css", "text-align", "center");
      });

      it("About Page details section paragraphs are rendering the correct styling", () => {
        aboutPage
          .aboutDetail()
          .children("p")
          .each(($p: JQuery<HTMLParagraphElement>) => {
            aboutPage.testDetailParagraphsStyle(cy.wrap($p));
          });
      });

      it("About Page Developers details section rendering matches all text expectations", () => {
        aboutPage.testDetailParagraphText(
          aboutPage.aboutDetail().children("p")
        );
      });
    });
  });
  if (!Cypress.env("FULL_SPECTRUM")) {
    break;
  }
}
