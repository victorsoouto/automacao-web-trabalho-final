const cadastro = require("../modules/cadastro");
const login = require("../modules/login");

describe("TC2 - Login válido", () => {
    it("Permitir login com credenciais corretas e excluir a conta ao final", () => {
        cy.fixture("users").then((user) => {
            const novoUsuario = { ...user, email: `pgats-tc2-${Date.now()}@test.com` };
            cadastro.iniciarCadastro(novoUsuario.name, novoUsuario.email);
            cadastro.preencherFormulario(novoUsuario);
            cadastro.criarConta();
            cadastro.validarContaCriada();
            login.realizarLogout();

            login.realizarLogin(novoUsuario.email, novoUsuario.password);
            cadastro.validarUsuarioLogado(novoUsuario.name);
            cadastro.excluirConta();
        });
    });
});
