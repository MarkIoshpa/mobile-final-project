import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import Header from './header'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Math.round(Dimensions.get('window').width) + 1,
    backgroundColor: '#202020'
  },
  button: {
    width: Math.round(Dimensions.get('window').width) / 2,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40
  },
  text: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      size: 3,
      winningLength: 3
    }
  }
  render() {
    const { navigate } = this.props.navigation
    const { size, winningLength } = this.state
    return (
      <View style={styles.container}>
        <Header />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate('GameBoard', { size, winningLength, gameMode: 'singleplayer' })}
        >
          <Text style={styles.text}>Singleplayer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate('Multiplayer', { size, winningLength })}
        >
          <Text style={styles.text}>Multiplayer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate('GameBoard', { size, winningLength, gameMode: 'computer' })}
        >
          <Text style={styles.text}>Vs Computer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigate('Options', {
              size,
              winningLength,
              handleSave: (size, winningLength) => this.setState({ size, winningLength })
            })
          }
        >
          <Text style={styles.text}>Options</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

Menu.propTypes = {
  navigation: PropTypes.object
}
