import React, { Component } from 'react'
import { Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import propTypes from 'prop-types'

const screenWidth = Math.round(Dimensions.get('window').width)

export default class Cell extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.handlePress(this.props.x, this.props.y)}
        style={{
          width: screenWidth / this.props.size - 1,
          height: screenWidth / this.props.size - 1,
          borderRightWidth: 1,
          borderBottomWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:
            (this.props.lastMove[0] === this.props.x && this.props.lastMove[1] === this.props.y) ||
            this.props.winningLine.includes(`${this.props.x}${this.props.y}`)
              ? '#F0F040'
              : '#FFFFFF'
        }}
      >
        <Text
          style={
            this.props.cellState === 'X'
              ? { color: 'red', fontWeight: 'bold', fontSize: screenWidth / this.props.size }
              : { color: 'blue', fontWeight: 'bold', fontSize: screenWidth / this.props.size }
          }
        >
          {this.props.cellState}
        </Text>
        {this.props.winningLine.includes(`${this.props.x}${this.props.y}`) && this.renderLine()}
      </TouchableOpacity>
    )
  }

  renderLine() {
    return (
      <Image
        style={{
          width: screenWidth / this.props.size,
          height: screenWidth / this.props.size,
          position: 'absolute'
        }}
        source={
          this.props.lineOrientation === 'horizontal'
            ? require('../assets/horizontal-line.png')
            : this.props.lineOrientation === 'vertical'
            ? require('../assets/vertical-line.png')
            : this.props.lineOrientation === 'diagonal'
            ? require('../assets/diagonal-line.png')
            : require('../assets/diagonalback-line.png')
        }
      />
    )
  }
}

Cell.propTypes = {
  x: propTypes.number,
  y: propTypes.number,
  size: propTypes.number,
  cellState: propTypes.string,
  handlePress: propTypes.func,
  lastMove: propTypes.array,
  winningLine: propTypes.array,
  lineOrientation: propTypes.string
}
