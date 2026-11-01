const cadastro = require("../modules/cadastro");
const login = require("../modules/login");
const pedido = require("../modules/pedido");

describe("TC16 - Pedido após login", () => {
    it("Criar uma conta, realizar login, concluir o pedido e excluir a conta", () => {
        cy.fixture("users").then((user) => {
            const novoUsuario = { ...user, email: `pgats-tc16-${Date.now()}@test.com` };
            cadastro.iniciarCadastro(novoUsuario.name, novoUsuario.email);
            cadastro.preencherFormulario(novoUsuario);
            cadastro.criarConta();
            cadastro.validarContaCriada();
            login.realizarLogout();

            login.realizarLogin(novoUsuario.email, novoUsuario.password);
            cadastro.validarUsuarioLogado(novoUsuario.name);
            pedido.realizarPedido();
            cadastro.excluirConta();
        });
    });
});
