describe('Newsletter Creator App', () => {
  beforeEach(() => {
    // Visit the base URL (http://localhost:4200 by default)
    cy.visit('/');
  });

  it('should display login page and perform login', () => {
    // Assuming the login page is the root or you redirect to /login
    // Check for login form
    cy.contains('Login').should('be.visible');

    // Fill in credentials (replace with real test credentials)
    cy.get('input#email').type('test8example.com');
    cy.get('input#password').type('12345');

    // Submit
    cy.contains('button', /login/i).click();

    // Check for success: maybe we land on a home or dashboard page
    cy.contains('Welcome Back').should('not.exist'); // login form gone
    // or check an element that only appears after login
    cy.contains('Create New Post').should('be.visible');
  });

  it('should create a new post as draft', () => {
    // We assume the user is now logged in from before, or you can do
    // a login step again. For reliability, we might log in programmatically.
    // First, log in again or navigate to login
    cy.contains('Login').should('be.visible');
    cy.get('input#email').type('test8example.com');
    cy.get('input#password').type('12345');
    cy.contains('button', /login/i).click();

    // Click "Create New Post" or navigate if needed
    // If the main content is at '/create', do something like:
    // cy.visit('/create');

    // Fill out the newsletter form
    cy.get('input[name="title"]').type('My Cypress Test Post');
    cy.get('input[name="subject"]').type('Test Subject');
    cy.get('input[name="preheader"]').type('Test Preheader');

    // Type in the editor (TinyMCE or similar)
    // If you're using the default tinymce Angular wrapper, you might
    // have to manipulate the iframe or the content. For demonstration:
    cy.get('iframe.to-tinymce-iframe-selector') // figure out the correct iframe
      .then(($iframe) => {
        const doc = $iframe.contents().find('body');
        cy.wrap(doc).clear().type('This is a test content from Cypress!');
      });

    // Click "Save as Draft"
    cy.contains('button', /save as draft/i).click();

    // Check for a success message or newly created draft
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Saved as draft');
    });
  });

  it('should schedule a post', () => {
    // Fill out the form like above, or if you do it from scratch:
    cy.get('input[name="title"]').type('Scheduled Post');
    cy.get('input[name="subject"]').type('Scheduled Subject');
    cy.get('input[name="preheader"]').type('Scheduled Preheader');

    // Editor content ...
    cy.get('iframe.to-tinymce-iframe-selector').then(($iframe) => {
      const doc = $iframe.contents().find('body');
      cy.wrap(doc).clear().type('Scheduled content...');
    });

    // Click "Schedule" -> open modal
    cy.contains('button', /schedule/i).click();

    // The schedule modal appears, fill out datetime
    cy.get('input[type="datetime-local"]').type('2025-01-01T10:00');

    // Confirm schedule
    cy.contains('button', /schedule/i).click();

    // Check for success alert or message
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Post scheduled');
    });
  });
});
