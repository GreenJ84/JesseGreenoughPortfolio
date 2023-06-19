/** @format */

declare module "*.pdf";
declare module "*.txt";
declare module "*.html";
declare namespace Cypress {
  interface Chainable<Subject = any> {



    // Education Page
    getDegreeImg(): Chainable<JQuery<HTMLImageElement>>;
    getDegreeCard(): Chainable<JQuery<HTMLDivElement>>;
  }
}