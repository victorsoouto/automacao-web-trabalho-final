const login = require("../modules/login");

describe("TC3 - Login inválido", () => {
    it("Rejeitar o login com e-mail e senha incorretos", () => {
        login.realizarLogin(`usuario-inexistente-${Date.now()}@test.com`, "senha_incorreta");
        login.validarLoginInvalido();
    });
});
