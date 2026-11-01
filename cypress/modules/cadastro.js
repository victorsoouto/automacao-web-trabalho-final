const seletores = {
    nome: '[data-qa="signup-name"]',
    email: '[data-qa="signup-email"]',
    botaoCadastro: '[data-qa="signup-button"]',
    genero: "#id_gender1",
    senha: '[data-qa="password"]',
    dia: '[data-qa="days"]',
    mes: '[data-qa="months"]',
    ano: '[data-qa="years"]',
    newsletter: "#newsletter",
    ofertas: "#optin",
    nomeContato: '[data-qa="first_name"]',
    sobrenome: '[data-qa="last_name"]',
    empresa: '[data-qa="company"]',
    endereco: '[data-qa="address"]',
    pais: '[data-qa="country"]',
    estado: '[data-qa="state"]',
    cidade: '[data-qa="city"]',
    cep: '[data-qa="zipcode"]',
    telefone: '[data-qa="mobile_number"]',
    botaoCriarConta: '[data-qa="create-account"]',
    botaoContinuar: '[data-qa="continue-button"]',
    botaoExcluirConta: 'a[href="/delete_account"]'
};

function iniciarCadastro(nome, email) {
    cy.visit("/login");
    cy.get(seletores.nome).type(nome);
    cy.get(seletores.email).type(email);
    cy.get(seletores.botaoCadastro).click();
}

function preencherFormulario(user) {
    cy.get(seletores.genero).check();
    cy.get(seletores.senha).type(user.password);
    cy.get(seletores.dia).select(user.birth_day);
    cy.get(seletores.mes).select(user.birth_month);
    cy.get(seletores.ano).select(user.birth_year);
    cy.get(seletores.newsletter).check();
    cy.get(seletores.ofertas).check();
    cy.get(seletores.nomeContato).type(user.first_name);
    cy.get(seletores.sobrenome).type(user.last_name);
    cy.get(seletores.empresa).type(user.company);
    cy.get(seletores.endereco).type(user.address);
    cy.get(seletores.pais).select(user.country);
    cy.get(seletores.estado).type(user.state);
    cy.get(seletores.cidade).type(user.city);
    cy.get(seletores.cep).type(user.zipcode);
    cy.get(seletores.telefone).type(user.mobile_number);
}

function criarConta() {
    cy.get(seletores.botaoCriarConta).click();
}

function validarEmailExistente() {
    cy.contains("p", "Email Address already exist!").should("be.visible");
}

function validarContaCriada() {
    cy.contains("b", "Account Created!").should("be.visible");
    cy.get(seletores.botaoContinuar).click();
}

function validarUsuarioLogado(nome) {
    cy.contains(".navbar-nav li", `Logged in as ${nome}`).should("be.visible");
}

function excluirConta() {
    cy.get(seletores.botaoExcluirConta).click();
    cy.contains("b", "Account Deleted!").should("be.visible");
    cy.get(seletores.botaoContinuar).click();
}

module.exports = {
    iniciarCadastro,
    preencherFormulario,
    criarConta,
    validarContaCriada,
    validarUsuarioLogado,
    excluirConta,
    validarEmailExistente
};
