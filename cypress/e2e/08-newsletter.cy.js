const newsletter = require("../modules/newsletter");

describe("TC10 - Inscrição na newsletter", () => {
    it("Inscrever um e-mail na newsletter e exibir a confirmação", () => {
        const email = `pgats-newsletter-${Date.now()}@test.com`;
        newsletter.acessarRodape();
        newsletter.inscreverEmail(email);
        newsletter.validarInscricao();
    });
});
