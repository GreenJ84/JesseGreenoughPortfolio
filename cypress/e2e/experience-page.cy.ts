/// <reference types="cypress" />

import { BASEURL, setupPageWithTheme, viewPortSetup, viewports } from "../support/e2e";
import { ExperiencePage } from "../page-objects/ExperiencePage";

const EXPURL = BASEURL + "/experience";

context("Experience Page is rendering correctly", () => {
    before(() => {
        let expPage = new ExperiencePage();
    })

    let viewport = viewports[0];
    // viewports.forEach(viewport => { 

    describe("Experience Page is rendering correctly", () => {
        before(() => { viewPortSetup(viewport) })
        beforeEach(() => { setupPageWithTheme(EXPURL, "dark")} )

        it("Experience Page is rendering correctly", () => { });
    })
    // })
});