import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-dom/test-utils';

// class Square extends React.Component {
//   // constructor(props){
//   //   super(props);
//   //   this.props = {
//   //     value : null,
//   //   };
//   // }
//   render() {
//     return (
//       <button 
//         className="square" 
//         onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

function Square (props){
  return (
    <button className="square" onClick= {props.onClick}> {props.value}</button>
  )
}

class Board extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      squares : Array(9).fill(null), 
      XIsNext: true
    }
  }
  handleClick(i){
    const squares = this.state.squares.slice()
    if(checkWinner(squares || squares[i])){
      return
    } 
    if(this.state.squares[i] === null ){
      squares[i] = this.state.XIsNext ? 'X' : 'O'
      this.setState({
        squares : squares,
        XIsNext: !this.state.XIsNext,
      });
    }
  }

  renderSquare(i){
    return <Square value={this.state.squares[i]}
    onClick = {() => this.handleClick(i)}/>
  }
  render() {
    const winner = checkWinner(this.state.squares)
    let status 
    winner ? status ='Won' + winner : status = 'Next move' + (this.state.XIsNext ? 'X' : 'O')
   
    //const status = 'Next move: ' + (this.state.XIsNext ? 'X' : 'O')
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

const arraysAreual = (array1, array2) => array1.every(el => array2.includes(el)) 

function checkWinner(squares){
  const wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  for(let i =0;i<wins.length;i++){
    const [a,b,c] = wins[i]
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a]
    }
  }
  return null
}

class Game extends React.Component {
  render(){
    return (
    <div className="game">
      <div className="game-board">
        <Board/>
      </div>
      <div className="game-info">

      </div>
    </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

export default Game;
