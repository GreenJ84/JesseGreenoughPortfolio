/** @format */

// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import "cypress-real-events";
export interface Viewport {
  width: number;
  height: number;
}
export type VIEW = Viewport | string;

export const BASEURL = "http://localhost:3000";
export const viewports: VIEW[] = [
  // Desktop viewports
  { width: 1366, height: 768 }, // Windows
  { width: 1920, height: 1080 }, // Windows/macOS
  { width: 2560, height: 1440 }, // macOS
  // Tablet viewports
  "ipad-2",
  { width: 1024, height: 768 }, // iPad (Landscape)
  // Mobile viewports
  "iphone-8",
  { width: 414, height: 736 }, // iPhone 6/7/8 Plus (or equivalent)
];

export const viewPortSetup = (viewport: VIEW) => {
  cy.log(
    `Viewport set to: ${
      typeof viewport == "string"
        ? viewport
        : `${viewport.width} x ${viewport.height}`
    }`
  );
  if (typeof viewport === "string") {
    cy.viewport(viewport as Cypress.ViewportPreset).then(() =>
      cy.window().trigger("resize")
    );
  } else {
    cy.viewport(viewport.width, viewport.height).then(() =>
      cy.window().trigger("resize")
    );
  }
};

export const viewportDisplay = (viewport: VIEW): string => { 
  if (typeof viewport == "string") {
    return viewport
  } else {
    return `${viewport.width} x ${viewport.height}`
  }
}

export const setupPageWithTheme = (url: string, type: string) => {
  cy.visit(url, {
    onBeforeLoad(win) {
      cy.stub(win, "matchMedia")
        .withArgs(`(prefers-color-scheme: ${type})`)
        .returns({
          matches: true,
        });
    },
  });
};

export const getWindowInnerWidth = (): Cypress.Chainable<number> => {
  
  return cy.window().then((win) => {
    const width = win.innerWidth
    expect(width).to.be.greaterThan(0);
    return width;
  });
};

export const getOddEven = (): number => { 
  return Math.floor(Math.random() * 1000) % 2;
}