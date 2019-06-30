import 'react-native'
import React from 'react'
import Multiplayer from '../components/multiplayer'
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

describe('Multiplayer', () => {
  it('renders correctly', () => {
    Multiplayer.prototype.fetchGameList = jest.fn(() => new Promise(resolve => resolve()))
    const props = createTestProps({ size: 3, winningLength: 3 })
    renderer.create(<Multiplayer {...props} />)
    expect(Multiplayer.prototype.fetchGameList).toHaveBeenCalled()
  })
})
