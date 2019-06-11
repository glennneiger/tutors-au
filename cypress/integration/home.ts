context("Home", () => {
  beforeEach(() => {
    //cy.visit("https://wit-tutors.github.io/#course/wit-tutors.github.io/tutors-starter-public/");
    cy.visit("http://localhost:8080/#course/wit-tutors.github.io/tutors-starter-public/");
  });

  const simple = {
    title: "Simple",
    summary: "Just lectures and labs",
    img: "https://wit-tutors.github.io/tutors-starter-public//topic-01-simple/topic.jpg"
  };

  const varied = {
    title: "Varied",
    summary: "Lectures & labs + archive and github repos",
    img: "https://wit-tutors.github.io/tutors-starter-public//topic-02-varied/topic.jpg"
  };

  const media = {
    title: "Media",
    summary: "Include 2 type of videos",
    img: "https://wit-tutors.github.io/tutors-starter-public//topic-03-media/topic.jpg"
  };

  const units = {
    title: "Units",
    summary: "This topic has 3 units - each unit has lectures + lab",
    img: "https://wit-tutors.github.io/tutors-starter-public//topic-04-units/topic.jpg"
  };

  it("HomeContents", () => {
    cy.card(0, simple);
    cy.card(1, varied);
    cy.card(2, media);
    cy.card(3, units);

  });

  it("SimpleContents", () => {
  });

  it("VariedContents", () => {
  });

});
