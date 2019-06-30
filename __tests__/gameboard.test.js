import 'react-native'
import React from 'react'
import GameBoard from '../components/gameBoard'
import renderer from 'react-test-renderer'

const createTestProps = props => ({
  navigation: {
    navigate: jest.fn(),
    state: {
      params: {
        size: props.size,
        winningLength: props.winningLength
      }
    }
  }
})

describe('GameBoard', () => {
  it('renders correctly', () => {
    const props = createTestProps({ size: 3, winningLength: 3 })
    renderer.create(<GameBoard {...props} />)
  })
})
