import 'react-native'
import React from 'react'
import Menu from '../components/menu'
import renderer from 'react-test-renderer'

const createTestProps = props => ({
  navigation: {
    navigate: jest.fn()
  },
  ...props
})

describe('Menu', () => {
  it('renders correctly', () => {
    const props = createTestProps({})
    renderer.create(<Menu {...props} />)
  })
})
