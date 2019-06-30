import 'react-native'
import React from 'react'
import GameBoard from '../components/gameBoard'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

describe('GameBoard', () => {
  it('renders correctly', () => {
    renderer.create(<GameBoard />)
  })
})
