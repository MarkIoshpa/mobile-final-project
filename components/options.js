import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import Slider from '@react-native-community/slider'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    width: Math.round(Dimensions.get('window').width) + 1,
    backgroundColor: '#202020'
  },
  header: {
    color: '#FFFFFF',
    fontFamily: 'cursive',
    fontSize: 40,
    fontWeight: 'bold',
    paddingBottom: 60
  },
  text: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold'
  },
  slider: {
    width: 300,
    height: 80
  },
  option: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  button: {
    width: 120,
    height: 55,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    margin: 20
  },
  botPadStyle: {
    paddingBottom: 40
  },
  textButton: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold'
  }
})

export default class Options extends Component {
  constructor(props) {
    super(props)
    this.state = {
      size: this.props.navigation.state.params.size,
      winningLength: this.props.navigation.state.params.winningLength
    }

    this.onPress = this.onPress.bind(this)
  }

  onPress(size, winningLength) {
    let wl = winningLength
    if (winningLength > size) wl = size
    this.props.navigation.state.params.handleSave(size, wl)
    this.props.navigation.navigate('Home')
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{'Options'}</Text>
        <View style={styles.botPadStyle}>
          <View style={styles.option}>
            <Text style={styles.text}>Board Size</Text>
            <Text style={styles.text}>{this.state.size}</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={3}
            maximumValue={12}
            step={1}
            value={this.props.navigation.state.params.size}
            onValueChange={size => this.setState({ size })}
          />
          <View style={styles.option}>
            <Text style={styles.text}>Winning Length</Text>
            <Text style={styles.text}>{this.state.winningLength}</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={3}
            maximumValue={8}
            step={1}
            value={this.props.navigation.state.params.winningLength}
            onValueChange={winningLength => this.setState({ winningLength })}
          />
        </View>
        <View style={styles.option}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onPress(this.state.size, this.state.winningLength)}
          >
            <Text style={styles.textButton}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigate('Home')}>
            <Text style={styles.textButton}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

Options.propTypes = {
  navigation: PropTypes.object
}
