/// <reference types="cypress" />
export class MainPage{
    homeTop = cy.get("#homeIntro");
    homeDesctription = cy.get("#developerIntro");
    languages = cy.get("#development-languages");
    framework = cy.get("#development-frameworks");
    databases = cy.get("#development-databases");
    developerTools = cy.get("#developer-tools");
    socialSection = cy.get("#developerSocial");
}
