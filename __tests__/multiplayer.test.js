import 'react-native'
import React from 'react'
import Multiplayer from '../components/multiplayer'
import renderer from 'react-test-renderer'

describe('Multiplayer', () => {
  it('renders correctly', () => {
    renderer.create(<Multiplayer />)
  })
})
