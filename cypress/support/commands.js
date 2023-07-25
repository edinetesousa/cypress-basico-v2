Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Edinete')
    cy.get('#lastName').type('Sousa')
    cy.get('#email').type('edineteb.sousa@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
    

})
