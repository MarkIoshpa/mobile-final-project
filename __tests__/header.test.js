import 'react-native'
import React from 'react'
import Header from '../components/header'
import renderer from 'react-test-renderer'

describe('Header', () => {
  it('renders correctly', () => {
    renderer.create(<Header />)
  })
})
