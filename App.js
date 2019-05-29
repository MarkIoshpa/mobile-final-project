import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Menu from './components/menu'

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
        <Menu />
      </View>
    )
  }
}
