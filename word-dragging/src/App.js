
import './App.css';
import React, { useEffect, useState } from 'react'
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

function drawOrderOfWords () {
  for (let i = 0; i < words.length; i++) {
    wordsOrder.push(i)
  }
  shuffleArray(wordsOrder)
}

function CheckAnswer(){
  const answer = document.getElementsByClassName('droptarget')
  console.log('asnwer',answer)
  const answerToArray = Array.from(answer)
  const wordsSet = Array.from(answerToArray.map((word) => word.innerHTML))
  const finalSentence = answerToArray.map((word) => word.innerHTML).toString().replace(/,/g,' ')
  console.log('answerString',finalSentence)
  console.log('arrayFromWordSet',wordsSet)
  console.log(words)
  for (let i = 0; i < words.length; i++) {
    document.querySelector('#word'+i).style.backgroundColor = wordsSet[i] !== words[i] ? 'red' : 'silver'
  }
  if(answersAreEqual(finalSentence,sentences)){
    setTimeout(()=>{
      alert('Vicotry')
    },200)
  }else{
    setTimeout(()=>{
      alert('wrong sentence')
    },200)
  }
}

class Board extends React.Component{
  render(){
    drawOrderOfWords()
    var numberOfWords = []
    for (let i = 0; i < words.length; i++) {
      numberOfWords.push(
        <div className = 'droptarget' id = {`word`+wordsOrder[i]}>
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
          <button id ='btnCheck' className = 'glow-on-hover button-center' onClick = {CheckAnswer} >Submit</button>
          <button className = 'glow-on-hover button-center' onClick= {() => window.location.reload()}>Reload</button>
        </div>
      </div> 
    )
  }
}

export default Game ;
