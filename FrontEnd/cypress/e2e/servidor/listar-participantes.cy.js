describe('Teste para Lista Participantes', () => {
    it('Deve fazer login, redirecionar para a página de perfil do servidor e clicar no botão "criar evento"', () => {
        cy.loginServidor("leo", "1234");
        cy.wait(1000);
        cy.get('.btn').contains('Eventos Disponíveis').click();
        cy.wait(1000);
        cy.get('.menu-button').click({ force: true }); // Abre o menu
        cy.wait(1000);
        cy.get('.menu-item[data-action="ver-participantes"]').should('be.visible').click();
    });
});