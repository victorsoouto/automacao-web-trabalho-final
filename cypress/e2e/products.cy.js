/// <reference types="cypress" />

describe("Automation Exercise - Products", () => {

    beforeEach(() => {
        cy.visit("/");
    });

    // Test Case 8: Verify All Products and product detail page
    it("Verificar todos os produtos e a página de detalhes", () => {

        // Acessar a página de produtos
        cy.get('a[href="/products"]').click();

        // Validar que estamos na página de produtos
        cy.url().should("include", "/products");

        cy.contains("h2", "All Products")
            .should("be.visible");

        // Verificar se existem produtos listados
        cy.get(".features_items .product-image-wrapper")
            .should("have.length.greaterThan", 0);

        // Acessar o primeiro produto
        cy.get(".features_items .product-image-wrapper")
            .first()
            .contains("View Product")
            .click();

        // Validar página de detalhes
        cy.url().should("include", "/product_details/");

        cy.get(".product-information").should("be.visible");

        // Validar informações do produto
        cy.get(".product-information h2")
            .should("be.visible")
            .and("not.be.empty");

        cy.get(".product-information p")
            .should("have.length.greaterThan", 0);

        cy.contains(".product-information", "Category:")
            .should("be.visible");

        cy.contains(".product-information", "Availability:")
            .should("be.visible");

        cy.contains(".product-information", "Condition:")
            .should("be.visible");

        cy.contains(".product-information", "Brand:")
            .should("be.visible");

        cy.contains(".product-information span", "Rs.")
            .should("be.visible");

    });

    // Test Case 9: Search Product
    it("Pesquisar um produto", () => {

        const productName = "Blue Top";

        // Acessar a página de produtos
        cy.get('a[href="/products"]').click();

        cy.url().should("include", "/products");

        // Realizar pesquisa
        cy.get("#search_product")
            .should("be.visible")
            .type(productName);

        cy.get("#submit_search").click();

        // Validar resultado da pesquisa
        cy.contains("h2", "Searched Products")
            .should("be.visible");

        // Verificar se existem produtos retornados
        cy.get(".features_items .product-image-wrapper")
            .should("have.length.greaterThan", 0);

        // Validar se os resultados correspondem à pesquisa
        cy.get(".features_items .product-image-wrapper")
            .each(($product) => {
                cy.wrap($product)
                    .should("contain.text", productName);
            });

    });

});
