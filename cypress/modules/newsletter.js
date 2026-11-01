const seletores = {
    rodape: "#footer",
    campoEmail: "#susbscribe_email",
    botaoInscricao: "#subscribe",
    mensagemSucesso: "#success-subscribe"
};

function acessarRodape() {
    cy.visit("/");
    cy.get(seletores.rodape).scrollIntoView();
    cy.contains(seletores.rodape, "Subscription").should("be.visible");
}

function inscreverEmail(email) {
    cy.get(seletores.campoEmail).should("be.visible").type(email);
    cy.get(seletores.botaoInscricao).click();
}

function validarInscricao() {
    cy.contains(seletores.mensagemSucesso, "You have been successfully subscribed!")
        .should("be.visible");
}

module.exports = { acessarRodape, inscreverEmail, validarInscricao };
