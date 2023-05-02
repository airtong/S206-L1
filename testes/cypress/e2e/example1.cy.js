/// <reference types="cypress"/>

describe('Criando cenário de teste para o site globalsqa', () => {
    it.skip('Caso de teste: Registrando um usuário no site com sucesso', () => {

      cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
      cy.get(".btn-link").click()
      cy.get("#firstName").type('Airton')
      cy.get("#Text1").type('Carvalho')
      cy.get("#username").type('airton')
      cy.get("#password").type('strongPassword')
      cy.get(".btn-primary").click()
      cy.get('.ng-binding').should('contain.text','Registration successful')
    })

    it.skip("Caso: Registrando usuário com falha(Faltando senha)",()=> {
        cy.visit("https://globalsqa.com/angularJs-protractor/registration-login-example/#/register")
        cy.get(".btn-link").click()
        cy.get("#firstName").type('Airton')
        cy.get("#Text1").type('Carvalho')
        cy.get("#username").type('airton')
        cy.get("#password").type('strongPassword')
        cy.get("#password").clear()
        cy.get('.has-error > .help-block').should('have.text', 'Password is required')
        cy.get(".btn-primary").should('be.disabled')
    })

    it("Caso: Registrando usuário com falha(Faltando senha)",()=> {

      let usuario = JSON.parse(criarUsuario())
      
      cy.wait(500)

      cy.get('#username').type(usuario.username)
      cy.get('#password').type(usuario.password)
      cy.get('.btn-primary').click()
      cy.get('div.ng-scope > :nth-child(2)').should('have.text', "You're logged in!!")
    })
  })

function criarUsuario(){
  let firstPart = ["adorable", "cuddly", "sweet", "lovely", "charming", "darling", "chirpy", "precious", "cute", "lovable", "snuggly", "beautiful", "pretty", "gorgeous"];
  let secondPart = ["apple", "banana", "orange", "grape", "watermelon", "kiwi", "pear", "pineapple", "mango", "strawberry"];
  
  let firstRN = getRandomNumber(0, firstPart.length);
  let secondRN = getRandomNumber(0, secondPart.length);

  let thirdPart = getRandomNumber(10, 99);

  let name = firstPart[firstRN];
  let lastName = secondPart[secondRN];

  let username = name + lastName + thirdPart; 

  let password = getRandomNumber(25427327, 254273278451);

  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register')
  
  cy.get("#firstName").type(name)
  cy.get("#Text1").type(lastName)
  cy.get("#username").type(username)
  cy.get("#password").type(password)
  cy.get(".btn-primary").click()
  cy.get('.ng-binding').should('contain.text','Registration successful')

  let userCreated = {
    "username": username,
    "password": password
  };

  return JSON.stringify(userCreated);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
