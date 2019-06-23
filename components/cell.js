import React, { Component } from 'react'
import { Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import propTypes from 'prop-types'

const screenWidth = Math.round(Dimensions.get('window').width)

export default class Cell extends Component {
  cellStyle = (size, x, y, lastMove, winningLine) => {
    return {
      width: screenWidth / size - 1,
      height: screenWidth / size - 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:
        (lastMove[0] === x && lastMove[1] === y) || winningLine.includes(`${x}${y}`)
          ? '#F0F040'
          : '#FFFFFF'
    }
  }

  lineStyle = size => {
    return {
      width: screenWidth / size,
      height: screenWidth / size,
      position: 'absolute'
    }
  }

  textStyle = (color, size) => {
    return {
      color,
      fontWeight: 'bold',
      fontSize: screenWidth / size
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.handlePress(this.props.x, this.props.y)}
        style={this.cellStyle(
          this.props.size,
          this.props.x,
          this.props.y,
          this.props.lastMove,
          this.props.winningLine
        )}
      >
        <Text
          style={
            this.props.cellState === 'X'
              ? this.textStyle('red', this.props.size)
              : this.textStyle('blue', this.props.size)
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
        style={this.lineStyle(this.props.size)}
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
