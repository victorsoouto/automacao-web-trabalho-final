const produtos = require("../modules/produtos");

describe("TC8 - Produtos e detalhes", () => {
    it("Exibir a lista de produtos e validar os detalhes do primeiro produto", () => {
        produtos.acessarListaDeProdutos();
        produtos.validarListaDeProdutos();
        produtos.abrirDetalhesDoPrimeiroProduto();
        produtos.validarDetalhesDoProduto();
    });
});
