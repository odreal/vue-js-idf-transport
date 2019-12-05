// https://docs.cypress.io/api/introduction/api.html

describe('Test end2end', () => {
  it('La page de recherche est accessible', () => {
    cy.visit('/')
    cy.contains('h1', 'Plannification d\'un itinéraire')
  })

  it('La page d\'enregistrement est accessible', () => {
    cy.visit('/')
    cy.contains('h1', 'Plannification d\'un itinéraire')
  })

  it('Rechercher un trajet', () => {
    cy.get('#firstPoint').type('Paris');
    cy.get('#secondPoint').type('Versailles Chantier');
    cy.get('#arrivalTime').type('14:45').trigger('input')
    cy.get('.planner__input--search').click();
    cy.get('form+ul').find('li').its('length').should('be.gte', 1);
  })

  it('Sauvegarder un trajet', () => {
    cy.get('.journey__save').first().click();
    cy.get('.journey__save .material-icons').first().contains('done')
    cy.get('#nav a:last-child').click()
    cy.get('.journey__item').should('have.length', 1)
  })

  it('Afficher les détails d\'un trajet', () => {
    cy.get('.journey__step').should('have.length', 0)
    cy.get('.journey__actions--display button').click();    
    cy.get('.journey__step').its('length').should('be.gte', 0)
  })

  it('Supprimer un trajet', () => {
    cy.get('.journey__actions--remove').click();
    cy.get('.journey__item').should('have.length', 0)
  })
})