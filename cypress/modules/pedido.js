const carrinho = require("./carrinho");
const checkout = require("./checkout");
const pagamento = require("./pagamento");

const dadosPagamento = {
    name: "PGATS Automacao",
    cardNumber: "4111111111111111",
    cvc: "123",
    expiryMonth: "12",
    expiryYear: "2030"
};

function realizarPedido() {
    carrinho.adicionarPrimeiroProduto();
    carrinho.validarCarrinho();
    carrinho.prosseguirParaCheckout();
    checkout.validarEnderecoERevisao();
    checkout.adicionarComentarioEIrParaPagamento(
        "Pedido realizado através dos testes automatizados PGATS."
    );
    pagamento.preencherPagamento(dadosPagamento);
    pagamento.confirmarPagamento();
    pagamento.validarPedidoConfirmado();
}

module.exports = { realizarPedido };
