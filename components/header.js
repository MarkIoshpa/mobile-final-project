import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  header: {
    color: '#FFFFFF',
    fontFamily: 'cursive',
    fontSize: 40,
    fontWeight: 'bold',
    paddingBottom: 30
  },
  smallerText: {
    fontSize: 30
  }
})

export default class Menu extends Component {
  render() {
    return (
      <Text style={styles.header}>
        {'X'}
        <Text style={styles.smallerText}>{' & '}</Text>
        {'O'}
      </Text>
    )
  }
}
