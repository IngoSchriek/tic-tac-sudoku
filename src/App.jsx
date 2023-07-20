import './App.css'
import TicTacToe from './TicTacToe'
import Sudoku from './Sudoku'
import { useState } from 'react'

const App = () => {
  const [game, setGame] = useState(null)
  return (
    <>
      {!game ? (
        <>
          <h1>Tic-Tac-Sudoku</h1>
          <div className="game-row">
            <button
              className="btn"
              onClick={() => setGame(<TicTacToe setGame={setGame} />)}
            >
              Play Tic-Tac-Toe
            </button>
            <button
              className="btn"
              onClick={() => setGame(<Sudoku setGame={setGame} />)}
            >
              Play Sudoku
            </button>
          </div>
        </>
      ) : (
        game
      )}
    </>
  )
}

export default App
