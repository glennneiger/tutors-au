

it('Side Navigator', () => {
  // cy.visit('https://wit-tutors.github.io/#course/wit-tutors.github.io/tutors-starter-public/');
  cy.visit('http://localhost:8080/#course/wit-tutors.github.io/tutors-starter-public/');
  cy.toc();
  cy.tocItem('Simple');
  // cy.toc();
  // cy.tocItem('Lecture 1');
  // cy.toc();
  // cy.tocItem('Varied');
  // cy.toc();
  // cy.tocItem('Media');
  //cy.home();
  //cy.toc();
  cy.talks();
  cy.labs();
  cy.videos();
  cy.github();
  cy.archives();
  cy.tocItem('Units');
  cy.toc();
  cy.home();
  // cy.get("#talk").click({force: true});
  // cy.get("#lab").click();
  // cy.contains("Lab-01").click({force: true});
  // cy.go('back');

});
