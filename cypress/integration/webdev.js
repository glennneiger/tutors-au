describe("User page", () => {
  beforeEach(function() {
    cy.visit("https://wit-tutors.github.io/#course/wit-hdip-comp-sci-2019.github.io/web-development/");
    cy.fixture("webdev").then(webdev => {
      this.course = webdev;
    });
  });

  // it("HomePage", function() {
  //   for (let i = 0; i < this.course.topics.length; i++) {
  //     const topic = this.course.topics[i];
  //     const card = {
  //       title: topic.title,
  //       summary: topic.objectivesMd,
  //       icon: "fa-sitemap",
  //       img: this.course.courseUrl + topic.folder + topic.img
  //     };
  //     cy.card(i, card);
  //   }
  // });

  it("Topic0", function() {
    const topic = this.course.topics[0];
    cy.contains(topic.title).click({ force: true });
    cy.wait(1000);
    const los = topic.los;
    for (let i = 0; i < los.length; i++) {
      const lo = los[i];
      if (lo.type == "unit") {
        for (let j = 0; j < lo.los.length; j++) {
          const sublo = lo.los[j];
          const card = {
            title: sublo.title,
            summary: sublo.objectivesMd,
            //icon: "fa-sitemap",
            //img: this.course.courseUrl + topic.folder + topic.img
          };
          cy.card(j, card);
        }
      }
    }
  });

  // it("Walls", function() {
  //   cy.talks();
  //   cy.labs();
  //   cy.videos();
  //   cy.github();
  //   cy.archives();
  //   //cy.toc();
  //   cy.home();
  // });
});
