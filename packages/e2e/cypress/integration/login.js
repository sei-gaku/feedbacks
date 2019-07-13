describe("Login", function() {
  it("Redirects to the login page, then to the employees page on login", function() {
    cy.fixture("users").then(users => {
      cy.visit("http://localhost:3000");

      cy.url().should("include", "/login");

      cy.get('[data-e2e="email"]').type(users.admin.email);
      cy.get('[data-e2e="password"]').type(users.admin.password);
      cy.get('[data-e2e="login"]').click();

      cy.url().should("include", "/employees");
    });
  });
});
