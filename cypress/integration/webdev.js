describe("User page", () => {
  beforeEach(function() {
    cy.visit("https://wit-tutors.github.io/#course/wit-hdip-comp-sci-2019.github.io/web-development/");

    cy.fixture("webdev").then(webdev => {
      this.course = webdev;
    });
  });


  it("HomePage", function() {

    for (let i=0; i < this.course.topics.length; i++) {
      const topic = this.course.topics[i];
      const card = {
        title: topic.title,
        summary: topic.objectives,
        icon : "fa-sitemap",
        img: this.course.courseUrl + topic.folder + topic.img
      }
      cy.card(i, card);
    }
  });



});

