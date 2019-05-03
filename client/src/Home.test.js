import React from 'react'
import renderer from 'react-test-renderer'
import Home from './Home'


it('functional: Home component', () => {
    const snapshot = renderer.create(
        <Home/>
    ).toJSON()
})