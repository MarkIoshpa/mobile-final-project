import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Cell from './cell'
import propTypes from 'prop-types'
import update from 'immutability-helper'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202020'
  },
  board: {
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  turn: {
    paddingTop: 30,
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold'
  }
})

export default class GameBoard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      size: this.props.size,
      winningLength: this.props.winningLength,
      gameState: this.create2DArray(this.props.size, this.props.size),
      gameReady: true,
      playerTurn: 'X',
      winner: '',
      lastMove: []
    }

    this.create2DArray = this.create2DArray.bind(this)
    this.checkVictory = this.checkVictory.bind(this)
  }

  createBoard = size => {
    const board = []
    for (let i = 0; i < size; i++) {
      const rows = []
      for (let j = 0; j < size; j++) {
        rows.push(
          <Cell
            key={`cell${i}${j}`}
            x={i}
            y={j}
            size={size}
            cellState={this.state.gameState[i][j]}
            handlePress={this.onPress}
            lastMove={this.state.lastMove}
          />
        )
      }
      board.push(
        <View key={`row${i}`} style={styles.board}>
          {rows}
        </View>
      )
    }
    return board
  }

  onPress = (x, y) => {
    if (this.state.gameReady) {
      if (typeof this.state.gameState[x][y] === 'undefined') {
        this.setState(
          {
            gameState: update(this.state.gameState, {
              [x]: { [y]: { $set: this.state.playerTurn } }
            }),
            gameReady: false,
            lastMove: [x, y]
          },
          () => {
            if (this.checkVictory()) this.setState({ winner: this.state.playerTurn })
            else
              this.setState(
                this.state.playerTurn === 'X'
                  ? { playerTurn: 'O', gameReady: true }
                  : { playerTurn: 'X', gameReady: true }
              )
          }
        )
      }
    }
  }

  create2DArray(size) {
    const arr = new Array(size || 0)
    let i = size
    while (i--) arr[size - 1 - i] = new Array(size || 0)
    return arr
  }

  checkVictory() {
    const x = this.state.lastMove[0]
    const y = this.state.lastMove[1]
    const symbol = this.state.gameState[x][y]
    const { size, winningLength } = this.state

    for (let i = x - winningLength + 1, count = 0; i < x + winningLength - 1 && i < size; i++) {
      if (i < 0) continue
      if (this.state.gameState[i][y] === symbol) count += 1
      else count = 0
      if (count === winningLength) return true
    }

    for (let i = y - winningLength + 1, count = 0; i < y + winningLength - 1 && i < size; i++) {
      if (i < 0) continue
      if (this.state.gameState[x][i] === symbol) count += 1
      else count = 0
      if (count === winningLength) return true
    }

    for (
      let i = x - winningLength + 1, j = y - winningLength + 1, count = 0;
      i < x + winningLength - 1 && i < size && j < y + winningLength - 1 && j < size;
      i++, j++
    ) {
      if (i < 0 || j < 0) continue
      if (this.state.gameState[i][j] === symbol) count += 1
      else count = 0
      if (count === winningLength) return true
    }

    for (
      let i = x - winningLength + 1, j = y + winningLength - 1, count = 0;
      i < x + winningLength - 1 && i < size && j > y - winningLength + 1 && j >= 0;
      i++, j--
    ) {
      if (i < 0 || j >= size) continue
      if (this.state.gameState[i][j] === symbol) count += 1
      else count = 0
      if (count === winningLength) return true
    }

    return false
  }

  render() {
    const { size } = this.state
    return (
      <View style={styles.container}>
        <View
          style={
            this.state.playerTurn === 'X'
              ? { borderWidth: 5, borderColor: 'red' }
              : { borderWidth: 5, borderColor: 'blue' }
          }
        >
          {this.createBoard(size)}
        </View>
        <Text style={styles.turn}>
          {this.state.winner !== '' && [
            this.state.winner === 'X' ? 'Red - X won the game' : 'Blue - O won the game'
          ]}
          {this.state.winner === '' && [
            this.state.playerTurn === 'X' ? "Red - X player's turn" : "Blue - O player's turn"
          ]}
        </Text>
      </View>
    )
  }
}

GameBoard.propTypes = {
  size: propTypes.number,
  winningLength: propTypes.number
}
