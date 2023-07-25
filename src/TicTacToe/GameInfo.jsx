import BackButton from '../utils/BackButton'

const GameInfo = ({ gameInfo, moveBack, resetGame, setGame }) => {
  const { winner, history, xIsNext } = gameInfo
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
        <BackButton setGame={setGame} />
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

export default GameInfo
