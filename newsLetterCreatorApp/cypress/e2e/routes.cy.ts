// cypress/e2e/routes.cy.ts

describe('Route tests with AuthGuard', () => {
  const validEmail = 'test8example.com';
  const validPassword = '12345';

  beforeEach(() => {
    // Each test starts by visiting the base URL
    cy.visit('/');
  });

  it('redirects to /login when hitting an AuthGuard route without auth', () => {
    // Attempt to visit an auth-protected route, e.g. /home
    cy.visit('/home');
    // We expect the user to be redirected to /login
    cy.url().should('include', '/login');
  });

  it('allows access to /login and /signup without authentication', () => {
    // Check /login
    cy.visit('/login');
    cy.contains('Login').should('exist');

    // Check /signup
    cy.visit('/signup');
    cy.contains('Sign Up').should('exist');
  });

  it('logs in and can access /home (AuthGuard route)', () => {
    // 1) Go to /login
    cy.visit('/login');
    cy.url().should('include', '/login');

    // 2) Fill the login form
    cy.get('#email').type(validEmail);
    cy.get('#password').type(validPassword);
    cy.contains('button', /login/i).click();

    // 3) After valid login, we expect the user to be redirected
    // possibly to /home or wherever your app goes by default
    // Let's assume it navigates to /home
    cy.url().should('include', '/home');
    cy.contains('Create New Post').should('exist');
  });

  it('after login, can navigate to other protected routes', () => {
    // We'll do the login steps again in this test, or you can set up a shared login approach
    cy.visit('/login');
    cy.get('#email').type(validEmail);
    cy.get('#password').type(validPassword);
    cy.contains('button', /login/i).click();
    cy.url().should('include', '/home');

    // 1) Go to /posts
    cy.visit('/posts');
    cy.contains('Posts').should('exist');

    // 2) Go to /analytics
    cy.visit('/analytics');
    cy.contains('Analytics Dashboard').should('exist');

    // 3) Go to /subscribers
    cy.visit('/subscribers');
    cy.contains('Subscribers').should('exist');
  });

  it('tries to access /reset-password/:token without login, gets redirected', () => {
    // We'll simulate visiting a reset link
    cy.visit('/reset-password/someFakeToken');
    // Expect redirect to /login if user is not authenticated
    cy.url().should('include', '/login');
  });

  // etc. You can add more tests for forgot-password, profile, etc.
});
