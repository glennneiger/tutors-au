const delay = 1000;

Cypress.Commands.add('toc', (userType, options = {}) => {
  cy.get('#toc').click({ force: true });
  cy.wait(delay);
});

Cypress.Commands.add('tocItem', (item, options = {}) => {
  cy.contains(item).click({ force: true });
  cy.toc();
  cy.wait(delay);
});

Cypress.Commands.add('home', (userType, options = {}) => {
  cy.get('#parent').click({ force: true });
  cy.wait(delay);
});

Cypress.Commands.add('talks', (userType, options = {}) => {
  cy.get('#talk').click({ force: true });
  cy.wait(delay);
});

Cypress.Commands.add('labs', (userType, options = {}) => {
  cy.get('#lab').click({ force: true });
  cy.wait(delay);
});

Cypress.Commands.add('videos', (userType, options = {}) => {
  cy.get('#video').click({ force: true });
  cy.wait(delay);
});

Cypress.Commands.add('github', (userType, options = {}) => {
  cy.get('#github').click({ force: true });
  cy.wait(delay);
});

Cypress.Commands.add('archives', (userType, options = {}) => {
  cy.get('#archive').click({ force: true });
  cy.wait(delay);
});
