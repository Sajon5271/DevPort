beforeEach(() => {
  cy.visit('/');
});

describe('Homepage loads correctly', () => {
  it('Has right title', () => {
    cy.title().should('equal', 'DevPort');
  });
  it('Has rendered Hr and Dev buttons', () => {
    cy.get('[data-test="devButton"]').should('exist');
    cy.get('[data-test="hrButton"]').should('exist');
  });
});
