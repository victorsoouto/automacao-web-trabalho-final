const seletores = {
    produtos: ".features_items .product-image-wrapper",
    botaoAdicionar: ".productinfo a.add-to-cart",
    modal: "#cartModal",
    linkVerCarrinho: "#cartModal a",
    carrinho: "#cart_info",
    botaoCheckout: 'a[href="/checkout"]'
};

function adicionarPrimeiroProduto() {
    cy.visit("/");
    cy.get(seletores.produtos).first().find(seletores.botaoAdicionar).click();
    cy.get(seletores.modal).should("be.visible");
    cy.get(seletores.modal).contains("a", "View Cart").click();
}

function validarCarrinho() {
    cy.url().should("include", "/view_cart");
    cy.get(seletores.carrinho).should("be.visible");
}

function prosseguirParaCheckout() {
    cy.contains("a", "Proceed To Checkout").click();
}

module.exports = { adicionarPrimeiroProduto, validarCarrinho, prosseguirParaCheckout };
