
/// <reference types="cypress" />

describe("Automation Exercise - Checkout", () => {

    // Dados utilizados no pagamento
    const paymentData = {
        name: "PGATS Automacao",
        cardNumber: "4111111111111111",
        cvc: "123",
        expiryMonth: "12",
        expiryYear: "2030"
    };

    // Finalizar pedido
    const completeOrder = () => {

        // Verificar página do carrinho
        cy.url().should("include", "/view_cart");

        cy.get("#cart_info")
            .should("be.visible");

        // Prosseguir para checkout
        cy.contains("a", "Proceed To Checkout")
            .click();

        // Validar informações de endereço
        cy.contains("h2", "Address Details")
            .should("be.visible");

        cy.get("#address_delivery")
            .should("be.visible");

        cy.get("#address_invoice")
            .should("be.visible");

        // Validar resumo do pedido
        cy.contains("h2", "Review Your Order")
            .should("be.visible");

        cy.get("#cart_info")
            .should("be.visible");

        // Adicionar comentário
        cy.get('textarea[name="message"]')
            .type("Pedido realizado através dos testes automatizados PGATS.");

        // Realizar pedido
        cy.get('a[href="/payment"]')
            .click();

        // Preencher dados de pagamento
        cy.get('[data-qa="name-on-card"]')
            .type(paymentData.name);

        cy.get('[data-qa="card-number"]')
            .type(paymentData.cardNumber);

        cy.get('[data-qa="cvc"]')
            .type(paymentData.cvc);

        cy.get('[data-qa="expiry-month"]')
            .type(paymentData.expiryMonth);

        cy.get('[data-qa="expiry-year"]')
            .type(paymentData.expiryYear);

        // Confirmar pagamento
        cy.get('[data-qa="pay-button"]')
            .click();

        // Validar confirmação do pedido
        cy.contains(
            /Your order has been placed successfully!|Congratulations! Your order has been confirmed!/
        ).should("be.visible");

    };


    // Test Case 15: Place Order - Register before Checkout
    it("Realizar pedido após cadastrar um novo usuário", () => {

        cy.fixture("users").then((user) => {

            const testUser = {
                ...user,
                email: `pgats-checkout-${Date.now()}@test.com`
            };

            // Criar conta
            cy.registerUser(testUser);

            // Verificar usuário logado
            cy.contains(
                ".navbar-nav li",
                `Logged in as ${testUser.name}`
            ).should("be.visible");

            // Adicionar produto ao carrinho
            cy.addFirstProductToCart();

            // Finalizar pedido
            completeOrder();

            // Excluir conta
            cy.deleteAccount();

        });

    });


    // Test Case 16: Place Order - Login before Checkout
    it("Realizar pedido após login de usuário existente", () => {

        cy.fixture("users").then((user) => {

            const testUser = {
                ...user,
                email: `pgats-checkout-login-${Date.now()}@test.com`
            };

            // Preparação: criar uma conta para o cenário
            cy.registerUser(testUser);

            // Encerrar sessão
            cy.logout();

            // Realizar login com a conta criada
            cy.login(testUser.email, testUser.password);

            // Validar login
            cy.contains(
                ".navbar-nav li",
                `Logged in as ${testUser.name}`
            ).should("be.visible");

            // Adicionar produto ao carrinho
            cy.addFirstProductToCart();

            // Finalizar pedido
            completeOrder();

            // Excluir conta
            cy.deleteAccount();

        });

    });

});
