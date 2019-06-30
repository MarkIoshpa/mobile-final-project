import 'react-native'
import React from 'react'
import Cell from '../components/cell'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

describe('Cell', () => {
  it('renders correctly', () => {
    renderer.create(<Cell />)
  })
})
