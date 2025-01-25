describe('Login Page', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('/login');
  });

  it('should display the login form', () => {
    // Check if the form elements are visible
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });


  it('should show an error message with invalid credentials', () => {
    // Fill in the form with invalid credentials
    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    // Verify the error message is displayed
    cy.get('.error-message')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });

    it('should log in with valid credentials', () => {
      // Fill in the form and submit
      cy.get('input[name="email"]').type('test8example.com');
      cy.get('input[name="password"]').type('12345');
      cy.get('button[type="submit"]').click();

      // Verify the user is redirected to the dashboard
      cy.url().should('include', '/home');
    });

});
