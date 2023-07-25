import {
  NEW_HINT,
  NEW_SQUARE,
  NEW_SUDOKU,
  VERIFY_SUDOKU,
  CONTINUE_SUDOKU,
  RESET_SUDOKU,
} from './actions'

const reducer = (state, action) => {
  const { squares, completedSudoku } = state
  if (action.type === NEW_SUDOKU) {
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
    return {
      ...state,
      squares: newSquares,
      isRunning: true,
      completedSudoku: newCompletedSudoku,
      isValid: null,
    }
  } else if (action.type === NEW_HINT) {
    if (JSON.stringify(squares) === JSON.stringify(completedSudoku)) {
      return { ...state }
    }
    let randomIndex = Math.floor(Math.random() * squares.length)
    while (squares[randomIndex] === completedSudoku[randomIndex]) {
      randomIndex = Math.floor(Math.random() * squares.length)
    }
    squares[randomIndex] = completedSudoku[randomIndex]
    return { ...state, squares: squares }
  } else if (action.type === VERIFY_SUDOKU) {
    return { ...state, isValid: calculateSudoku(squares), isRunning: false }
  } else if (action.type === NEW_SQUARE) {
    return { ...state, squares: action.payload }
  } else if (action.type === CONTINUE_SUDOKU) {
    return { ...state, isRunning: true, isValid: null }
  } else if (action.type === RESET_SUDOKU) {
    return { ...state, completedSudoku: null }
  }
}
export default reducer

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
