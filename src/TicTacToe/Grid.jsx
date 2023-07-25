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
  
  export default Grid