//
// Testing Code
//
describe("Navigation", () => {
  it("should navigate to Tuesday", () => {
    // Arrange
    cy.visit("/");

    // Act & Assert
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
