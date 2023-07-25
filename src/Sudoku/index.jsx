import './Sudoku.css'
import GameInfo from './GameInfo'
import Grid from './Grid'
import { useReducer } from 'react'
import reducer from '../utils/reducer'

const defaultState = {
  isValid: null,
  isRunning: true,
  squares: Array(81).fill(''),
  completedSudoku: null,
}

const Sudoku = ({ setGame }) => {
  const [state, dispatch] = useReducer(reducer, defaultState)

  return (
    <div className="game-row">
      <Grid
        dispatch={dispatch}
        isRunning={state.isRunning}
        squares={state.squares}
      />
      <GameInfo
        dispatch={dispatch}
        isRunning={state.isRunning}
        isValid={state.isValid}
        completedSudoku={state.completedSudoku}
        setGame={setGame}
      />
    </div>
  )
}

export default Sudoku
