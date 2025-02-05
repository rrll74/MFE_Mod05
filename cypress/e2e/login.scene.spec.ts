describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.findByLabelText('Usuario *').as('user');
    cy.findByLabelText('Contraseña *').as('pass');
  });

  it('should user input has the focus when it clicks on it', () => {
    // Arrange

    // Act
    cy.get('@user').click();

    // Assert
    cy.get('@user').should('have.focus');
  });

  it('should password input has the focus when it clicks on it', () => {
    // Arrange

    // Act
    cy.get('@pass').click();

    // Assert
    cy.get('@pass').should('have.focus');
  });

  it('should allow login with valid credentials', () => {
    // Arrange

    // Act
    cy.get('@user').type('admin');
    cy.get('@pass').type('test');

    cy.get('button[type="submit"]').click();

    // Assert
    cy.url().should('include', '/submodule-list');
  });

  it('should display error message with invalid credentials', () => {
    // Arrange

    // Act
    cy.get('@user').type('admin');
    cy.get('@pass').type('1234');
    cy.get('button[type="submit"]').click();

    // Assert
    cy.findByRole('alert').should('be.visible');
  });

  it('should display error messages when fields are empty', () => {
    // Arrange

    // Act
    cy.get('button[type="submit"]').click();

    cy.findAllByRole('paragraph').as('errorList');

    // Assert
    cy.get('@errorList').its('length').should('be.at.least', 3);
    cy.get('@errorList').eq(0).should('exist');
    cy.get('@errorList').eq(1).should('exist');
  });
});
