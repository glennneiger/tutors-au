function allLos(lotype, course) {
  let allLos = [];
  course.los.forEach(topic => {
    allLos.push(...topic.los.filter(lo => lo.type == lotype));
    topic.los.forEach(lo => {
      if (lo.type == "unit") {
        allLos.push(...lo.los.filter(lo => lo.type == lotype));
      }
    });
  });
  return allLos;
}

let course = null;
let talks = null;
let labs = null;

describe("User page", () => {

  before(function() {
    cy.fixture("tutors").then(c => {
      course = c;
      talks = allLos("talk", course);
      labs = allLos("lab", course);
    });
  })

  beforeEach(function() {
    //cy.visit("https://wit-tutors.github.io/#course/wit-tutors.github.io/tutors-starter-public/");
    cy.visit("http://localhost:8080/#course/wit-tutors.github.io/tutors-starter-public/");
    //cy.visit("https://tutors.design/course/wit-tutors.github.io/tutors-starter-public/");
    //cy.visit("http://localhost:8080/#/course/wit-tutors.github.io/tutors-demo");
    //cy.visit("https://wit-tutors.github.io/#/course/wit-tutors.github.io/tutors-demo");
    //cy.visit("http://localhost:8080/#/course/wit-hdip-comp-sci-2019.github.io/web-development");
    //cy.visit (course.properties.courseurl);
  });

  it("HomePage", function() {
    for (let [i, topic] of course.los.entries()) {
      cy.lo(i, "card-deck card", topic);
    }
  });

   it("Topics", function() {
    for (let topic of course.los) {
      cy.contains(topic.title).click({ force: true });
      cy.wait(400);
      cy.carddeck(topic.los, "card-deck card");
      cy.videodeck(topic.los, "video-deck video-card");
      cy.unitdeck(topic.los);

    }
    cy.home();
  });

  it("Walls", function() {
    cy.talks();
    cy.wall(talks)
    cy.labs();
    cy.wall(labs)
  });
});
