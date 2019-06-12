
describe("User page", () => {
  beforeEach(function() {
    cy.visit("https://wit-tutors.github.io/#course/wit-tutors.github.io/tutors-starter-public/");

    cy.fixture("course").then(course => {
      this.course = course;
    });
  });


  it("HomePage", function() {
    cy.card(0, this.course.simple);
    cy.card(1, this.course.varied);
    cy.card(2, this.course.media);
    cy.card(3, this.course.units);
  });

  it("Walls", function() {
    cy.talks();
    cy.labs();
    cy.videos();
    cy.github();
    cy.archives();
    cy.tocItem('Units');
    cy.toc();
    cy.home();
  });

});

