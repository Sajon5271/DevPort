beforeEach(() => {
  cy.visit('/login');
});

describe('Can successfully sign up', () => {
  it("Should redirect to sign up on don't have an account click", () => {
    cy.get('[data-test="newAccount"]').click();
    cy.url().should('include', '/signup');
  });
  it('should be able to sign up with new info', () => {
    cy.get('[data-test="newAccount"]').click();
    cy.get('[data-test="signUpEmail"]').type('test@test.com');
    cy.get('[data-test="signUpPassword"]').type('test1234');
    cy.get('[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
  it('Should show an error when signing up with same email', () => {
    cy.get('[data-test="newAccount"]').click();
    cy.get('[data-test="signUpEmail"]').type('test@test.com');
    cy.get('[data-test="signUpPassword"]').type('test1234');
    cy.get('[type="submit"]').click();
    cy.get('[data-test="error"]').should('exist');
  });
  it('Should be able to login with the registered email and password', () => {
    cy.get('[data-test="loginEmail"]').type('test@test.com');
    cy.get('[data-test="loginPassword"]').type('test1234');
    cy.get('[data-test="loginButton"]').click();
    cy.url().should('include', '/dashboard');
  });
  it('Should show an error for wrong password', () => {
    cy.get('[data-test="loginEmail"]').type('test@test.com');
    cy.get('[data-test="loginPassword"]').type('test12345');
    cy.get('[data-test="loginButton"]').click();
    cy.get('[data-test="error"]').should('exist');
  });
});
