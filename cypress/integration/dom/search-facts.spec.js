/// <reference types="cypress" />

context('Test tab navigation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/')
    })

    it('Toggle tabs', () => {
        cy.getByTestId('search-type-0')
            .click()
            .parent()
            .should('have.class', 'active')

        cy.getByTestId('search-type-1')
            .parent()
            .should('not.have.class', 'active')

        cy.getByTestId('search-type-1')
            .click()
            .parent()
            .should('have.class', 'active')

        cy.getByTestId('search-type-0')
            .parent()
            .should('not.have.class', 'active')
    })
})

context('Search by category', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/')
    })

    it('Search a random quote in all categories', () => {
        cy.get('[data-testid="quote"]').should('not.exist')
        cy.getByTestId('submit-by-category').click()
        cy.get('[data-testid="quote"]').should('exist')
    })

    it('Search a random quote in specific category', () => {
        cy.get('[data-testid="quote"]').should('not.exist')
        cy.getByTestId('input-category').select('career')
        cy.getByTestId('submit-by-category').click()
        cy.get('[data-testid="quote"]').should('exist')
        cy.get('[data-testid="pill"]').contains('career')
    })
})

context('Search by term', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/')
        cy.getByTestId('search-type-1').click()
    })

    it('Check submit button disabled status', () => {
        cy.getByTestId('submit-by-term').should('be.disabled')
        cy.getByTestId('input-term').type('123')
        cy.getByTestId('submit-by-term').should('not.be.disabled')
        cy.getByTestId('input-term').clear()
        cy.getByTestId('submit-by-term').should('be.disabled')
        cy.getByTestId('input-term').type('12')
        cy.getByTestId('submit-by-term').should('be.disabled')
    })

    it('Search without results', () => {
        cy.get('[data-testid="quote"]').should('not.exist')
        cy.getByTestId('submit-by-term').should('be.disabled')
        cy.getByTestId('input-term').type('relógio')
        cy.getByTestId('submit-by-term').click()
        cy.get('[data-testid="quote"]').should('not.exist')
    })

    it('Search with results', () => {
        cy.getByTestId('search-type-1').click()
        cy.getByTestId('input-term').type('react')
        cy.getByTestId('submit-by-term').click()
        cy.get('[data-testid="quote"]').should('exist')
    })
})

context('Testing pagination', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/')
        cy.getByTestId('search-type-1').click()
    })

    it('Hide pagination when no data to paginate', () => {
        cy.getByTestId('input-term').type('quiz')
        cy.getByTestId('submit-by-term').click()
        cy.getByTestId('paginator').should('not.exist')
    })

    it('Show pagination when necessary', () => {
        cy.getByTestId('input-term').type('train')
        cy.getByTestId('submit-by-term').click()
        cy.getByTestId('paginator').should('exist')
    })

    it('Testing active pagination buttons', () => {
        cy.getByTestId('input-term').type('train')
        cy.getByTestId('submit-by-term').click()
        cy.getByTestId('paginator').should('exist')

        cy.getByTestId('paginator')
            .find('li')
            .eq(0)
            .find('input')
            .should('have.class', 'active')

        cy.getByTestId('paginator')
            .find('li')
            .eq(1)
            .find('input')
            .should('not.have.class', 'active')

        cy.getByTestId('paginator')
            .find('li')
            .eq(1)
            .find('input')
            .click()
            .should('have.class', 'active')

        cy.getByTestId('paginator')
            .find('li')
            .eq(0)
            .find('input')
            .should('not.have.class', 'active')
    })

    it('Testing changes in paginated content', () => {
        cy.getByTestId('input-term').type('train')
        cy.getByTestId('submit-by-term').click()

        cy.getByTestId('quote')
            .first()
            .find('blockquote')
            .then(($node) => {
                const txt = $node.text()

                cy.getByTestId('paginator')
                    .find('li')
                    .eq(1)
                    .find('input')
                    .click()

                cy.getByTestId('quote')
                    .first()
                    .find('blockquote')
                    .invoke('text')
                    .should('not.eq', txt)
            })
    })
})

context('RTL support testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/')
    })

    it('Toggle RTL', () => {
        cy.get('html').should('not.have.attr', 'dir')
        cy.getByTestId('rtl-toggler').find('label').click()
        cy.get('html').should('have.attr', 'dir', 'rtl')
        cy.getByTestId('rtl-toggler').find('label').click()
        cy.get('html').should('not.have.attr', 'dir')
    })
})
