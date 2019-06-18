function allLos(lotype, course) {
  let allLos = [];
  course.topics.forEach(topic => {
    topic.decks.forEach(deck => {
      deck.cards.forEach(card => {
        if (card.type === lotype) {
          allLos.push(card);
        }
      });
    });
  });
  return allLos;
}

describe("User page", () => {
  beforeEach(function() {
    //cy.visit("https://wit-tutors.github.io/#course/wit-tutors.github.io/tutors-starter-public/");
    //cy.visit("http://localhost:8080/#course/wit-tutors.github.io/tutors-starter-public/");
    cy.visit("https://tutors.design/course/wit-tutors.github.io/tutors-starter-public/");
    cy.fixture("course").then(course => {
      this.course = course;
      this.talks = allLos("talk", this.course);
      this.labs = allLos("lab", this.course);
    });

    cy.fixture("maps").then(maps => {
      this.maps = maps;
    })
  });

  it("HomePage", function() {
    for (let [i, topic] of this.course.topics.entries()) {
      cy.card(i, "card-deck card", topic, this.maps.icons["topic"]);
    }
  });

  it("Topics", function() {
    for (let [i, topic] of this.course.topics.entries()) {
      cy.contains(topic.title).click({ force: true });
      cy.wait(200);
      for (let deck of topic.decks) {
        for (let [j, card] of deck.cards.entries()) {
          if (deck.type == "unit-card") {
            cy.card(j, deck.selector, card, this.maps.icons[card.type]);
          } else {
           // cy.card(j, `${deck.type} ${card.cardType}`, card, this.maps.icons[card.type]);
            const cardType = this.maps.cards[card.type];
            cy.card(j, `${deck.type} ${cardType}`, card, this.maps.icons[card.type]);
          }
        }
      }
      cy.home();
    }
  });

  it("Reader", function() {
    cy.contains('Units').click({ force: true });
    cy.wait(400);
    cy.contains('Lecture 6').click({ force: true });
    cy.wait(400);
    cy.contains('Lecture 6').click({ force: true });
    cy.wait(500);
    cy.contains('Lecture 11').click({ force: true });
  });

  it("Walls", function() {
    cy.talks();
    for (let [i, talk] of this.talks.entries()) {
      cy.card(i, "card", talk, this.maps.icons["talk"]);
    }
    cy.labs();
    for (let [i, lab] of this.labs.entries()) {
      cy.card(i, "card", lab, this.maps.icons["lab"]);
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
