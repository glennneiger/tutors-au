const delay = 400;

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

Cypress.Commands.add('card', (index, selector, card, options = {}) => {
  cy.get(selector).eq(index).should('contain', card.title);
  cy.get(selector).eq(index).should('contain', card.summary);
  if (card.img) {
    cy.get(selector).eq(index).find("img").should('have.attr', 'src', card.img);
  }
  if (card.video) {
    cy.get(selector).eq(index).find("iframe").should('have.attr', 'src', card.video);
  }
  cy.get(selector).eq(index).find("svg").should('have.class', card.icon);
});

// Cypress.Commands.add('card', (index, container, card, options = {}) => {
//   cy.get(`${container} ${card.card}`).eq(index).should('contain', card.title);
//   cy.get(`${container} ${card.card}`).eq(index).should('contain', card.summary);
//   if (card.img) {
//     cy.get(`${container} ${card.card}`).eq(index).find("img").should('have.attr', 'src', card.img);
//   }
//   if (card.video) {
//     cy.get(`${container} ${card.card}`).eq(index).find("iframe").should('have.attr', 'src', card.video);
//   }
//   cy.get(`${container} ${card.card}`).eq(index).find("svg").should('have.class', card.icon);
// });
