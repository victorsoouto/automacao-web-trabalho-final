const seletores = {
    email: '[data-qa="login-email"]',
    senha: '[data-qa="login-password"]',
    botaoLogin: '[data-qa="login-button"]',
    botaoLogout: 'a[href="/logout"]'
};

function realizarLogin(email, senha) {
    cy.visit("/login");
    cy.get(seletores.email).type(email);
    cy.get(seletores.senha).type(senha);
    cy.get(seletores.botaoLogin).click();
}

function realizarLogout() {
    cy.get(seletores.botaoLogout).click();
}

function validarLoginInvalido() {
    cy.contains("p", "Your email or password is incorrect!").should("be.visible");
}

function validarLogout() {
    cy.url().should("include", "/login");
    cy.get(seletores.email).should("be.visible");
    cy.get(seletores.botaoLogout).should("not.exist");
}

module.exports = {
    realizarLogin,
    realizarLogout,
    validarLoginInvalido,
    validarLogout
};
