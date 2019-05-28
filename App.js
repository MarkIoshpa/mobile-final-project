import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import GameBoard from './components/gameBoard'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <GameBoard size={6} winningLength={4} />
      </View>
    )
  }
}
