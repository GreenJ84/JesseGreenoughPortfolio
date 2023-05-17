/** @format */

/// <reference types="cypress" />

const PARAGRAPH_SNIPPETS = [
  [
    "I was born and raise in the border city of El Paso, Texas.",
    "which is where my fascination with nature (GREEN-ery => GREEN-ough 🤣)",
    "big parts of my identity to this day.",
  ],
  [
    "attended a Running Start focused high school",
    "receive my Associates degree my junior year of high school",
    "introduced to coding for the first time throught the robotics club",
  ],
  [
    "College ended up being one of the hardest times of my life.",
    "In my second semester of college my father's mental health deteriorated",
    "a very unstable environment for me mentally",
  ],
  [
    "only forseeable option to start earning towards paying off accumulated debt.",
    "from starting positions to lead positions",
    "blessed with a beautiful daughter",
  ],
  [
    "kept learning bits and pieces of code here and there",
    "a Full-stack Software Developer across multiple stacks",
    "continuously been increasing my knowledge",
  ],
];

export class AboutPage {
  aboutMain: Function;
  aboutIntro: Function;
  aboutDetail: Function;

  constructor() {
    this.aboutMain = () => {
      return cy.get("#aboutMain");
    };
    this.aboutIntro = () => {
      return cy.get("#aboutIntro");
    };
    this.aboutDetail = () => {
      return cy.get("#aboutDetail");
    };
  }

  testIntroListItem(item: Cypress.Chainable<JQuery<HTMLElement>>) {
    item
      .should("have.css", "list-style", "outside none none")
      .and("have.css", "margin-bottom", "10px")
      .and("have.css", "color", "rgb(0, 255, 13)");

    item
      .children()
      .first()
      .should("have.attr", "viewBox", "0 0 16 16")
      .then(($elem) => {
        expect($elem).to.have.attr("width");
        expect($elem).to.have.attr("height");
      });

    item.should("contain.text", "");
  }

  testDetailParagraphsStyle(
    para: Cypress.Chainable<JQuery<HTMLParagraphElement>>
  ) {
    para
      .should("have.css", "position", "relative")
      .should("have.css", "color", "rgb(206, 255, 208)")
      .then(($para) => {
        expect($para).to.have.css("margin");
        expect($para).to.have.css("text-indent");
      });
  }

  testDetailParagraphText(
    div: Cypress.Chainable<JQuery<HTMLParagraphElement>>
  ) {
    div.children("p").then(($p) => {
      for (let i = 0; i < 5; i++) {
        for (let desc of PARAGRAPH_SNIPPETS[i]) {
          expect($p.eq(i).text()).to.include(desc);
        }
      }
    });
  }
}
