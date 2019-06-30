import React, { Component } from 'react'
import {
  Alert,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native'
import PropTypes from 'prop-types'
import DialogInput from 'react-native-dialog-input'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Math.round(Dimensions.get('window').width) + 1,
    backgroundColor: '#202020'
  },
  buttonCreate: {
    width: 80,
    position: 'absolute',
    right: 150,
    top: 60,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    borderWidth: 5,
    borderColor: '#303070',
    backgroundColor: '#3030A0'
  },
  buttonRefresh: {
    width: 80,
    position: 'absolute',
    right: 80,
    top: 60,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    borderWidth: 5,
    borderColor: '#303070',
    backgroundColor: '#3030A0'
  },
  buttonExit: {
    width: 80,
    position: 'absolute',
    right: 10,
    top: 60,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    borderWidth: 5,
    borderColor: '#303070',
    backgroundColor: '#3030A0'
  },
  text: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold'
  },
  smallText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  title: {
    position: 'relative',
    height: 60,
    paddingTop: 5,
    alignItems: 'center',
    backgroundColor: '#202060',
    borderWidth: 5,
    borderColor: '#303070',
    marginBottom: 55
  },
  game: {
    position: 'relative',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#606060',
    paddingLeft: 10,
    paddingBottom: 10
  },
  buttonJoin: {
    width: 80,
    position: 'absolute',
    right: 10,
    top: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    borderWidth: 5,
    borderColor: '#303070',
    backgroundColor: '#3030A0'
  }
})

export default class Multiplayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      size: this.props.navigation.state.params.size,
      winningLength: this.props.navigation.state.params.winningLength,
      isDialogVisible: false,
      isCancelled: false,
      games: {}
    }

    this.renderGame = this.renderGame.bind(this)
    this.fetchGameList = this.fetchGameList.bind(this)
  }

  componentDidMount() {
    if (!this.state.isCancelled) this.fetchGameList()
  }

  fetchGameList() {
    fetch(`https://x-o-mobile.herokuapp.com/`)
      .then(response => {
        return response.json()
      })
      .then(json => {
        this.setState({ games: json })
      })
      .catch(() =>
        Alert.alert('Network error!', 'Unable to fetch game list.', [{ text: 'OK' }], {
          cancelable: false
        })
      )
  }

  componentWillUnmount() {
    this.setState({ isCancelled: true })
  }

  renderGame = (game, key) => {
    const { navigate } = this.props.navigation
    const { size, winningLength } = this.state
    if (game.full) return
    return (
      <View style={styles.game} key={`game${key}`}>
        <Text style={styles.text}>{game.state.name}</Text>
        <Text style={styles.smallText}>
          Size {game.state.size}x{game.state.size}
        </Text>
        <Text style={styles.smallText}>Winning Length {game.state.winningLength}</Text>
        <TouchableOpacity
          style={styles.buttonJoin}
          onPress={() =>
            navigate('GameBoard', {
              size,
              winningLength,
              gameId: game.state.id,
              gameMode: 'multiplayer'
            })
          }
        >
          <Text style={styles.smallText}>Join</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { navigate } = this.props.navigation
    const { size, winningLength } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>Game List</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonCreate}
          onPress={() => this.setState({ isDialogVisible: true })}
        >
          <Text style={styles.smallText}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRefresh} onPress={() => this.fetchGameList()}>
          <Text style={styles.smallText}>Refresh</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonExit} onPress={() => navigate('Home')}>
          <Text style={styles.smallText}>Back</Text>
        </TouchableOpacity>
        <ScrollView>
          {Object.keys(this.state.games).map((key, i) => this.renderGame(this.state.games[key], i))}
        </ScrollView>
        <DialogInput
          isDialogVisible={this.state.isDialogVisible}
          title={'Choose Game Name'}
          message={'This name will be displayed for your game'}
          hintInput={'Name'}
          submitInput={name => {
            this.setState({ isDialogVisible: false }, () =>
              navigate('GameBoard', { name, size, winningLength, gameMode: 'multiplayer' })
            )
          }}
          closeDialog={() => {
            this.setState({ isDialogVisible: false })
          }}
        />
      </View>
    )
  }
}

Multiplayer.propTypes = {
  navigation: PropTypes.object
}
