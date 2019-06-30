import React, { Component } from 'react'
import { Alert, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import socketIO from 'socket.io-client'
import propTypes from 'prop-types'
import update from 'immutability-helper'
import Header from './header'
import Cell from './cell'
import { computer, gameOver } from '../scripts/AI'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Math.round(Dimensions.get('window').width) + 1,
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
  },
  back: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  bold: {
    fontWeight: 'bold'
  }
})

export default class GameBoard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      size: this.props.navigation.state.params.size,
      winningLength: this.props.navigation.state.params.winningLength,
      gameState: this.create2DArray(
        this.props.navigation.state.params.size,
        this.props.navigation.state.params.size
      ),
      gameMode: this.props.navigation.state.params.gameMode,
      gameReady: false,
      id: this.props.navigation.state.params.gameId || -1,
      name: this.props.navigation.state.params.name || '',
      playerTurn: 'X',
      winner: '',
      lastMove: [],
      winningLine: [],
      lineOrientation: ''
    }

    this.create2DArray = this.create2DArray.bind(this)
    this.checkVictory = this.checkVictory.bind(this)
    this.updateServer = this.updateServer.bind(this)
    this.computerMove = this.computerMove.bind(this)
    this.socketEvents = this.socketEvents.bind(this)

    if (this.state.gameMode === 'multiplayer') {
      this.socket = socketIO('https://x-o-mobile.herokuapp.com/', {
        transports: ['websocket'],
        jsonp: false
      })
      this.socketEvents()
    }
  }

  socketEvents() {
    this.socket.on('ready', data => {
      if (data) {
        this.setState(data.state, () => this.setState({ gameReady: false }))
        Alert.alert('Game is Ready', 'Wait for player X to make a move!', [{ text: 'Ok' }], {
          cancelable: false
        })
      } else {
        this.setState({ gameReady: true })
        Alert.alert('Game is Ready', 'Player O has joined the game!', [{ text: 'Start' }], {
          cancelable: false
        })
      }
    })
    this.socket.on('newState', data => {
      this.setState(data.state, () => {
        if (this.state.winner === '') this.setState({ gameReady: true })
      })
    })
    this.socket.on('gameUnavailable', () => {
      const { navigate } = this.props.navigation
      Alert.alert(
        'Game is unavailable',
        'Unable to join game, try to join an other game',
        [{ text: 'Return', onPress: () => navigate('Home') }],
        { cancelable: false }
      )
    })
    this.socket.on('opponentDisconnect', () => {
      const { navigate } = this.props.navigation
      Alert.alert(
        'Opponent left the game',
        'Unable to continue game because opponent disconnected!',
        [{ text: 'Return', onPress: () => navigate('Home') }],
        { cancelable: false }
      )
    })
    this.socket.on('connect_failed', () => {
      Alert.alert('Connection failed', 'Unable to connect to server!', [{ text: 'Ok' }], {
        cancelable: false
      })
    })
  }

  componentDidMount() {
    if (this.state.gameMode === 'multiplayer') {
      this.socket.connect()
      if (this.state.id === -1)
        this.socket.on('connect', () => {
          this.socket.emit('addGame', { state: this.state })
          this.socket.on('gameId', data => {
            this.setState({ id: data.id })
            Alert.alert(
              'Multiplayer',
              'Waiting for player to join the game!',
              [{ text: 'Exit', onPress: () => this.props.navigation.navigate('Home') }],
              { cancelable: false }
            )
          })
        })
      else
        this.socket.on('connect', () => {
          this.socket.emit('joinGame', { id: this.state.id })
          this.socket.on('updateGame', data => {
            this.setState({ state: data.state, gameReady: true })
          })
        })
    } else {
      this.setState({ gameReady: true })
    }
  }

  componentWillUnmount() {
    if (this.state.gameMode === 'multiplayer') {
      this.socket.close()
    }
  }

  createBoard = (state, onPress) => {
    const { size, gameState, lastMove, winningLine, lineOrientation } = state
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
            cellState={gameState[i][j]}
            handlePress={onPress}
            lastMove={lastMove}
            winningLine={winningLine}
            lineOrientation={lineOrientation}
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
    const { gameReady, gameState, gameMode, playerTurn } = this.state
    if (gameReady) {
      if (gameState[x][y] === 0 || !gameState[x][y]) {
        this.setState(
          {
            gameState: update(gameState, {
              [x]: { [y]: { $set: playerTurn } }
            }),
            gameReady: false,
            lastMove: [x, y]
          },
          () => {
            if (this.checkVictory())
              this.setState({ winner: playerTurn }, () => this.updateServer())
            else if (this.checkDraw()) this.setState({ winner: 'draw' }, () => this.updateServer())
            else if (gameMode === 'computer') this.computerMove()
            else this.changePlayerTurn(playerTurn)
          }
        )
      }
    }
  }

  computerMove() {
    const { gameState, size, winningLength, lastMove } = this.state

    const move = computer(gameState, size, winningLength, lastMove)
    const x = move[0]
    const y = move[1]

    this.setState(
      {
        gameState: update(this.state.gameState, {
          [x]: { [y]: { $set: 'O' } }
        }),
        lastMove: [x, y]
      },
      () => {
        if (this.checkVictory()) this.setState({ winner: 'O' })
        else if (this.checkDraw()) this.setState({ winner: 'draw' })
        else this.setState({ gameReady: true })
      }
    )
  }

  updateServer() {
    if (this.state.gameMode === 'multiplayer') this.socket.emit('updateGame', { state: this.state })
  }

  changePlayerTurn(playerTurn) {
    this.setState(playerTurn === 'X' ? { playerTurn: 'O' } : { playerTurn: 'X' }, () => {
      if (this.state.gameMode === 'multiplayer') this.updateServer()
      else this.setState({ gameReady: true })
    })
  }

  create2DArray(size) {
    const arr = new Array(size || 0)
    let i = size
    while (i--) arr[size - 1 - i] = new Array(size || 0)
    return arr
  }

  checkVictory() {
    const { gameState, size, winningLength, lastMove } = this.state
    const result = gameOver(gameState, size, winningLength, lastMove)
    if (result) {
      this.setState({ winningLine: result.winningLine, lineOrientation: result.lineOrientation })
      return true
    }
    return false
  }

  checkDraw() {
    for (let i = 0; i < this.state.size; i++) {
      for (let j = 0; j < this.state.size; j++) {
        if (!this.state.gameState[i][j]) return false
      }
    }
    return true
  }

  renderTurnText() {
    return (
      <Text style={styles.turn}>
        {this.state.winner !== '' && [
          this.state.winner === 'X'
            ? 'Red - X player won the game'
            : this.state.winner === 'O'
            ? 'Blue - O player won the game'
            : 'Game ended in a Draw'
        ]}
        {this.state.winner === '' && [
          this.state.playerTurn === 'X' ? "Red - X player's turn" : "Blue - O player's turn"
        ]}
      </Text>
    )
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Header />
        <View
          style={this.state.playerTurn === 'X' ? this.borderStyle('red') : this.borderStyle('blue')}
        >
          {this.createBoard(this.state, this.onPress)}
        </View>
        {this.renderTurnText()}
        <Text style={styles.turn}>{`Get ${this.state.winningLength} in a row to win`}</Text>
        <TouchableOpacity
          style={styles.back}
          onPress={() =>
            Alert.alert(
              'Exit Game',
              'Do you wish to leave the game?',
              [{ text: 'Leave', onPress: () => navigate('Home') }, { text: 'Cancel' }],
              { cancelable: false }
            )
          }
        >
          <Text style={styles.bold}>{this.state.winner === '' ? 'Resign' : 'Back'}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  borderStyle = color => {
    return {
      borderWidth: 5,
      borderColor: color
    }
  }
}

GameBoard.propTypes = {
  navigation: propTypes.object
}
