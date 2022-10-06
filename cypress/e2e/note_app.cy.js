describe('Note app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')

    const user = {
      username: 'TestUser',
      password: '1234567890',
      name: 'MrTest',
    }

    cy.request('POST', 'http://localhost:3000/api/users', user)
    cy.visit('http://localhost:3000/')
  })

  it('frontpagecan be opened', () => {
    cy.contains('Notes')
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2022'
    )
  })

  it('login form can be opened', () => {
    cy.contains('login').click()
  })

  it('user can login', () => {
    cy.contains('login').click()

    cy.get('#username').type('TestUser')
    cy.get('#password').type('1234567890')
    cy.get('#login-button').click()

    cy.contains('logged-in')
  })

  describe('when logged id', () => {
    beforeEach(() => {
      cy.login({ username: 'TestUser', password: '1234567890' })
    })
    it('a new note can be cerated', () => {
      cy.contains('new Note').click()
      cy.get('input').type('New Note')
      cy.contains('save').click()

      cy.contains('New Note')
    })

    describe('and any note exists', () => {
      beforeEach(() => {
        cy.createNote({ content: 'Note created with cypress custom command' })
      })

      it('can be made important', () => {
        cy.contains('Note created with cypress custom command')
          .parent()
          .find('button')
          .as('theButton')
          .click()

        cy.get('@theButton').contains('make not important')
      })
    })

    describe('and multiple notes exist', () => {
      beforeEach(() => {
        cy.createNote({ content: 'firstNote', important: false })
        cy.createNote({ content: 'secondNote', important: false })
        cy.createNote({ content: 'thirdNote', important: false })
      })

      it('one of those can be made important', () => {
        cy.contains('secondNote')
          .parent()
          .find('button')
          .as('theButton')
          .click()
        cy.get('@theButton').contains('make not important')
      })
    })
  })
  it('login fails with wrong password', () => {
    cy.contains('login').click()
    cy.get('#username').type('TestUser')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong Credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border', '2px solid rgb(255, 0, 0)')

    cy.get('html').should('not.contain', 'MrTest logged-in')
  })
})
