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
      cy.card(i, "card-deck card", topic);
    }
  });

  it("Topics", function() {
    for (let [i, topic] of this.course.topics.entries()) {
      cy.contains(topic.title).click({ force: true });
      cy.wait(200);
      for (let deck of topic.decks) {
        for (let [j, card] of deck.cards.entries()) {
          if (deck.type == "unit-card") {
            cy.card(j, `.${card.type}`, card);
          } else {
            cy.card(j, `${deck.type} ${card.type}`, card);
          }
        }
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
