import 'react-native'
import React from 'react'
import Cell from '../components/cell'
import renderer from 'react-test-renderer'

const props = {
  key: 'cell00',
  x: 0,
  y: 0,
  size: 3,
  cellState: 'X',
  handlePress: jest.fn(),
  lastMove: [0, 0],
  winningLine: [],
  lineOrientation: ''
}

describe('Cell', () => {
  it('renders correctly', () => {
    renderer.create(<Cell {...props} />)
  })
})
