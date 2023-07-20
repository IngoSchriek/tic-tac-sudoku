import { useEffect, useState } from 'react'
import './Sudoku.css'

const Grid = ({ squares, setSquares, running }) => {
  const onSquareChange = (e, i) => {
    const val = e.target.value[e.target.value.length - 1]

    if (val > 0) {
      squares[i] = val
    } else {
      squares[i] = ''
    }
    setSquares([...squares])
  }

  return (
    <div className="grid main-grid--sudoku">
      {[0, 9, 18, 27, 36, 45, 54, 63, 72].map((k) => {
        return (
          <div key={k} className="grid-row grid-row--sudoku  grid--sudoku">
            {[0, 3, 6].map((i) => {
              return (
                <div key={i} className="grid-row grid-row--sudoku">
                  {[0, 1, 2].map((j) => {
                    const index = j + i + k

                    return (
                      <Square
                        onSquareChange={(e) => onSquareChange(e, index)}
                        key={index}
                        value={squares[index]}
                        running={running}
                      />
                    )
                  })}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

const Square = ({ value, onSquareChange, running }) => {
  return (
    <input
      onFocus={(e) => e.target.select()}
      onKeyDown={(evt) => {
        ;['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
        ;['Backspace'].includes(evt.key) && onSquareChange(evt)
      }}
      onChange={onSquareChange}
      type="number"
      value={value}
      disabled={!running}
    />
  )
}

const Sudoku = ({ setGame }) => {
  const [time, setTime] = useState(0)
  const [squares, setSquares] = useState(Array(81).fill(''))
  const [completedSudoku, setCompletedSudoku] = useState(null)
  const [isValid, setIsValid] = useState(null)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    let interval = null
    !completedSudoku && generateSudoku()

    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [running, completedSudoku])

  const generateSudoku = () => {
    const sudokuArrays = [
      [
        '5',
        '3',
        '4',
        '6',
        '7',
        '2',
        '1',
        '9',
        '8',
        '6',
        '7',
        '8',
        '1',
        '9',
        '5',
        '3',
        '4',
        '2',
        '9',
        '1',
        '2',
        '3',
        '4',
        '8',
        '5',
        '6',
        '7',
        '8',
        '5',
        '9',
        '4',
        '2',
        '6',
        '7',
        '1',
        '3',
        '7',
        '6',
        '1',
        '8',
        '5',
        '3',
        '9',
        '2',
        '4',
        '4',
        '2',
        '3',
        '7',
        '9',
        '1',
        '8',
        '5',
        '6',
        '9',
        '6',
        '1',
        '2',
        '8',
        '7',
        '3',
        '4',
        '5',
        '5',
        '3',
        '7',
        '4',
        '1',
        '9',
        '2',
        '8',
        '6',
        '2',
        '8',
        '4',
        '6',
        '3',
        '5',
        '1',
        '7',
        '9',
      ],
      [
        '8',
        '3',
        '6',
        '2',
        '5',
        '7',
        '9',
        '1',
        '4',
        '5',
        '9',
        '4',
        '3',
        '6',
        '1',
        '7',
        '8',
        '2',
        '7',
        '1',
        '2',
        '4',
        '8',
        '9',
        '3',
        '6',
        '5',
        '7',
        '9',
        '2',
        '1',
        '6',
        '8',
        '5',
        '4',
        '3',
        '4',
        '3',
        '8',
        '2',
        '5',
        '7',
        '9',
        '1',
        '6',
        '1',
        '5',
        '6',
        '9',
        '3',
        '4',
        '8',
        '2',
        '7',
        '4',
        '2',
        '5',
        '6',
        '8',
        '9',
        '3',
        '7',
        '1',
        '8',
        '7',
        '3',
        '1',
        '4',
        '5',
        '6',
        '2',
        '9',
        '6',
        '9',
        '1',
        '2',
        '7',
        '3',
        '5',
        '4',
        '8',
      ],
      [
        '4',
        '3',
        '5',
        '6',
        '8',
        '2',
        '1',
        '9',
        '7',
        '2',
        '6',
        '9',
        '5',
        '7',
        '1',
        '8',
        '3',
        '4',
        '7',
        '8',
        '1',
        '4',
        '9',
        '3',
        '5',
        '6',
        '2',
        '8',
        '2',
        '6',
        '3',
        '7',
        '4',
        '9',
        '5',
        '1',
        '1',
        '9',
        '5',
        '6',
        '8',
        '2',
        '7',
        '4',
        '3',
        '3',
        '4',
        '7',
        '9',
        '1',
        '5',
        '6',
        '2',
        '8',
        '5',
        '1',
        '9',
        '2',
        '4',
        '8',
        '7',
        '6',
        '3',
        '3',
        '2',
        '6',
        '9',
        '5',
        '7',
        '4',
        '1',
        '8',
        '8',
        '7',
        '4',
        '1',
        '3',
        '6',
        '2',
        '5',
        '9',
      ],
    ]
    const newSquares = Array(81).fill('')
    const newCompletedSudoku = sudokuArrays[Math.floor(Math.random() * 3)]
    const randomQuantity = Math.floor(Math.random() * 10 + 20)
    for (let i = 0; i < randomQuantity; i++) {
      const randomIndex = Math.floor(Math.random() * 80)
      newSquares[randomIndex] = newCompletedSudoku[randomIndex]
    }

    setSquares(newSquares)
    setCompletedSudoku(newCompletedSudoku)
    setIsValid(null)
  }

  const randomHint = () => {
    if (JSON.stringify(squares) === JSON.stringify(completedSudoku)) {
      return
    }
    let randomIndex = Math.floor(Math.random() * squares.length)
    while (squares[randomIndex] === completedSudoku[randomIndex]) {
      randomIndex = Math.floor(Math.random() * squares.length)
    }

    squares[randomIndex] = completedSudoku[randomIndex]
    setSquares([...squares])
  }

  const ClockTime = () => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0')
    const seconds = (time % 60).toString().padStart(2, '0')
    return (
      <span className="time btn">
        {minutes}:{seconds}
      </span>
    )
  }

  return (
    <div className="game-row">
      <Grid squares={squares} setSquares={setSquares} running={running} />
      <div className="game-info">
        <div className="back-to-menu">
          <ClockTime />
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
        <h1>Sudoku</h1>

        {isValid ?? (
          <>
            <button onClick={randomHint} className="btn">
              Hint
              <svg
                width="62%"
                height="62%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.1"
                  d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  fill="currentColor"
                />
                <path
                  d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M10.5 8.67709C10.8665 8.26188 11.4027 8 12 8C13.1046 8 14 8.89543 14 10C14 10.9337 13.3601 11.718 12.4949 11.9383C12.2273 12.0064 12 12.2239 12 12.5V12.5V13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 16H12.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="btn"
              onClick={() => {
                setIsValid(calculateSudoku(squares))
                setRunning(false)
              }}
            >
              Verify!
            </button>
          </>
        )}
        {isValid !== null &&
          (isValid ? (
            <>
              <h2>Congratulations!</h2>
              <button
                className="btn"
                onClick={() => {
                  generateSudoku()
                  setRunning(true)
                  setTime(0)
                }}
              >
                New Sudoku
              </button>
            </>
          ) : (
            <>
              <h2>You are wrong!</h2>
              <button
                className="btn"
                onClick={() => {
                  setIsValid(null)
                  setRunning(true)
                }}
              >
                Try Again
              </button>
            </>
          ))}
      </div>
    </div>
  )
}

export default Sudoku

const calculateSudoku = (squares) => {
  const lines = []
  for (let i = 0; i < 9; i++) {
    let newGridSum = 0
    const gridStart = 9 * i

    newGridSum +=
      +squares[gridStart] +
      +squares[gridStart + 1] +
      +squares[gridStart + 2] +
      +squares[gridStart + 3] +
      +squares[gridStart + 4] +
      +squares[gridStart + 5] +
      +squares[gridStart + 6] +
      +squares[gridStart + 7] +
      +squares[gridStart + 8]

    lines.push(newGridSum)
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let newHorizontalSum = 0
      let newVerticalSum = 0
      for (let k = 0; k < 3; k++) {
        const gridHorizontalStart = k * 9 + j * 3 + 27 * i
        const gridVerticalStart = k * 27 + j + i * 9

        newHorizontalSum +=
          +squares[gridHorizontalStart] +
          +squares[gridHorizontalStart + 1] +
          +squares[gridHorizontalStart + 2]
        newVerticalSum +=
          +squares[gridVerticalStart] +
          +squares[gridVerticalStart + 3] +
          +squares[gridVerticalStart + 6]
      }
      lines.push(newHorizontalSum)
      lines.push(newVerticalSum)
    }
  }

  const isValid = lines.every((sum) => sum === 45)
  return isValid
}
