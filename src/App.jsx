import { useState } from 'react'
import './App.css'

const TURNS = {
   X : "x",
   O : "o"
}

const WINCON = [
  [3,4,5],
  [0,1,2],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

const Square = ( {children, isSelected, updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = ()  => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className= {className}>
      {children}
    </div>
  )
}
function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  const [winner,setWinner] = useState(null);

  // Se revisan las combinaciones
  const checkWinner = (boardToCheck) => {
    for (const combo of WINCON) {
        const [a,b,c] = combo
        if (
          boardToCheck[a] &&
          boardToCheck[a] === boardToCheck[b] &&
          boardToCheck[a] === boardToCheck[c]
        ) {
          return boardToCheck[a]
        }
    }
    return null
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }
  const updateBoard = (index) => {
    //No actualizar si ya lleno
    if(board[index] || winner) return
    //Actualizar tablero
    const newBoard = [... board]
    newBoard[index] = turn
    setBoard(newBoard)
    //Cambiar turno
    const newTurn = turn  === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn);
    //Verificar si se ha ganado
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      alert(`El ganador es ${newWinner}`)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }  

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
  <main className='board'>
    <h1>Michi</h1>  
    <button onClick={resetGame}>
      Reset del Juego
    </button>
    <section className='game'>
      {
        board.map((_, index) => {
          return (
           <Square
            key = {index}
            index = {index}
            updateBoard={updateBoard}
            >
            {board[index]}
            </Square>
          )
        })
      }
    </section>

    <section className='turn'>
      <Square isSelected = {turn === TURNS.X}>
         {TURNS.X} 
         </Square>
      <Square isSelected = {turn === TURNS.O}>
         {TURNS.O} 
         </Square>
    </section>

    {
      winner !== null && (
        <section className='winner'>
          <div className='text'>
            <h2>
              {
                winner === false ?
                'Empate' :
                'Gano: '
              }
            </h2>  

            <header className='win'>
              {winner && <Square> {winner} </Square>}
            </header>
            <footer>
              <button onClick= {resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section> 
      )
    }
  </main>
  )
}

export default App
