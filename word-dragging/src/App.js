
import './App.css';
import React from 'react'
import Dragula from 'react-dragula';

const sentences = [
  'تكون أو لا تكون',
  'Proszę Państwa Pan Paweł będzie skakał',
  'Jest tu jakiś cwaniak?',
  'Najlepsze kasztany są na placu Pigal w Paryżu',
  'Ryszard ty draniu oddaj rower'
]

const getRandomIntInclusive = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5)
const answersAreEqual = (answer,array) => array.includes(answer)

const drawnAnswer = getRandomIntInclusive(0, sentences.length - 1)
const words = sentences[drawnAnswer].trim().split(' ')
const wordsOrder = []

console.log('words',words)

function drawOrderOfWords () {
  for (let i = 0; i < words.length; i++) {
    wordsOrder.push(i)
  }
  shuffleArray(wordsOrder)
}

function checkAnswer(){
  const answer = document.getElementsByClassName('droptarget')
  const answerToArray = Array.from(answer)
  const wordsSet = answerToArray.map((word) => word.innerHTML).toString().replace(/,/g, ' ')
  answersAreEqual(wordsSet,sentences) ? 
    setTimeout(()=>{
      alert('Vicotry')
    },200)
    : 
    setTimeout(()=>{
      alert('wrong sentence')
    },200)
  console.log('comaprison',answersAreEqual(wordsSet,sentences))
}

class Board extends React.Component{
  render(){
    drawOrderOfWords()
    var numberOfWords = []
    for (let i = 0; i < words.length; i++) {
      numberOfWords.push(
        <div className = 'droptarget' id = {`word`+i}>
          {words[wordsOrder[i]]}
        </div>
      )
    }

    return(
      <div className = 'row'>
        <div className = 'column'>
          <h1 id = 'title'>Word Dragging</h1>
          <div className = 'wordsContainer' ref={this.dragulaDecorator}>
            {numberOfWords}
          </div>
        </div>      
      </div>
    )
  }
  dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = { };
      Dragula([componentBackingInstance], options);
    }
  }
}

class Game extends React.Component {  
  render(){
    return(
      <div>
        <Board/>
        <div class = 'row'>
          <button id ='btnCheck' className = 'glow-on-hover button-center' onClick = {checkAnswer}>Submit</button>
          <button className = 'glow-on-hover button-center' onClick= {() => window.location.reload()}>Reload</button>
        </div>
      </div> 
    )
  }
}

export default Game ;
