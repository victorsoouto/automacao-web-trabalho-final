const produtos = require("../modules/produtos");

describe("TC9 - Pesquisa de produtos", () => {
    it("Pesquisar um produto e exibir somente resultados correspondentes", () => {
        produtos.acessarListaDeProdutos();
        produtos.pesquisarProduto("Blue Top");
        produtos.validarResultadoDaPesquisa("Blue Top");
    });
});
