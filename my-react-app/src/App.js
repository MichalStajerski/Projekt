import './App.css'
import React from 'react'
import ReactDOM from 'react-dom'

const allSquaresTaken = (array) => array.every(el => el !== null) //checks if all squares have a sign in it

function Square (props) {
  return (
    <button className='square' onClick={props.onClick}> {props.value}</button>
  )
}

class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      XIsNext: true
    }
  }

  handleClick (i) {
    const squares = this.state.squares.slice()
    if (checkWinner(squares || squares[i])) {
      return
    }
    if (this.state.squares[i] === null) {
      squares[i] = this.state.XIsNext ? 'X' : 'O'
      this.setState({
        squares: squares,
        XIsNext: !this.state.XIsNext
      })
    }
  }

  renderSquare (i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    )
  }

  render () {
    const winner = checkWinner(this.state.squares)
    let status
    winner ? status = winner + ' Won' : status = 'Next move ' + (this.state.XIsNext ? 'X' : 'O')
    if (!winner && allSquaresTaken(this.state.squares)) { //if there is no winner and all squares are taken change status to draw
      status = 'Draw'
    }
    return (
      <div>
        <div className='status'>{status}</div>
        <div className='board-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='board-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='board-row'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

function checkWinner (squares) {
  const wins = [ //combinations for win
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < wins.length; i++) {
    const [a, b, c] = wins[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log('squares',wins[i])
      return squares[a]
    }
  }
  return null
}

class Game extends React.Component {
  render () {
    return (
      <div className='game'>
        <div className='game-board'>
          <Board />
        </div>
      </div>
    )
  }
}

let root = document.getElementById('root')
let testObject = document.createElement('div')
testObject.id = 'testObject'
root.appendChild(testObject)
let foundObject = document.querySelector('#testObject')
console.log('foundObejct',foundObject)
foundObject.className = 'xd'
ReactDOM.render(
  <Game />,
  document.getElementById('root')
)

export default Game

// TODO
// can look to add option of sending a request to redo last move
// make a choice to play against another player or against a computer
// can make a scoreboard to keep the track of the wins and loses between players
// can highlight squares that got the win
