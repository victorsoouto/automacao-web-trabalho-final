// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add("login", (email, password) => {
    cy.visit("/login");

    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(password);
    cy.get('[data-qa="login-button"]').click();
});

Cypress.Commands.add("logout", () => {
    cy.get('a[href="/logout"]').click();
});

Cypress.Commands.add("registerUser", (user) => {
    cy.visit("/login");

    cy.get('[data-qa="signup-name"]').type(user.name);
    cy.get('[data-qa="signup-email"]').type(user.email);
    cy.get('[data-qa="signup-button"]').click();

    cy.get("#id_gender1").check();

    cy.get('[data-qa="password"]').type(user.password);

    cy.get('[data-qa="days"]').select(user.birth_day);
    cy.get('[data-qa="months"]').select(user.birth_month);
    cy.get('[data-qa="years"]').select(user.birth_year);

    cy.get("#newsletter").check();
    cy.get("#optin").check();

    cy.get('[data-qa="first_name"]').type(user.first_name);
    cy.get('[data-qa="last_name"]').type(user.last_name);
    cy.get('[data-qa="company"]').type(user.company);
    cy.get('[data-qa="address"]').type(user.address);
    cy.get('[data-qa="country"]').select(user.country);
    cy.get('[data-qa="state"]').type(user.state);
    cy.get('[data-qa="city"]').type(user.city);
    cy.get('[data-qa="zipcode"]').type(user.zipcode);
    cy.get('[data-qa="mobile_number"]').type(user.mobile_number);

    cy.get('[data-qa="create-account"]').click();

    cy.contains("b", "Account Created!")
        .should("be.visible");

    cy.get('[data-qa="continue-button"]').click();

    cy.contains(".navbar-nav li", `Logged in as ${user.name}`)
        .should("be.visible");
});

Cypress.Commands.add("deleteAccount", () => {
    cy.get('a[href="/delete_account"]').click();

    cy.contains("b", "Account Deleted!")
        .should("be.visible");

    cy.get('[data-qa="continue-button"]').click();
});


Cypress.Commands.add("addFirstProductToCart", () => {

    cy.get(".features_items .product-image-wrapper")
        .first()
        .find(".productinfo a.add-to-cart")
        .click();

    cy.get("#cartModal")
        .should("be.visible");

    cy.get("#cartModal")
        .contains("a", "View Cart")
        .click();

    cy.url().should("include", "/view_cart");

    cy.get("#cart_info")
        .should("be.visible");
});