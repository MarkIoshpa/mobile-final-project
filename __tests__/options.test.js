import 'react-native'
import React from 'react'
import Options from '../components/options'
import renderer from 'react-test-renderer'

describe('Options', () => {
  it('renders correctly', () => {
    renderer.create(<Options />)
  })
})
