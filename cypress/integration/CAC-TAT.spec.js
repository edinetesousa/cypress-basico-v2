/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste,'
        cy.get('#firstName').type('Edinete')
        cy.get('#lastName').type('Sousa')
        cy.get('#email').type('edineteb.sousa@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        
        cy.get('.success').should('be.visible')    

    })

    it('exibe mensagem de erro ao submeter o formulário com e-mail com formatação inválida', () => {
        cy.get('#firstName').type('Edinete')
        cy.get('#lastName').type('Sousa')
        cy.get('#email').type('edineteb,sousa@gmail.com,br')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    
    })

    it('campo do telefone permanece vazio quando preenchido com dado não-numérico',() => {
        cy.get('#phone')
          .type('abcdefghij')
          .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Edinete')
        cy.get('#lastName').type('Sousa')
        cy.get('#email').type('edineteb.sousa@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    
    })

    it('preenche e limpa os campos nome, sobrenome, e-mail e telefone', () => {
        cy.get('#firstName')
          .type('Edinete')
          .should('have.value', 'Edinete')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Sousa')  
          .should('have.value', 'Sousa')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('edineteb.sousa@gmail.com')
          .should('have.value', 'edineteb.sousa@gmail.com')
          .clear()
          .should('have.value', '')
        cy.get('#phone') 
          .type('1234567890')
          .should('have.value', '1234567890')
          .clear()
          .should('have.value', '')
       
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible') 
    
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')   

    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')

    }) 

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')

    })
    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })

    })
        it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')   
    })
    
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',() => {
        cy.get('#firstName').type('Edinete')
        cy.get('#lastName').type('Sousa')
        cy.get('#email').type('edineteb.sousa@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('seleciona um arquivo na pasta fixtures',() => {
        cy.get('input[type="file"]#file-upload')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json') 
          .should(($input) => {
        //console.log($input) mostrará na aba de console o jQuery que retorna '0: input#file-upload' e files: 0: Files {name: 'example.json'}
            expect($input[0].files[0].name).to.equal('example.json')
          })
        
        
    })
    
})