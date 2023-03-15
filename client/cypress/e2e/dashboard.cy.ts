beforeEach(() => {
  cy.visit('/login');
  cy.get('[data-test="loginEmail"]').type('test@test.com');
  cy.get('[data-test="loginPassword"]').type('test1234');
  cy.get('[data-test="loginButton"]').click();
});
describe('Dashboard Input tests', () => {
  it('should contain the email already', () => {
    cy.get('[data-test="userEmail"]').should('have.value', 'test@test.com');
  });
  it('Should be able to add and remove skills', () => {
    cy.get('[data-test="userSkills"]').type('Java');
    cy.get('[data-test="btnAddSkill"]').click();
    cy.get('[data-test="userSingleSkill"]').should('contain.text', 'Java');
    cy.get('[data-test="userSingleSkill"]').click();
    cy.get('[data-test="userSingleSkill"]').should('not.exist');
  });
  // it('Should be able to input all data', () => {});
});
