const seletores = {
    enderecoEntrega: "#address_delivery",
    enderecoCobranca: "#address_invoice",
    comentario: 'textarea[name="message"]',
    linkPagamento: 'a[href="/payment"]',
    tituloEndereco: "h2",
    tituloRevisao: "h2"
};

function validarEnderecoERevisao() {
    cy.contains(seletores.tituloEndereco, "Address Details").should("be.visible");
    cy.get(seletores.enderecoEntrega).should("be.visible");
    cy.get(seletores.enderecoCobranca).should("be.visible");
    cy.contains(seletores.tituloRevisao, "Review Your Order").should("be.visible");
    cy.get("#cart_info").should("be.visible");
}

function adicionarComentarioEIrParaPagamento(comentario) {
    cy.get(seletores.comentario).type(comentario);
    cy.get(seletores.linkPagamento).click();
}

module.exports = { validarEnderecoERevisao, adicionarComentarioEIrParaPagamento };
