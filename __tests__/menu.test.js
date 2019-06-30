import 'react-native'
import React from 'react'
import Menu from '../components/menu'
import renderer from 'react-test-renderer'

describe('Menu', () => {
  it('renders correctly', () => {
    renderer.create(<Menu />)
  })
})
