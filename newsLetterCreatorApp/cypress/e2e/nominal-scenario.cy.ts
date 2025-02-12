describe('Nominal Scenario: Signup, Login, Subscribers, Create Post, Logout', () => {
  it('should handle the entire flow end-to-end', () => {
    // 1) Go to /signup
    cy.visit('/signup');

    // Fill in sign-up form
    cy.get('input[name="email"]').type('myNewUser@example.com');
    cy.get('input[name="password"]').type('password123');
    // If you have a "Confirm Password" or "Name" field, fill that too
    cy.get('input[name="name"]').type('Test User');
    cy.contains('button', /sign up/i).click();

    // 2) Now go to /login (or maybe your app automatically redirects)
    cy.visit('/login');

    // 3) Log in with same credentials
    cy.get('input[name="email"]').type('myNewUser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.contains('button', /login/i).click();

    // 4) Verify redirect to /home
    cy.url().should('include', '/home');

    // 5) Go to /subscribers
    cy.visit('/subscribers');
    // Add 3 subscribers
    const emails = [
      'benyakoub.pro@gmail.com',
      'benyakoub.fr@gmail.com',
      'ben94med@gmail.com',
    ];
    const names = ['User1', 'User2', 'User3'];

    emails.forEach((email, idx) => {
      cy.get('input[placeholder="Subscriber Email"]').clear().type(email);
      cy.get('input[placeholder="Subscriber Name"]').clear().type(names[idx]);
      cy.contains('button', /add subscriber/i).click();
      // Optionally check success message or table row
      // e.g. cy.contains('.success', 'Subscriber added successfully!').should('be.visible');
    });

    // 6) Navigate back to /home
    cy.visit('/home');

    // 7) Create a new post and send it
    // Fill out required fields
    cy.get('input[name="title"]').type('My Cypress Post');
    cy.get('input[name="subject"]').type('Test Subject');
    cy.get('input[name="preheader"]').type('Test Preheader');
    // If using TinyMCE or similar, adapt to your real selectors
    // Step 1: Find the iframe
    cy.get('iframe.tox-edit-area__iframe') // adapt to your real iframe selector
      .should('exist')
      .then(($iframe) => {
        // Step 2: get the iframe's body
        const $body = $iframe.contents().find('body');
        // Step 3: wrap the body so we can type into it
        cy.wrap($body)
          .clear() // if needed
          .type('This is the content of my newsletter post from Cypress!');
      });

    // Click "Send Now" (assuming a button with text "Send Now")
    cy.contains('button', /send now/i).click();

    // Optional: Check for success alert or message
    cy.on('window:alert', (text) => {
      expect(text).to.include('Newsletter sent');
    });

    // 8) Logout
    // If your app has a logout button or link
    cy.visit('/profile');
    cy.contains('button', /logout/i).click();
    // Or cy.get('button.logout').click();

    // Confirm we are back at /login or /...
    cy.url().should('include', '/login');
  });
});
