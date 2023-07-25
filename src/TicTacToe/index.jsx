import { useState } from 'react'
import GameInfo from './GameInfo'
import Grid from './Grid'

const TicTacToe = ({ setGame }) => {
  const [history, setHistory] = useState(Array(1).fill(Array(9).fill(null)))
  const [squares, setSquares] = useState(Array(9).fill(null))
  const xIsNext = history.length % 2 === 1
  const winner = calculateWinner(squares)

  const resetGame = () => {
    setHistory(history.slice(0, 1))
    setSquares(history[0])
  }

  const moveBack = () => {
    const currentSquares = history[history.length - 2]

    setHistory([...history.slice(0, history.length - 1)])
    setSquares(currentSquares)
  }

  const onPlay = (i) => {
    if (squares[i] || winner) {
      return
    }

    const newSquares = [...squares]
    xIsNext ? (newSquares[i] = 'X') : (newSquares[i] = 'O')
    setHistory([...history, newSquares])
    setSquares(newSquares)
  }

  return (
    <div className="game-row">
      <Grid handleSquareClick={onPlay} squares={squares} />
      <GameInfo
        gameInfo={{ winner, history, xIsNext }}
        moveBack={moveBack}
        resetGame={resetGame}
        setGame={setGame}
      />
    </div>
  )
}

export default TicTacToe

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}
