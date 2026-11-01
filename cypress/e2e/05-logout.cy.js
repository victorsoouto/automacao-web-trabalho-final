const cadastro = require("../modules/cadastro");
const login = require("../modules/login");

describe("TC4 - Logout", () => {
    it("Encerrar a sessão do usuário e confirmar o retorno à tela de login", () => {
        cy.fixture("users").then((user) => {
            const novoUsuario = { ...user, email: `pgats-tc4-${Date.now()}@test.com` };
            cadastro.iniciarCadastro(novoUsuario.name, novoUsuario.email);
            cadastro.preencherFormulario(novoUsuario);
            cadastro.criarConta();
            cadastro.validarContaCriada();
            login.realizarLogout();
            login.validarLogout();

            login.realizarLogin(novoUsuario.email, novoUsuario.password);
            cadastro.validarUsuarioLogado(novoUsuario.name);
            cadastro.excluirConta();
        });
    });
});
