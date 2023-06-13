/** @format */

/// <reference types="cypress" />

import { HomePage } from "../page-objects/HomePage";
import {
  BASEURL,
  getWindowInnerWidth,
  setupPageWithTheme,
  viewportDisplay,
  viewports,
  viewPortSetup,
} from "../support/e2e";

const HOMEURL = `${BASEURL}/`;
const homePage: HomePage = new HomePage();

for (let viewport of viewports) {
  const viewString = viewportDisplay(viewport);
  context(`Home Page render testing`, () => {
    before(() => {
      viewPortSetup(viewport);
      setupPageWithTheme(HOMEURL, "dark");
      cy.wait(1000);
    });
    describe(`Home page Introduction visable and rendering as expected at size: ${viewString}`, () => {
      it("Page container is rendering the correct layout", () => {
        homePage
          .homeContainer()
          .should("be.visible")
          .children()
          .should("have.length", 3);
      });

      it("Page greeting is rendering the correct layout", () => {
        homePage
          .homeTop()
          .children()
          .should("have.length", 3)
          .then(($introChildren: JQuery<HTMLElement>) => {
            // Developer Name
            cy.wrap($introChildren).eq(0).children().should("have.length", 3);

            // Type Writers
            cy.wrap($introChildren).eq(1).children().should("have.length", 3);

            // Landing Developer Logo
            cy.wrap($introChildren)
              .eq(2)
              .should("be.visible")
              .and("have.prop", "tagName", "IMG");
          });
      });

      it("Page greeting container is rendering the correct stlying", () => {
        homePage
          .homeTop()
          .should("be.visible")
          .then(($introContainer: JQuery<HTMLElement>) => {
            expect($introContainer).to.have.css("position", "relative");
            expect($introContainer).to.have.css("margin");
            expect($introContainer).to.have.css("width");
            expect(parseFloat($introContainer.css("width"))).to.be.lte(1400);
            expect($introContainer).to.have.css("text-align", "center");
            expect($introContainer)
              .to.have.css("color")
              .match(/rgb\(230, 255, 243\)/);
            expect($introContainer)
              .to.have.css("text-shadow")
              .match(
                /rgb\(12, 43, 33\) ((\d+\.)?\d+px\s?){3}, rgb\(164, 255, 182\) ((\d+\.)?\d+px\s?){3}/
              );
          });
      });

      it("Page greeting title is rendering the correct styling", () => {
        homePage
          .homeTop()
          .children("h1")
          .first()
          .should("have.be.visible")
          .then(($introTitle: JQuery<HTMLElement>) => {
            expect($introTitle).to.have.css("margin-bottom");
            expect($introTitle).to.have.css("font-size");
            expect($introTitle).to.have.css("font-weight");
            expect($introTitle).to.include.text("Hi There! ");
          })
          .children("span")
          .first()
          .then(($waveAnimation: JQuery<HTMLElement>) => {
            expect($waveAnimation).to.have.css("display", "inline-block");
            expect($waveAnimation).to.have.css("margin-left");
            expect($waveAnimation).to.have.css("animation");
            expect($waveAnimation).to.have.css("transform-origin");
          });
      });

      it("The Developers Name is visable and rendering correctly inside title", () => {
        homePage
          .homeTop()
          .children("h1")
          .first()
          .should("be.visible")
          .contains("JESSE GREENOUGH");
      });

      it("Page greeting typewriters are rendering the correct styling", () => {
        homePage
          .homeTop()
          .children("div")
          .first()
          .should("have.be.visible")
          .then(($typecontainer: JQuery<HTMLElement>) => {
            expect($typecontainer).to.have.css("margin-bottom");
            expect(parseFloat($typecontainer.css("margin-bottom"))).to.be.lte(
              30
            );
            expect($typecontainer).to.have.css("text-align", "center");
            expect($typecontainer).to.have.css("font-size");
            expect(parseFloat($typecontainer.css("font-size")))
              .to.be.lte(42)
              .and.to.be.gte(16);
            expect($typecontainer).to.have.css("font-weight", "700");
          })
          .children("div")
          .each(($typewriter: JQuery<HTMLElement>) => {
            expect($typewriter).to.have.css("display", "inline-block");
            expect($typewriter).to.have.css("margin");
            expect($typewriter).to.have.css("letter-spacing", "2px");
            expect($typewriter)
              .to.have.css("text-shadow")
              .match(
                /rgb\(12, 43, 33\) ((\d+\.)?\d+px\s?){3}, rgb\(164, 255, 182\) ((\d+\.)?\d+px\s?){3}/
              );
          });
      });

      it("Page greeting logo is rendering the correct styling", () => {
        homePage
          .homeTop()
          .children("img")
          .first()
          .should("have.be.visible")
          .then(($img: JQuery<HTMLElement>) => {
            expect($img).to.have.css("position", "relative");
            expect($img).to.have.css("margin");
            expect($img).to.have.css("width");
            expect($img).to.have.css("height");
            expect(parseFloat($img.css("height"))).to.be.lte(650);
            expect($img).to.have.css("filter", "hue-rotate(205deg)");
            expect($img).to.have.attr("src", "/assets/home-main.svg");
          });
      });
    });

    describe(`The Developer's Introduction section is rendering correctly at size: ${viewString}`, () => {
      it("The Developer's introduction container has the correct layout rendering", () => {
        homePage
          .developerIntro()
          .should("be.visible")
          .children()
          .should("have.length", 3);
      });

      it("The Developer's Introduction container is rendering the correct styling", () => {
        homePage
          .developerIntro()
          .should("be.visible")
          .then(($devContainer: JQuery<HTMLElement>) => {
            expect($devContainer).to.have.css("position", "relative");
            expect($devContainer).to.have.css("margin");
            expect($devContainer).to.have.css("width");
            expect(parseFloat($devContainer.css("width"))).to.be.lte(1450);
            expect($devContainer).to.have.css("padding-bottom", "20px");
            expect($devContainer).to.have.css("text-align", "center");
            expect($devContainer).to.have.css("font-weight", "600");
            expect($devContainer)
              .to.have.css("background-color")
              .match(/rgba\((0(,\s)?){4}\)/);
            expect($devContainer)
              .to.have.css("backdrop-filter")
              .match(/.*blur.*/);

            getWindowInnerWidth().then((width: number) => {
              if (width > 900) {
                expect($devContainer).to.have.css("padding-top", "100px");
              } else {
                expect($devContainer).to.have.css("padding-top", "20px");
              }
            });
          });
      });

      it("The Developer's intro Title is rendering the correct layout", () => {
        homePage
          .developerIntro()
          .find("h2")
          .should("be.visible")
          .and("have.length", 1)
          .and("contain", "LET ME INTRODUCE MYSELF")
          .children()
          .should("have.length", 1);
      });

      it("The Developer's intro Title is rendering the correct styling", () => {
        homePage
          .developerIntro()
          .find("h2")
          .should("be.visible")
          .then(($title: JQuery<HTMLElement>) => {
            expect($title).to.have.css("font-size");
            expect(parseFloat($title.css("font-size")))
              .to.be.lte(48)
              .and.to.be.gte(20);
            expect($title)
              .to.have.css("color")
              .match(/rgb\(230, 255, 243\)/);
            expect($title).to.have.css("letter-spacing", "2.5px");
            expect($title).to.have.css("font-weight", "800");
          });
      });

      it("The Developer's intro Image is rendering the correct layout", () => {
        homePage
          .developerIntro()
          .children()
          .eq(1)
          .should("be.visible")
          .children()
          .should("have.length", 1)
          .first()
          .should("be.visible")
          .and("have.attr", "src", "/assets/avatar.svg")
          .and("have.attr", "alt", "Human Avatar Icon");
      });

      it("The Developer's intro Image is rendering the correct layout", () => {
        homePage
          .developerIntro()
          .children()
          .eq(1)
          .then(($tiltContainer: JQuery<HTMLElement>) => {
            expect($tiltContainer).to.have.css("float", "right");
            expect($tiltContainer).to.have.css("margin");
          })
          .children()
          .first()
          .then(($img: JQuery<HTMLElement>) => {
            expect($img).to.have.css("width");
            expect(parseFloat($img.css("width"))).to.be.lte(300);

            expect($img).to.have.css("height");
            expect(parseFloat($img.css("height"))).to.be.lte(300);
          });
      });

      it("The Developer's intro Text is rendering correctly", () => {
        homePage
          .developerIntro()
          .find("p")
          .should("be.visible")
          .and("contain", "Coding Dojo")
          .and("contain", "TypeScript")
          .and("contain", "JavaScript")
          .and("contain", "Python")
          .and("contain", "Rust")
          .and("contain", "Java")
          .find("span")
          .should("have.length", 8);
      });

      it("The Developer's intro Text is rendering the correct styling", () => {
        homePage
          .developerIntro()
          .find("p")
          .should("be.visible")
          .then(($el: JQuery<HTMLElement>) => {
            expect($el).to.have.css("padding");
            expect($el).to.have.css("font-size");
            expect(parseFloat($el.css("font-size")))
              .to.be.lte(34)
              .and.to.be.gte(14);
            expect($el).to.have.css("text-align", "left");
            expect($el)
              .to.have.css("color")
              .match(/rgb\(230, 255, 243\)/);
          });
      });
    });

    describe(`The technical skills sections are rendering as expected at size: ${viewString}`, () => {
      it("The skills title is rendering the correct layout", () => {
        homePage
          .skillsIntro()
          .should("be.visible")
          .children("h2")
          .should("have.length", 1)
          .first()
          .should("contain.text", "Technical Skillsets")
          .children()
          .should("have.length", 3);
      });

      it("The skills title is rendering the correct styling", () => {
        homePage
          .skillsIntro()
          .should("have.css", "position", "relative")
          .children("h2")
          .first()
          .then(($title: JQuery<HTMLElement>) => {
            expect($title).to.have.css("margin");
            expect($title).to.have.css("text-align", "center");
            expect($title).to.have.css("letter-spacing", "2.5px");
            expect($title).to.have.css("font-size");
            expect($title).to.have.css("font-weight", "800");
            expect($title)
              .to.have.css("color")
              .match(/rgb\(230, 255, 243\)/);
          });
      });

      it("The Language section is rendering the correct layout", () => {
        homePage
          .languages()
          .should("be.visible")
          .then(($languageContainer: JQuery<HTMLElement>) => {
            // Section Title
            cy.wrap($languageContainer)
              .children("h3")
              .should("have.length", 1)
              .first()
              .should("contain.text", "Languages")
              .children()
              .should("have.length", 1);

            // Section Skills List
            cy.wrap($languageContainer)
              .children("ul")
              .should("have.length", 1)
              .first()
              .should("have.attr", "id", "languages")
              .children("li")
              .should("have.length", 12);
          });
      });

      it("The Language section titles and lists are rendering the correct styling", () => {
        homePage
          .languages()
          .children()
          .then(($languageChildren: JQuery<HTMLElement>) => {
            // Section Title
            cy.wrap($languageChildren)
              .eq(0)
              .then(($title: JQuery<HTMLElement>) => {
                expect($title).to.have.css("position", "relative");
                expect($title).to.have.css("margin");
                expect($title).to.have.css("text-align", "center");
                expect($title)
                  .to.have.css("color")
                  .match(/rgb\(230, 255, 243\)/);
                expect($title).to.have.css("font-size");
                expect(parseFloat($title.css("font-size")))
                  .to.be.lte(48)
                  .and.to.be.gte(20);
                expect($title).to.have.css("font-weight", "800");
              });

            // Section Skills List
            cy.wrap($languageChildren)
              .eq(1)
              .then(($list: JQuery<HTMLElement>) => {
                expect($list).to.have.css("display", "flex");
                expect($list).to.have.css("flex-wrap", "wrap");
                expect($list).to.have.css("justify-content", "center");
                expect($list).to.have.css("margin");
                expect($list).to.have.css("width");
                expect(parseFloat($list.css("width"))).to.be.lte(1300);
              });
          });
      });

      it("The Framework is rendering the correct layout", () => {
        homePage
          .framework()
          .should("be.visible")
          .then(($frameworksContainer: JQuery<HTMLElement>) => {
            // Section Title
            cy.wrap($frameworksContainer)
              .children("h3")
              .should("have.length", 1)
              .first()
              .should("contain.text", "Frameworks")
              .children()
              .should("have.length", 1);

            // Section Skills List
            cy.wrap($frameworksContainer)
              .children("ul")
              .should("have.length", 1)
              .first()
              .should("have.attr", "id", "frameworks")
              .children("li")
              .should("have.length", 17);
          });
      });

      it("The Framework section titles and lists are rendering the correct styling", () => {
        homePage
          .framework()
          .children()
          .then(($frameworksChildren: JQuery<HTMLElement>) => {
            // Section Title
            cy.wrap($frameworksChildren)
              .eq(0)
              .then(($title: JQuery<HTMLElement>) => {
                expect($title).to.have.css("position", "relative");
                expect($title).to.have.css("margin");
                expect($title).to.have.css("text-align", "center");
                expect($title)
                  .to.have.css("color")
                  .match(/rgb\(230, 255, 243\)/);
                expect($title).to.have.css("font-size");
                expect(parseFloat($title.css("font-size")))
                  .to.be.lte(48)
                  .and.to.be.gte(20);
                expect($title).to.have.css("font-weight", "800");
              });

            // Section Skills List
            cy.wrap($frameworksChildren)
              .eq(1)
              .then(($list: JQuery<HTMLElement>) => {
                expect($list).to.have.css("display", "flex");
                expect($list).to.have.css("flex-wrap", "wrap");
                expect($list).to.have.css("justify-content", "center");
                expect($list).to.have.css("margin");
                expect($list).to.have.css("width");
                expect(parseFloat($list.css("width"))).to.be.lte(1300);
              });
          });
      });

      it("The Database section is rendering the correct layout", () => {
        homePage
          .databases()
          .should("be.visible")
          .then(($databaseContainer: JQuery<HTMLElement>) => {
            // Section Title
            cy.wrap($databaseContainer)
              .children("h3")
              .should("have.length", 1)
              .first()
              .should("contain.text", "Databases")
              .children()
              .should("have.length", 1);

            // Section Skills List
            cy.wrap($databaseContainer)
              .children("ul")
              .should("have.length", 1)
              .first()
              .should("have.attr", "id", "databases")
              .children("li")
              .should("have.length", 6);
          });
      });

      it("The Database section titles and lists are rendering the correct styling", () => {
        homePage
          .framework()
          .children()
          .then(($databaseChildren: JQuery<HTMLElement>) => {
            // Section Title
            cy.wrap($databaseChildren)
              .eq(0)
              .then(($title: JQuery<HTMLElement>) => {
                expect($title).to.have.css("position", "relative");
                expect($title).to.have.css("margin");
                expect($title).to.have.css("text-align", "center");
                expect($title)
                  .to.have.css("color")
                  .match(/rgb\(230, 255, 243\)/);
                expect($title).to.have.css("font-size");
                expect(parseFloat($title.css("font-size")))
                  .to.be.lte(48)
                  .and.to.be.gte(20);
                expect($title).to.have.css("font-weight", "800");
              });

            // Section Skills List
            cy.wrap($databaseChildren)
              .eq(1)
              .then(($list: JQuery<HTMLElement>) => {
                expect($list).to.have.css("display", "flex");
                expect($list).to.have.css("flex-wrap", "wrap");
                expect($list).to.have.css("justify-content", "center");
                expect($list).to.have.css("margin");
                expect($list).to.have.css("width");
                expect(parseFloat($list.css("width"))).to.be.lte(1300);
              });
          });
      });

      it("The Developer tools section is rendering the correct layout", () => {
        homePage
          .developerTools()
          .should("be.visible")
          .then(($devToolsContainer: JQuery<HTMLElement>) => {
            // Section Title
            cy.wrap($devToolsContainer)
              .children("h3")
              .first()
              .should("contain.text", "Development Tools");

            // Section Sub Skills Titles
            cy.wrap($devToolsContainer)
              .children("h4")
              .should("have.length", 5)
              .then(($subTitles: JQuery<HTMLElement>) => {
                expect($subTitles.eq(0)).to.include.text("Governance/Planning");

                expect($subTitles.eq(1)).to.include.text("Development");

                expect($subTitles.eq(2)).to.include.text("Runtime");

                expect($subTitles.eq(3)).to.include.text("DevOps/Serving");

                expect($subTitles.eq(4)).to.include.text("Extras");
              });

            // Section Sub Skills Lists
            cy.wrap($devToolsContainer)
              .children("ul")
              .should("have.length", 5)
              .then(($skillLists: JQuery<HTMLElement>) => {
                cy.wrap($skillLists).eq(0).children().should("have.length", 4);
                cy.wrap($skillLists).eq(1).children().should("have.length", 11 );
                cy.wrap($skillLists).eq(2).children().should("have.length", 5);
                cy.wrap($skillLists).eq(3).children().should("have.length", 9);
                cy.wrap($skillLists).eq(4).children().should("have.length", 6);
              });
          });
      });

      it("The Developer tools section is rendering the correct styling", () => {
        homePage
          .developerTools()
          .then(($devToolsContainer: JQuery<HTMLElement>) => {
            // Section Title
            cy.wrap($devToolsContainer)
              .children("h3")
              .first()
              .then(($title: JQuery<HTMLElement>) => {
                expect($title).to.have.css("position", "relative");
                expect($title).to.have.css("margin");
                expect($title).to.have.css("text-align", "center");
                expect($title)
                  .to.have.css("color")
                  .match(/rgb\(230, 255, 243\)/);
                expect($title).to.have.css("font-size");
                expect(parseFloat($title.css("font-size")))
                  .to.be.lte(48)
                  .and.to.be.gte(20);
                expect($title).to.have.css("font-weight", "800");
              });

            // Section Sub Skills Titles
            cy.wrap($devToolsContainer)
              .children("h4")
              .each(($subTitle: JQuery<HTMLElement>) => {
                expect($subTitle).to.have.css("position", "relative");
                expect($subTitle).to.have.css("margin");
                expect($subTitle).to.have.css("text-align", "center");
                expect($subTitle)
                  .to.have.css("color")
                  .match(/rgb\(0, 255, 13\)/);
                expect($subTitle).to.have.css("font-size");
                expect(parseFloat($subTitle.css("font-size")))
                  .to.be.lte(34)
                  .and.to.be.gte(14);
                expect($subTitle).to.have.css("font-weight", "800");
                expect($subTitle).to.have.css("text-decoration").to.contain("underline");
              });

            // Section Sub Skills Lists
            cy.wrap($devToolsContainer)
              .children("ul")
              .each(($list: JQuery<HTMLElement>) => {
                expect($list).to.have.css("display", "flex");
                expect($list).to.have.css("flex-wrap", "wrap");
                expect($list).to.have.css("justify-content", "center");
                expect($list).to.have.css("margin");
                expect($list).to.have.css("width");
                expect(parseFloat($list.css("width"))).to.be.lte(1300);
              });
          });
      });

      it(`The Github card is being displayed correctly`, () => {
        getWindowInnerWidth().then((windowWidth: number) => {
          if (windowWidth >= 1000) {
            cy.get("#githubCard")
              .should("be.visible")
              .children()
              .should("have.length", 2)
              .first()
              .should("have.text", "Days I Code")
              .next()
              .should("be.visible");
          } else {
            cy.get("#githubCard").should("not.exist");
          }
        });
      });
    });

    describe(`Technical Skills containers are rendering as expected within each section at size: ${viewString}`, () => {
      it("The Language Technical skills containers are rendering the correct layout", () => {
        homePage.testSkillContainerLayout(
          homePage
            .languages()
            .find("#languages")
            .children("li")
            .eq(Math.floor(Math.random() * 12))
        );
      });

      it("The Language Technical skills containers are rendering the correct styling", () => {
        homePage.testSkillContainerStyle(
          homePage
            .languages()
            .find("#languages")
            .children("li")
            .eq(Math.floor(Math.random() * 12))
        );
      });

      it("The Language Technical skills containers are interactive", () => {
        homePage.testSkillContainerInteraction(
          homePage
            .languages()
            .find("#languages")
            .children("li")
            .eq(Math.floor(Math.random() * 12))
        );
      });

      it("The Framework Technical skills containers are rendering the correct layout", () => {
        homePage.testSkillContainerLayout(
          homePage
            .framework()
            .find("#frameworks")
            .children("li")
            .eq(Math.floor(Math.random() * 17))
        );
      });

      it("The Framework Technical skills containers are rendering the correct styling", () => {
        homePage.testSkillContainerStyle(
          homePage
            .framework()
            .should("be.visible")
            .find("#frameworks")
            .children("li")
            .eq(Math.floor(Math.random() * 17))
        );
      });

      it("The Framework Technical skills containers is interactive", () => {
        homePage.testSkillContainerInteraction(
          homePage
            .framework()
            .should("be.visible")
            .find("#frameworks")
            .children("li")
            .eq(Math.floor(Math.random() * 17))
        );
      });

      it("The Database Technical skills containers are rendering the correct layout", () => {
        homePage.testSkillContainerLayout(
          homePage
            .databases()
            .should("be.visible")
            .find("#databases")
            .children("li")
            .eq(Math.floor(Math.random() * 6))
        );
      });

      it("The Database Technical skills containers are rendering the correct styling", () => {
        homePage.testSkillContainerStyle(
          homePage
            .databases()
            .should("be.visible")
            .find("#databases")
            .children("li")
            .eq(Math.floor(Math.random() * 6))
        );
      });

      it("The Database Technical skills containers is interactive", () => {
        homePage.testSkillContainerInteraction(
          homePage
            .databases()
            .should("be.visible")
            .find("#databases")
            .children("li")
            .eq(Math.floor(Math.random() * 6))
        );
      });

      it("The Developer Tool Technical skills containers are rendering the correct layout", () => {
        homePage
          .developerTools()
          .children("ul")
          .then(($toolsLists: JQuery<HTMLElement>) => {
            homePage.testSkillContainerLayout(
              cy
                .wrap($toolsLists)
                .eq(0)
                .children("li")
                .eq(Math.floor(Math.random() * 4))
            );

            homePage.testSkillContainerLayout(
              cy
                .wrap($toolsLists)
                .eq(1)
                .children("li")
                .eq(Math.floor(Math.random() * 11))
            );

            homePage.testSkillContainerLayout(
              cy
                .wrap($toolsLists)
                .eq(2)
                .children("li")
                .eq(Math.floor(Math.random() * 5))
            );

            homePage.testSkillContainerLayout(
              cy
                .wrap($toolsLists)
                .eq(3)
                .children("li")
                .eq(Math.floor(Math.random() * 9))
            );

            homePage.testSkillContainerLayout(
              cy
                .wrap($toolsLists)
                .eq(4)
                .children("li")
                .eq(Math.floor(Math.random() * 6))
            );
          });
      });

      it("The Dev Tool Technical skills containers are rendering the correct styling", () => {
        homePage
          .developerTools()
          .children("ul")
          .then(($toolsLists: JQuery<HTMLElement>) => {
            homePage.testSkillContainerStyle(
              cy
                .wrap($toolsLists)
                .eq(0)
                .children("li")
                .eq(Math.floor(Math.random() * 4))
            );

            homePage.testSkillContainerStyle(
              cy
                .wrap($toolsLists)
                .eq(1)
                .children("li")
                .eq(Math.floor(Math.random() * 11))
            );

            homePage.testSkillContainerStyle(
              cy
                .wrap($toolsLists)
                .eq(2)
                .children("li")
                .eq(Math.floor(Math.random() * 5))
            );

            homePage.testSkillContainerStyle(
              cy
                .wrap($toolsLists)
                .eq(3)
                .children("li")
                .eq(Math.floor(Math.random() * 9))
            );

            homePage.testSkillContainerStyle(
              cy
                .wrap($toolsLists)
                .eq(4)
                .children("li")
                .eq(Math.floor(Math.random() * 6))
            );
          });
      });

      it("The Developer Tool Technical skills containers are interactive", () => {
        homePage
          .developerTools()
          .children("ul")
          .then(($toolsLists: JQuery<HTMLElement>) => {
            homePage.testSkillContainerInteraction(
              cy
                .wrap($toolsLists)
                .eq(0)
                .children("li")
                .eq(Math.floor(Math.random() * 4))
            );

            homePage.testSkillContainerInteraction(
              cy
                .wrap($toolsLists)
                .eq(1)
                .children()
                .eq(Math.floor(Math.random() * 11))
            );

            homePage.testSkillContainerInteraction(
              cy
                .wrap($toolsLists)
                .eq(2)
                .children("li")
                .eq(Math.floor(Math.random() * 5))
            );

            homePage.testSkillContainerInteraction(
              cy
                .wrap($toolsLists)
                .eq(3)
                .children("li")
                .eq(Math.floor(Math.random() * 9))
            );

            homePage.testSkillContainerInteraction(
              cy
                .wrap($toolsLists)
                .eq(4)
                .children("li")
                .eq(Math.floor(Math.random() * 6))
            );
          });
      });
    });
  });
  if (!Cypress.env("FULL_SPECTRUM")) {
    break;
  }
}
