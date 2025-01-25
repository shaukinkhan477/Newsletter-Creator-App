describe('MainContentComponent', () => {
  beforeEach(() => {
    // Visit the page before each test
    cy.visit('/'); // Adjust the URL as needed
  });

      it('should log in with valid credentials', () => {
        // Fill in the form and submit
        cy.get('input[name="email"]').type('test8example.com');
        cy.get('input[name="password"]').type('12345');
        cy.get('button[type="submit"]').click();

        // Verify the user is redirected to the dashboard
        cy.url().should('include', '/home');
        cy.contains('h1', 'Create New Post').should('be.visible');
      });

  it('should display the editor form', () => {
    // First, log in again or navigate to login
    cy.contains('Login').should('be.visible');
    cy.get('input#email').type('test8example.com');
    cy.get('input#password').type('12345');
    cy.contains('button', /login/i).click();
    // Verify the form fields are visible
    cy.get('input[name="title"]').should('be.visible');
    cy.get('input[name="subject"]').should('be.visible');
    cy.get('input[name="preheader"]').should('be.visible');
    cy.get('.tox-editor-container').should('be.visible'); // TinyMCE editor
  });

  it('should save a new post as a draft', () => {
    // First, log in again or navigate to login
    cy.contains('Login').should('be.visible');
    cy.get('input#email').type('test8example.com');
    cy.get('input#password').type('12345');
    cy.contains('button', /login/i).click();
    // Fill in the form
    cy.get('input[name="title"]').type('Test Post Title');
    cy.get('input[name="subject"]').type('Test Email Subject');
    cy.get('input[name="preheader"]').type('Test Preview Text');
    cy.get('.tox-editor-container').type('Test Content');

    // Click the "Save as Draft" button
    cy.contains('button', 'Save as Draft').click();

    // Verify the success message or navigation
    // cy.contains('Saved as draft!').should('be.visible');
  });

  it('should schedule a post', () => {
    // First, log in again or navigate to login
    cy.contains('Login').should('be.visible');
    cy.get('input#email').type('test8example.com');
    cy.get('input#password').type('12345');
    cy.contains('button', /login/i).click();
    // Fill in the form
    cy.get('input[name="title"]').type('Test Post Title');
    cy.get('input[name="subject"]').type('Test Email Subject');
    cy.get('input[name="preheader"]').type('Test Preview Text');
    cy.get('.tox-editor-container').type('Test Content');

    // Fill in the form
    cy.get('input[name="title"]').type('Test Post Title');
    cy.get('input[name="subject"]').type('Test Email Subject');
    cy.get('input[name="preheader"]').type('Test Preview Text');
    cy.get('.tox-editor-container').type('Test Content');

    // Click the "Schedule" button
    cy.contains('button', 'Schedule').click();

    // Verify the schedule modal is open
    // cy.get('app-schedule-modal').should('be.visible');

    // Select a date and time in the modal
    // cy.get('input[type="datetime-local"]').type('2023-12-31T23:59');
    // cy.contains('button', 'Schedule').click();

    // Verify the success message
    // cy.contains('Post scheduled for').should('be.visible');
  });

  // it('should send a post immediately', () => {
  //   // Fill in the form
  //   cy.get('input[name="title"]').type('Test Post Title');
  //   cy.get('input[name="subject"]').type('Test Email Subject');
  //   cy.get('input[name="preheader"]').type('Test Preview Text');
  //   cy.get('.tox-editor-container').type('Test Content');

  //   // Click the "Send Now" button
  //   cy.contains('button', 'Send Now').click();

  //   // Verify the success message
  //   cy.contains('Newsletter sent!').should('be.visible');
  // });

  // it('should display an error message when required fields are missing', () => {
  //   // Leave all fields empty and click "Send Now"
  //   cy.contains('button', 'Send Now').click();

  //   // Verify the error message
  //   cy.get('.error-box').should('be.visible').and('contain', 'Please fill out all required fields.');
  // });

  // it('should load an existing post in edit mode', () => {
  //   // Mock the API response for loading a post
  //   cy.intercept('GET', '/api/posts/123', {
  //     statusCode: 200,
  //     body: {
  //       post: {
  //         title: 'Existing Post Title',
  //         subject: 'Existing Email Subject',
  //         preheader: 'Existing Preview Text',
  //         content: 'Existing Content',
  //         schedule: null,
  //       },
  //     },
  //   }).as('loadPost');

  //   // Visit the edit page with a post ID
  //   cy.visit('/editor/123');

  //   // Wait for the post to load
  //   cy.wait('@loadPost');

  //   // Verify the form fields are populated
  //   cy.get('input[name="title"]').should('have.value', 'Existing Post Title');
  //   cy.get('input[name="subject"]').should('have.value', 'Existing Email Subject');
  //   cy.get('input[name="preheader"]').should('have.value', 'Existing Preview Text');
  //   cy.get('.tox-editor-container').should('contain', 'Existing Content');
  // });

  // it('should save changes to an existing post', () => {
  //   // Mock the API response for loading a post
  //   cy.intercept('GET', '/api/posts/123', {
  //     statusCode: 200,
  //     body: {
  //       post: {
  //         title: 'Existing Post Title',
  //         subject: 'Existing Email Subject',
  //         preheader: 'Existing Preview Text',
  //         content: 'Existing Content',
  //         schedule: null,
  //       },
  //     },
  //   }).as('loadPost');

  //   // Mock the API response for updating a post
  //   cy.intercept('PUT', '/api/posts/123', {
  //     statusCode: 200,
  //     body: { message: 'Post updated successfully' },
  //   }).as('updatePost');

  //   // Visit the edit page with a post ID
  //   cy.visit('/editor/123');

  //   // Wait for the post to load
  //   cy.wait('@loadPost');

  //   // Update the title
  //   cy.get('input[name="title"]').clear().type('Updated Post Title');

  //   // Click the "Save Changes" button
  //   cy.contains('button', 'Save Changes').click();

  //   // Wait for the update request
  //   cy.wait('@updatePost');

  //   // Verify the success message or navigation
  //   cy.contains('Post updated successfully').should('be.visible');
  // });
});
