/** @format */

/// <reference types="cypress" />

export class HomePage {
  homeContainer: Function;
  homeTop: Function;
  developerIntro: Function;
  skillsIntro: Function;
  languages: Function;
  framework: Function;
  databases: Function;
  developerTools: Function;

  constructor() {
    this.homeContainer = () => {
      return cy.get("#homePage");
    };
    this.homeTop = () => {
      return cy.get("#homeIntro");
    };
    this.developerIntro = () => {
      return cy.get("#developerIntro");
    };
    this.skillsIntro = () => {
      return cy.get("#skillsIntro");
    };
    this.languages = () => {
      return cy.get("#development-languages");
    };
    this.framework = () => {
      return cy.get("#development-frameworks");
    };
    this.databases = () => {
      return cy.get("#development-databases");
    };
    this.developerTools = () => {
      return cy.get("#developer-tools");
    };
  }

  testSkillContainerLayout(skill: Cypress.Chainable<JQuery<HTMLElement>>) {
    skill
      .should("be.visible")
      .children()
      .should("have.length", 3)
      .then(($children) => {
        expect($children.eq(1)).to.have.prop("tagName", "SPAN");

        expect($children.eq(2)).to.have.prop("tagName", "METER");
      });

    skill
      .eq(2)
      .should("have.attr", "min", "0")
      .and("have.attr", "low", "2")
      .and("have.attr", "high", "4")
      .and("have.attr", "max", "5")
      .and("have.attr", "optimum", "5");
  }

  testSkillContainerStyle(skill: Cypress.Chainable<JQuery<HTMLElement>>) {
    skill
      .should("have.css", "list-style", "outside none none")
      .and("have.css", "position", "relative")
      .and("have.css", "display", "flex")
      .and("have.css", "flex-direction", "column")
      .and("have.css", "align-items", "center")
      .and("have.css", "justify-content", "flex-start")
      .and("have.css", "text-align", "center")
      .then(($container) => {
        expect($container).to.have.css("margin");
        expect($container).to.have.css("padding");
        expect($container).to.have.css("width");
        expect(parseFloat($container.css("width")))
          .to.be.lte(220)
          .and.to.be.gte(100);
        expect($container).to.have.css("aspect-ratio");
        expect($container)
          .to.have.css("color")
          .match(/rgb\(230, 255, 243\)/);
        expect($container)
          .to.have.css("background-color")
          .match(/rgba\(0, 142, 8, 0\.46\d+\)/);
        expect($container)
          .to.have.css("border")
          .match(/2\.\d+px solid rgb\(0, 0, 0\)/);
        expect($container).to.have.css("border-radius", "10px");
        expect($container).to.have.css("box-shadow");
        expect($container).to.have.css("overflow", "hidden");
        expect($container).to.have.css("transition");
        expect($container).to.have.css("font-size");
      });
  }

  testSkillChildrenStyle(skill: Cypress.Chainable<JQuery<HTMLElement>>) {
    skill.children().then(($children) => {
      cy.wrap($children)
        .eq(1)
        .then(($skillTitle) => {
          expect($skillTitle).to.have.css("margin");
          expect($skillTitle).to.have.css("text-align", "center");
          expect($skillTitle).to.have.css("font-size");
          expect(parseFloat($skillTitle.css("font-size")))
            .to.be.lte(30)
            .and.to.be.gte(12);
          expect($skillTitle).to.have.css("height");
          expect(parseFloat($skillTitle.css("height")))
            .to.be.lte(60)
            .and.to.be.gte(10);
        });

      cy.wrap($children)
        .eq(2)
        .then(($skillMeter) => {
          expect($skillMeter).to.have.css("position", "absolute");
          expect($skillMeter).to.have.css("bottom", "0px");
          expect($skillMeter).to.have.css("justify-content", "baseline");
          expect($skillMeter).to.have.css("margin-top");
          expect($skillMeter).to.have.css("width");
          expect($skillMeter).to.have.css("height");
          expect(parseFloat($skillMeter.css("height")))
            .to.be.lte(60)
            .and.to.be.gte(26.5);
          expect($skillMeter).to.have.css("font-size");
          expect(parseFloat($skillMeter.css("font-size")))
            .to.be.lte(46)
            .and.to.be.gte(18);
        });
    });
  }

  testSkillContainerInteraction(skill: Cypress.Chainable<JQuery<HTMLElement>>) {
    skill.then(($container) => {
      expect($container)
        .to.have.css("color")
        .match(/rgb\(230, 255, 243\)/);
      expect($container)
        .to.have.css("background-color")
        .match(/rgba\(0, 142, 8, 0\.46\d+\)/);
      expect($container).to.have.css("transform", "none");
    });

    skill.realHover({ position: "bottom", scrollBehavior: "center" });

    cy.wait(1000);
    skill.then(($container) => {
      expect($container)
        .to.have.css("color")
        .match(/rgb\(164, 255, 182\)/);
      expect($container)
        .to.have.css("background-color")
        .match(/rgb\(12, 43, 33\)/);
      expect($container).to.have.css("transform").to.not.equal("none");
    });
  }
}
