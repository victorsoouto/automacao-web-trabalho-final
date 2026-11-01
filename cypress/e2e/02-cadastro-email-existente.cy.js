const cadastro = require("../modules/cadastro");
const login = require("../modules/login");

describe("TC5 - Cadastro com e-mail existente", () => {
    it("Impedir cadastro com e-mail já registrado e permitir a limpeza da conta", () => {
        cy.fixture("users").then((user) => {
            const novoUsuario = { ...user, email: `pgats-tc5-${Date.now()}@test.com` };
            cadastro.iniciarCadastro(novoUsuario.name, novoUsuario.email);
            cadastro.preencherFormulario(novoUsuario);
            cadastro.criarConta();
            cadastro.validarContaCriada();
            login.realizarLogout();

            cadastro.iniciarCadastro(novoUsuario.name, novoUsuario.email);
            cadastro.validarEmailExistente();

            login.realizarLogin(novoUsuario.email, novoUsuario.password);
            cadastro.validarUsuarioLogado(novoUsuario.name);
            cadastro.excluirConta();
        });
    });
});
