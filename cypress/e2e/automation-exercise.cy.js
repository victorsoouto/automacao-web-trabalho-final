/// <reference types="cypress" />

describe("Automation Exercise - Authentication", () => {

    // Test Case 1: Register User
    it("Cadastrar um novo usuário com sucesso", () => {
        cy.fixture("users").then((user) => {
            const testUser = {
                ...user,
                email: `pgats-aut-${Date.now()}@test.com`
            };

            cy.registerUser(testUser);

            cy.deleteAccount();
        });
    });

    // Test Case 2: Login User with correct email and password
    it("Fazer login com email e senha corretos", () => {
        cy.fixture("users").then((user) => {
            const testUser = {
                ...user,
                email: `pgats-aut-${Date.now()}@test.com`
            };

            // Preparação: cadastrar um usuário
            cy.registerUser(testUser);

            // Realizar logout para iniciar o cenário de login
            cy.logout();

            // Executar login
            cy.login(testUser.email, testUser.password);

            cy.contains(
                ".navbar-nav li",
                `Logged in as ${testUser.name}`
            ).should("be.visible");

            cy.deleteAccount();
        });
    });

    // Test Case 3: Login User with incorrect email and password
    it("Fazer login com email e senha incorretos", () => {
        cy.visit("/login");

        cy.get('[data-qa="login-email"]')
            .type(`usuario-inexistente-${Date.now()}@test.com`);

        cy.get('[data-qa="login-password"]')
            .type("senha_incorreta");

        cy.get('[data-qa="login-button"]').click();

        cy.contains(
            "p",
            "Your email or password is incorrect!"
        ).should("be.visible");
    });

    // Test Case 4: Logout User
    it("Fazer logout de um usuário logado", () => {
        cy.fixture("users").then((user) => {
            const testUser = {
                ...user,
                email: `pgats-aut-${Date.now()}@test.com`
            };

            // Preparação: cadastrar usuário
            cy.registerUser(testUser);

            cy.logout();

            // Realizar login
            cy.login(testUser.email, testUser.password);

            cy.contains(
                ".navbar-nav li",
                `Logged in as ${testUser.name}`
            ).should("be.visible");

            // Realizar logout
            cy.logout();

            // Validar logout
            cy.url().should("include", "/login");

            cy.get('[data-qa="login-email"]')
                .should("be.visible");

            cy.get('a[href="/logout"]')
                .should("not.exist");
            
            // Limpeza: excluir usuário
            cy.login(testUser.email, testUser.password);

            cy.deleteAccount();
        });
    });

    // Test Case 5: Register User with existing email
    it("Cadastrar um usuário com email existente", () => {
        cy.fixture("users").then((user) => {
            const testUser = {
                ...user,
                email: `pgats-aut-${Date.now()}@test.com`
            };

            // Criar usuário inicialmente
            cy.registerUser(testUser);

            cy.logout();

            // Tentar cadastrar novamente com o mesmo email
            cy.visit("/login");

            cy.get('[data-qa="signup-name"]')
                .type(testUser.name);

            cy.get('[data-qa="signup-email"]')
                .type(testUser.email);

            cy.get('[data-qa="signup-button"]').click();

            cy.contains(
                "p",
                "Email Address already exist!"
            ).should("be.visible");

            // Limpeza: login e exclusão da conta
            cy.login(testUser.email, testUser.password);

            cy.deleteAccount();
        });
    });

});
