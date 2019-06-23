import Menu from './components/menu'
import Options from './components/options'
import GameBoard from './components/gameBoard'
import Multiplayer from './components/multiplayer'
import { createStackNavigator, createAppContainer } from 'react-navigation'

const MainNavigator = createStackNavigator(
  {
    Home: { screen: Menu },
    Options: { screen: Options },
    GameBoard: { screen: GameBoard },
    Multiplayer: { screen: Multiplayer }
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
)

const AppContainer = createAppContainer(MainNavigator)

export default AppContainer
