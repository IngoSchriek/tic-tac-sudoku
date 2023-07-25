import { useEffect, useState } from 'react'
import HintSVG from '../assets/HintSVG'
import BackButton from '../utils/BackButton'
import {
  NEW_HINT,
  NEW_SUDOKU,
  VERIFY_SUDOKU,
  CONTINUE_SUDOKU,
  RESET_SUDOKU,
} from '../utils/actions'

const GameInfo = ({
  dispatch,
  isValid,
  isRunning,
  completedSudoku,
  setGame,
}) => {
  return (
    <div className="game-info">
      <div className="back-to-menu">
        <ClockTime
          isRunning={isRunning}
          completedSudoku={completedSudoku}
          dispatch={dispatch}
        />
        <BackButton setGame={setGame} />
      </div>
      <h1>Sudoku</h1>

      {isValid ?? (
        <>
          <button onClick={() => dispatch({ type: NEW_HINT })} className="btn">
            Hint
            <HintSVG />
          </button>
          <button
            className="btn"
            onClick={() => dispatch({ type: VERIFY_SUDOKU })}
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
              onClick={() => dispatch({ type: RESET_SUDOKU })}
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
                dispatch({ type: CONTINUE_SUDOKU })
              }}
            >
              Try Again
            </button>
          </>
        ))}
    </div>
  )
}
export default GameInfo

const ClockTime = ({ completedSudoku, isRunning, dispatch }) => {
  const [time, setTime] = useState(0)
  useEffect(() => {
    let interval = null
    if (!completedSudoku) {
      dispatch({ type: NEW_SUDOKU })
      setTime(0)
    }
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isRunning, completedSudoku, dispatch])

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
