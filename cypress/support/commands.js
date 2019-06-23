const icons = {
  topic: "fa-sitemap",
  talk: "fa-object-group",
  lab: "fa-flask",
  video: "fa-youtube",
  panelvideo: "fa-youtube",
  archive: "fa-file-archive",
  github: "fa-github",
  web: "fa-bookmark"
};

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

Cypress.Commands.add('wall', (los, options = {}) => {
  for (let [i, lo] of los.entries()) {
    cy.lo(i, "card", lo);
  }
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
  cy.get(selector).eq(index).find("svg").should('have.class', icons[lo.type]);
});

Cypress.Commands.add('carddeck', (los, selector, options = {}) => {
  const carddeck = los.filter(lo => lo.type != "panelvideo" && lo.type != "unit");
  for (let [i, lo] of carddeck.entries()) {
    cy.lo(i, selector, lo);
  }
});

Cypress.Commands.add('videodeck', (los, selector, options = {}) => {
  const videodeck = los.filter(lo => lo.type == "panelvideo");
  for (let [i, lo] of videodeck.entries()) {
    cy.lo(i, selector, lo);
  }
});

Cypress.Commands.add('unitdeck', (los, selector, options = {}) => {
  const unitdeck = los.filter(lo => lo.type == "unit");
  for (let unit of unitdeck) {
    cy.carddeck(unit.los, `#${unit.id} card`);
    cy.videodeck(unit.los, `#${unit.id} video-card`);
  }
});

