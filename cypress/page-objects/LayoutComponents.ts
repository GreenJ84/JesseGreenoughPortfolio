
export class LayoutComps {
    preload: Function;
    navbar: Function;
    brand: Function;
    collapse: Function;
    toggle: Function;
    footer: Function;

    constructor() {
        this.preload = () => { 
            cy.get("#navbar")
        }
        this.navbar = () => {
            cy.get("#navbar")
        }
        this.brand = () => {
            cy.get("#navbarBrand")
        }
        this.collapse = () => {
            cy.get("#responsive-navbar-nav")
        }
        this.toggle = () => {
            cy.get("#navbarToggle")
        }
        this.footer = () => {
            cy.get("#footer")
        }
    }

}