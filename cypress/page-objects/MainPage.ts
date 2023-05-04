/// <reference types="cypress" />
export class MainPage{
    homeTop = cy.get("#home");
    homeDesctription = cy.get("#homeAboutDescription");
    languages = cy.get("#development-languages");
    framework = cy.get("#development-frameworks");
    databases = cy.get("#development-databases");
    developerTools = cy.get("#developer-tools");
    socialSection = cy.get("#homeAboutSocial");
}
