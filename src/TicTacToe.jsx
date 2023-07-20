import { useState } from 'react'

const Grid = ({ handleSquareClick, squares }) => {
  return (
    <div className="grid">
      {[0, 3, 6].map((i) => {
        return (
          <div key={i} className="grid-row">
            {[0, 1, 2].map((j) => {
              return (
                <Square
                  key={j + i}
                  onSquareClick={() => handleSquareClick(j + i)}
                  value={squares[j + i]}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

const Square = ({ value, onSquareClick }) => {
  return <button onClick={onSquareClick}>{value}</button>
}

const GameInfo = ({ winner, history, xIsNext, moveBack, resetGame, setGame }) => {
  const isDraw = history.length > 9

  let status
  if (winner) {
    status = 'Winner: ' + winner
  } else if (isDraw) {
    status = 'Draw.'
  } else {
    status = 'Next: ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <div className="game-info">
      <div className="back-to-menu">
        <button className="btn" onClick={() => setGame(null)}>
          <svg
            fill="currentColor"
            height="100%"
            width="100%"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 26.676 26.676"
            xmlSpace="preserve"
          >
            <g>
              <path
                d="M26.105,21.891c-0.229,0-0.439-0.131-0.529-0.346l0,0c-0.066-0.156-1.716-3.857-7.885-4.59
		c-1.285-0.156-2.824-0.236-4.693-0.25v4.613c0,0.213-0.115,0.406-0.304,0.508c-0.188,0.098-0.413,0.084-0.588-0.033L0.254,13.815
		C0.094,13.708,0,13.528,0,13.339c0-0.191,0.094-0.365,0.254-0.477l11.857-7.979c0.175-0.121,0.398-0.129,0.588-0.029
		c0.19,0.102,0.303,0.295,0.303,0.502v4.293c2.578,0.336,13.674,2.33,13.674,11.674c0,0.271-0.191,0.508-0.459,0.562
		C26.18,21.891,26.141,21.891,26.105,21.891z"
              />
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </g>
          </svg>
        </button>
      </div>
      <h1>Tic-Tac-Toe</h1>
      <h3>{status}</h3>
      <div>
        {history.length > 1 && (
          <button className="btn" onClick={moveBack}>
            Back
          </button>
        )}
        {(isDraw || winner) && (
          <button className="btn" onClick={resetGame}>
            Reset
          </button>
        )}
      </div>
    </div>
  )
}

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
        history={history}
        winner={winner}
        xIsNext={xIsNext}
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
