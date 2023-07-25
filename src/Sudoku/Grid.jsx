import { NEW_SQUARE } from '../utils/actions'

const Grid = ({ squares, isRunning, dispatch }) => {
  const onSquareChange = (e, i) => {
    const val = e.target.value[e.target.value.length - 1]

    if (val > 0) {
      squares[i] = val
    } else {
      squares[i] = ''
    }

    dispatch({ type: NEW_SQUARE, payload: squares })
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
                        isRunning={isRunning}
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

const Square = ({ value, onSquareChange, isRunning }) => {
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
      disabled={!isRunning}
    />
  )
}

export default Grid
