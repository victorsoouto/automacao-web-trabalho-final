const seletores = {
    nome: '[data-qa="name-on-card"]',
    numeroCartao: '[data-qa="card-number"]',
    cvc: '[data-qa="cvc"]',
    mes: '[data-qa="expiry-month"]',
    ano: '[data-qa="expiry-year"]',
    botaoPagar: '[data-qa="pay-button"]'
};

function preencherPagamento(dados) {
    cy.get(seletores.nome).type(dados.name);
    cy.get(seletores.numeroCartao).type(dados.cardNumber);
    cy.get(seletores.cvc).type(dados.cvc);
    cy.get(seletores.mes).type(dados.expiryMonth);
    cy.get(seletores.ano).type(dados.expiryYear);
}

function confirmarPagamento() {
    cy.get(seletores.botaoPagar).click();
}

function validarPedidoConfirmado() {
    cy.contains(
        /Your order has been placed successfully!|Congratulations! Your order has been confirmed!/
    ).should("be.visible");
}

module.exports = { preencherPagamento, confirmarPagamento, validarPedidoConfirmado };
