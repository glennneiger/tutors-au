describe("User page", () => {
  beforeEach(function() {
    //cy.visit("https://wit-tutors.github.io/#course/wit-tutors.github.io/tutors-starter-public/");
    cy.visit("http://localhost:8080/#course/wit-tutors.github.io/tutors-starter-public/");
    cy.fixture("course").then(course => {
      this.course = course;
    });
  });

   it("HomePage", function() {
    for (let [i, topic] of this.course.topics.entries()) {
      cy.card(i, topic, "card-deck");
    }
  });

  it("Topics", function() {
    for (let [i, topic] of this.course.topics.entries()) {
      cy.contains(topic.title).click({ force: true });
      cy.wait(200);
      for (let [j, lo] of topic.los.entries()) {
        cy.card(j, lo, "card-deck");
        //cy.contains(lo).click({ force: true });
      }
      cy.home();
    }
  });

  // it("Simple", function() {
  //   cy.contains("Simple").click({force:true});
  //   cy.card(0, this.course.simple.los[0]);
  // });

  // it("Walls", function() {
  //   cy.talks();
  //   cy.labs();
  //   cy.videos();
  //   cy.github();
  //   cy.archives();
  //   cy.tocItem('Units');
  //   cy.toc();
  //   cy.home();
  // });
});
