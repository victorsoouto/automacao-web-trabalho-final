const cadastro = require("../modules/cadastro");

describe("TC1 - Cadastro de usuário", () => {
    it("Cadastrar um usuário e confirmar a criação e exclusão da conta", () => {
        cy.fixture("users").then((user) => {
            const novoUsuario = { ...user, email: `pgats-tc1-${Date.now()}@test.com` };
            cadastro.iniciarCadastro(novoUsuario.name, novoUsuario.email);
            cadastro.preencherFormulario(novoUsuario);
            cadastro.criarConta();
            cadastro.validarContaCriada();
            cadastro.validarUsuarioLogado(novoUsuario.name);
            cadastro.excluirConta();
        });
    });
});
