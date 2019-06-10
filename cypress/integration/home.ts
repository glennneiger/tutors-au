context("Home", () => {
  beforeEach(() => {
    //cy.visit("https://wit-tutors.github.io/#course/wit-tutors.github.io/tutors-starter-public/");
    cy.visit("http://localhost:8080/#course/wit-tutors.github.io/tutors-starter-public/");
  });

  it("HomeContents", () => {
    cy.contains("Simple");
    cy.contains("Just lectures and labs");
    cy.contains("Varied");
    cy.contains("Lectures & labs + archive and github repos");
    cy.contains("Media");
    cy.contains("Include 2 type of videos");
    cy.contains("Units");
    cy.contains("This topic has 3 units - each unit has lectures + lab");
  });

  it("SimpleContents", () => {
    cy.contains("Simple").click({ force: true });
    cy.contains("Lecture 1");
    cy.contains(
      "A short summary of the talk, no more than two sentences. Avoid bullet points or links for formatting reasons."
    );
    cy.contains("Lecture 2");
    cy.contains("The summary can indicate the lecture objectives of contents.");
    cy.contains("Lab-01");

    cy.contains("Lecture 1").click({ force: true });
  });

  it("VariedContents", () => {
    cy.contains("Varied").click({ force: true });
    cy.contains("Lecture 3");
    cy.contains(
      "A short summary of the talk, no more than two sentences. Avoid bullet points or links for formatting reasons."
    );
  });
});
