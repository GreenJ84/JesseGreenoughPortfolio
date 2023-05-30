/** @format */

/// <reference types="cypress" />

import {
  BASEURL,
  setupPageWithTheme,
  viewPortSetup,
  viewports,
} from "../support/e2e";
import { ExperiencePage } from "../page-objects/ExperiencePage";

const EXPURL = BASEURL + "/experience";
const expPage = new ExperiencePage();

let viewport = viewports[0];
// viewports.forEach(viewport => {
context("Experience Page is rendering correctly", () => {
  before(() => {
    viewPortSetup(viewport);
    setupPageWithTheme(EXPURL, "dark");
  });

  describe("Experience Page rendering", () => {
    beforeEach(() => { 
      expPage.toggleExperienceSections(0);
    })
    it("Page layout is rendering correctly", () => {
      expPage.pageContainer()
        .should("be.visible")
        .children()
        .should("have.length", 2)
        .then(($children) => {
          expect($children.eq(0)).to.be.visible;
          expect($children.eq(0)).to.have.id("experienceToggle")

          expect($children.eq(1)).to.be.visible;
          expect($children.eq(1)).to.have.id("educationContainer")
        })
    });

    it("Page container styling is correct", () => {
      expPage.pageContainer()
        .should("be.visible")
        .then(($main) => {
          expect($main).to.have.css("margin");
          expect($main).to.have.css("padding");
      })
    });

    it("Nav Buttons layout is correct", () => {
      expPage.experienceToggle()
        .should("be.visible")
        .children()
        .should("have.length", 2)
        .then(($children) => {
          expect($children.eq(0)).to.be.visible;
          expect($children.eq(0)).to.have.text("Education");

          expect($children.eq(1)).to.be.visible;
          expect($children.eq(1)).to.have.text("Work");
        });
    });

    it("Nav Buttons styling is correct", () => {
      expPage.experienceToggle()
        .should("be.visible")
        .children("button")
        .then(($children) => {
          for (let idx = 0; idx < $children.length; idx++) {
            // First button active styling
            expect($children.eq(idx)).to.have.css("display", "flex");
            expect($children.eq(idx)).to.have.css("justify-content", "center");
            expect($children.eq(idx)).to.have.css("padding");
            expect($children.eq(idx)).to.have.css("font-size");
            expect($children.eq(idx)).to.have.css("width");
            expect($children.eq(idx)).to.have.css("border-radius");
          }
        });
    });

    it("Page shifts sections correctly with the nav buttons", () => {
      expPage.educationContainer().should("be.visible");
      expPage.workContainer().should("not.exist");
      expPage.experienceToggle()
        .should("be.visible")
        .children()
        .then(($buttons) => {
          // First button active styling
          expect($buttons.eq(0)).to.have.css("color").match(/rgb\(255, 0, 0\)/);
          expect($buttons.eq(0)).to.have.css("box-shadow").match(/^(rgb\(247, 4, 4\)(\s-?\dpx){4}(,\s)?){4}/);
          expect($buttons.eq(0)).to.have.css("transform");
          
          // Second button not active styling
          expect($buttons.eq(1)).to.have.css("color").match(/^rgb\(0,\s255,\s13\)/);
          expect($buttons.eq(1)).to.have.css("background-color").match(/^rgb\(12,\s27,\s22\)/);
          expect($buttons.eq(1)).to.have.css("box-shadow").match(/^(rgb\(6, 255, 19\)(\s-?\dpx){4},\s){2}rgb\(0, 0, 0\)(\s-?\dpx){4}/);
        });
        
      expPage.experienceToggle().children("button").last().click();
      expPage.educationContainer().should("not.exist");
      expPage.workContainer().should("be.visible");

      expPage.experienceToggle()
          .should("be.visible")
          .children()
          .then(($buttons) => {
          // Toggle Experience 
          
          // First button not active styling
          expect($buttons.eq(0)).to.have.css("color").match(/^rgb\(0,\s+255,\s+13\)/);
          expect($buttons.eq(0)).to.have.css("background-color").match(/^rgb\(12,\s*27,\s*22\)/);
          expect($buttons.eq(0)).to.have.css("box-shadow").match(/^(rgb\(6, 255, 19\)(\s-?\dpx){4},\s){2}rgb\(0, 0, 0\)(\s-?\dpx){4}/);

          // Second button active styling
          expect($buttons.eq(1)).to.have.css("color").match(/^rgb\(255, 0, 0\)/);
          expect($buttons.eq(1)).to.have.css("box-shadow").match(/^(rgb\(247, 4, 4\)(\s-?\dpx){4}(,\s)?){4}/);
          expect($buttons.eq(1)).to.have.css("transform");
        });
    });
  });

  describe("Education experience rendering", () => {
    it("Education Layout is rendering correctly", () => {
      expPage.educationContainer().should("be.visible");
    });

    it("Section intro layout is correct", () => {
      expPage.educationInto().should("be.visible");
    });

    it("Section intro styling is correct", () => {
      expPage.educationInto().should("be.visible");
    });

    it("Degree subsection layout is rendering correct", () => {
      expPage.degreeContainer().should("be.visible");
    });

    it("Degree subsection styling is correct", () => {
      expPage.degreeContainer().should("be.visible");
    });

    it("Degree items layouts are rendering correct", () => {
      expPage.degreeList().should("be.visible");
    });

    it("Degree items styling is correct", () => {
      expPage.degreeList().should("be.visible");
    });

    it("Certifications layout is rendering correct", () => {
      expPage.certificateContainer().should("be.visible");
    });

    it("Certifications styling is correct", () => {
      expPage.certificateContainer().should("be.visible");
    });

    it("Certification items layouts are rendering correct", () => {
      expPage.certificationList().should("be.visible");
    });

    it("Certification items styling is correct", () => {
      expPage.certificationList().should("be.visible");
    });

    it("Certifications filtering works correctly", () => {
      expPage.certificationFilter().should("be.visible");
    });
  });

  // describe("Work experience rendering", () => {
  //   before(() => { 
  //     expPage.experienceToggle().children("button").last().click();
  //   })
  //   it("Work Layout is rendering correctly", () => {
  //     expPage.workContainer().should("be.visible");
  //   });

  //   it("Section intro layout is correct", () => {
  //     expPage.workInto().should("be.visible");
  //   });

  //   it("Section intro styling is correct", () => {
  //     expPage.workInto().should("be.visible");
  //   });

  //   it("Work List layout is rendering correct", () => {
  //     expPage.workList().should("be.visible");
  //   });

  //   it("Work List styling is correct", () => {
  //     expPage.workList().should("be.visible");
  //   });

  //   it("Work item layouts are rendering correct", () => {
  //     expPage.workList().should("be.visible");
  //   });

  //   it("Work item styling is correct", () => {
  //     expPage.workList().should("be.visible");
  //   });

  //   it("Work filtering works correctly", () => {
  //     expPage.workToggle().should("be.visible");
  //   });
  // });
  // })
});
