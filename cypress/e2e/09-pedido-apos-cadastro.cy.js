const cadastro = require("../modules/cadastro");
const pedido = require("../modules/pedido");

describe("TC15 - Pedido após cadastro", () => {
    it("Cadastrar um usuário, concluir o pedido e excluir a conta", () => {
        cy.fixture("users").then((user) => {
            const novoUsuario = { ...user, email: `pgats-tc15-${Date.now()}@test.com` };
            cadastro.iniciarCadastro(novoUsuario.name, novoUsuario.email);
            cadastro.preencherFormulario(novoUsuario);
            cadastro.criarConta();
            cadastro.validarContaCriada();
            cadastro.validarUsuarioLogado(novoUsuario.name);
            pedido.realizarPedido();
            cadastro.excluirConta();
        });
    });
});
