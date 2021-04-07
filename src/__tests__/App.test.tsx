import React from 'react'
import { render } from 'enzyme'
import App from '../components/App'

describe('App', () => {
    it('Renders App component', () => {
        const hello = render(<App />)
        expect(hello.find('h1').text()).toBe('Hello World!')
    })
})
