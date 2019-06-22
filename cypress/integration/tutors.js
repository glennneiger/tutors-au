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

function cardDeck(topic, icons) {
  const los = topic.los.filter (lo=> lo.type != "panelvideo" && lo.type != "unit");
  for (let [i, lo] of los.entries()) {
    cy.lo(i, "card-deck card", lo, icons[lo.type]);
  }
}

function videoDeck(topic, icons) {
  const los = topic.los.filter (lo=> lo.type == "panelvideo");
  for (let [i, lo] of los.entries()) {
    cy.lo(i, "video-deck video-card", lo, icons[lo.type]);
  }
}

function unitDeck(topic, icons) {
  const units = topic.los.filter (lo=> lo.type == "unit");
  for (let unit of units) {
    for (let [i, lo] of unit.los.entries()) {
      cy.lo(i, `#${unit.id} card`, lo, icons[lo.type]);
    }
  }
}

function wall(los, type, icons) {
  for (let [i, lo] of los.entries()) {
    cy.lo(i, "card", lo, icons[type]);
  }
}

describe("User page", () => {
  beforeEach(function() {
    //cy.visit("https://wit-tutors.github.io/#course/wit-tutors.github.io/tutors-starter-public/");
    cy.visit("http://localhost:8080/#course/wit-tutors.github.io/tutors-starter-public/");
    //cy.visit("https://tutors.design/course/wit-tutors.github.io/tutors-starter-public/");
    cy.fixture("tutors").then(course => {
      this.course = course;
      this.talks = allLos("talk", this.course);
      this.labs = allLos("lab", this.course);
    });

    cy.fixture("assets").then(assets => {
      this.assets = assets;
    });
  });

  // it("HomePage", function() {
  //   for (let [i, topic] of this.course.los.entries()) {
  //     cy.lo(i, "card-deck card", topic, this.assets.icons["topic"]);
  //   }
  // });
  //
  // it("Topics", function() {
  //   for (let topic of this.course.los) {
  //     cy.contains(topic.title).click({ force: true });
  //     cy.wait(500);
  //     cardDeck(topic, this.assets.icons);
  //     videoDeck(topic, this.assets.icons);
  //     unitDeck(topic, this.assets.icons);
  //   }
  //   cy.home();
  // });

  it("Walls", function() {
    cy.talks();
    wall(this.talks, "talk", this.assets.icons);
    cy.labs();
    wall(this.labs, "lab", this.assets.icons);
  });
});
