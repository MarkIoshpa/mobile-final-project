import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import GameBoard from './gameBoard'
import Options from './options'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Math.round(Dimensions.get('window').width),
    backgroundColor: '#202020'
  },
  header: {
    color: '#FFFFFF',
    fontFamily: 'cursive',
    fontSize: 40,
    fontWeight: 'bold',
    paddingBottom: 60
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
      winningLength: 3,
      gameMode: ''
    }
  }
  render() {
    switch (this.state.gameMode) {
      case 'singleplayer':
        return (
          <GameBoard
            size={this.state.size}
            winningLength={this.state.winningLength}
            gameMode={this.state.gameMode}
            handleBack={() => this.setState({ gameMode: '' })}
          />
        )
      case 'multiplayer':
        return (
          <GameBoard
            size={this.state.size}
            winningLength={this.state.winningLength}
            gameMode={this.state.gameMode}
            handleBack={() => this.setState({ gameMode: '' })}
          />
        )
      case 'computer':
        return (
          <GameBoard
            size={this.state.size}
            winningLength={this.state.winningLength}
            gameMode={this.state.gameMode}
            handleBack={() => this.setState({ gameMode: '' })}
          />
        )
      case 'options':
        return (
          <Options
            size={this.state.size}
            winningLength={this.state.winningLength}
            handleSave={(size, winningLength) => this.setState({ size, winningLength })}
            handleBack={() => this.setState({ gameMode: '' })}
          />
        )
      default:
        return (
          <View style={styles.container}>
            <Text style={styles.header}>{'X & O'}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.setState({ gameMode: 'singleplayer' })}
            >
              <Text style={styles.text}>Singleplayer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.setState({ gameMode: 'multiplayer' })}
            >
              <Text style={styles.text}>Multiplayer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.setState({ gameMode: 'computer' })}
            >
              <Text style={styles.text}>Vs Computer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.setState({ gameMode: 'options' })}
            >
              <Text style={styles.text}>Options</Text>
            </TouchableOpacity>
          </View>
        )
    }
  }
}
