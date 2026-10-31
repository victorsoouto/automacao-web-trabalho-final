/// <reference types="cypress" />

describe("Automation Exercise - Subscription", () => {

    beforeEach(() => {
        cy.visit("/");
    });

    // Test Case 10: Verify Subscription in home page
    it("Realizar inscrição na newsletter pela página inicial", () => {

        // Verificar se estamos na página inicial
        cy.url().should("eq", Cypress.config("baseUrl") + "/");

        // Rolar até o rodapé
        cy.get("#footer").scrollIntoView();

        // Verificar o título da seção
        cy.contains("#footer", "Subscription")
            .should("be.visible");

        // Informar um e-mail válido
        const email = `pgats-subscription-${Date.now()}@test.com`;

        cy.get("#susbscribe_email")
            .should("be.visible")
            .type(email);

        // Clicar no botão de inscrição
        cy.get("#subscribe").click();

        // Validar mensagem de sucesso
        cy.contains(
            "#success-subscribe",
            "You have been successfully subscribed!"
        ).should("be.visible");

    });

});
