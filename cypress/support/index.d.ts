declare namespace Cypress {
  interface Chainable<Subject> {

    home(): Chainable<any>
    tocItem(item:String): Chainable<any>
    toc(): Chainable<any>
    talks(): Chainable<any>
    labs(): Chainable<any>
    videos(): Chainable<any>
    archives(): Chainable<any>
    github(): Chainable<any>

  }
}
