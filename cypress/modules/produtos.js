const seletores = {
    linkProdutos: 'a[href="/products"]',
    tituloTodosProdutos: "h2",
    produtos: ".features_items .product-image-wrapper",
    informacoesProduto: ".product-information",
    campoPesquisa: "#search_product",
    botaoPesquisa: "#submit_search"
};

function acessarListaDeProdutos() {
    cy.visit("/");
    cy.get(seletores.linkProdutos).click();
}

function validarListaDeProdutos() {
    cy.url().should("include", "/products");
    cy.contains(seletores.tituloTodosProdutos, "All Products").should("be.visible");
    cy.get(seletores.produtos).should("have.length.greaterThan", 0);
}

function abrirDetalhesDoPrimeiroProduto() {
    cy.get(seletores.produtos).first().contains("View Product").click();
}

function validarDetalhesDoProduto() {
    cy.url().should("include", "/product_details/");
    cy.get(seletores.informacoesProduto).should("be.visible");
    cy.get(`${seletores.informacoesProduto} h2`).should("be.visible").and("not.be.empty");
    cy.get(`${seletores.informacoesProduto} p`).should("have.length.greaterThan", 0);
    cy.contains(seletores.informacoesProduto, "Category:").should("be.visible");
    cy.contains(seletores.informacoesProduto, "Availability:").should("be.visible");
    cy.contains(seletores.informacoesProduto, "Condition:").should("be.visible");
    cy.contains(seletores.informacoesProduto, "Brand:").should("be.visible");
    cy.contains(`${seletores.informacoesProduto} span`, "Rs.").should("be.visible");
}

function pesquisarProduto(nome) {
    cy.get(seletores.campoPesquisa).should("be.visible").type(nome);
    cy.get(seletores.botaoPesquisa).click();
}

function validarResultadoDaPesquisa(nome) {
    cy.contains("h2", "Searched Products").should("be.visible");
    cy.get(seletores.produtos).should("have.length.greaterThan", 0);
    cy.get(seletores.produtos).each(($produto) => {
        cy.wrap($produto).should("contain.text", nome);
    });
}

module.exports = {
    acessarListaDeProdutos,
    validarListaDeProdutos,
    abrirDetalhesDoPrimeiroProduto,
    validarDetalhesDoProduto,
    pesquisarProduto,
    validarResultadoDaPesquisa
};
