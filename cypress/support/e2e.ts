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
import './commands'
export const BASEURL = "http://localhost:3000/";
export interface Viewport{
    width: number;
    height: number;
}
export type VIEW = Viewport | string;
export const viewports: VIEW[] = [
// Desktop viewports
{ width: 1366, height: 768 },  // Windows
{ width: 1440, height: 900 },  // macOS
{ width: 1920, height: 1080 }, // Windows/macOS
{ width: 2560, height: 1440 }, // macOS
// Tablet viewports
{ width: 1024, height: 768 },  // iPad (Landscape)
"ipad-2",
// Mobile viewports
"iphone-6",
"iphone-8",
{ width: 414, height: 736 },   // iPhone 6/7/8 Plus (or equivalent)
];

export { };