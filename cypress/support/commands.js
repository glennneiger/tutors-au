const delay = 500;

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
  cy.get('#talk').click();
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

Cypress.Commands.add('card', (index, selector, card, icon, options = {}) => {
  cy.get(selector).eq(index).should('contain', card.title);
  cy.get(selector).eq(index).should('contain', card.summary);
  if (card.img) {
    cy.get(selector).eq(index).find("img").should('have.attr', 'src', card.img);
  }
  if (card.video) {
    cy.get(selector).eq(index).find("iframe").should('have.attr', 'src', card.video);
  }
  cy.get(selector).eq(index).find("svg").should('have.class', icon);
});


Cypress.Commands.add('lo', (index, selector, lo, icon, options = {}) => {
  cy.get(selector).eq(index).should('contain', lo.title);
  cy.get(selector).eq(index).should('contain', lo.summary);
  if (lo.type == "panelvideo") {
    cy.get(selector).eq(index).find("iframe").should('have.attr', 'src', lo.video);
  }
  else {
    cy.get(selector).eq(index).find("img").should('have.attr', 'src', lo.img);
  }
  cy.get(selector).eq(index).find("svg").should('have.class', icon);
});
