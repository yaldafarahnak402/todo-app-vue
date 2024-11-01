// https://on.cypress.io/api

describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('span', 'TODO LIST')
  })

  it('add task', () => {
    cy.visit('/')
    cy.get('#addTaskButton').click()

    cy.get('#modal')
  })

  it('close modal', () => {
    cy.visit('/')

    cy.get('#addTaskButton').click()

    cy.get('#modal').should('exist')

    cy.get('#xCloseModal').click()

    cy.get('#modal').should('not.exist')
  })

  it('cancel button', () => {
    cy.visit('/')

    cy.get('#addTaskButton').click()

    cy.get('#modal').should('exist')

    cy.get('#cancelButton').click()

    cy.get('#modal').should('not.exist')
  })
})
