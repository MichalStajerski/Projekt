
import './App.css';
import ReactDom from 'react-dom';
import React, { useState, useEffect } from 'react'

const sentences = [
  'تكون أو لا تكون',
  'Proszę Państwa Pan Paweł będzie skakał',
  'Jest tu jakiś cwaniak?',
  'Najlepsze kasztany są na placu Pigal w Paryżu',
  'Ryszard ty draniu oddaj rower'
]

const getRandomIntInclusive = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5)

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

function insertWordIntoDiv (array) {
  for (let i = 0; i < array.length; i++) {
    document.querySelector('#word' + i).innerHTML = words[array[i]]
  }
}

class Board extends React.Component{

  handleClick(){

  }

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
          <div className = 'wordContainer'>
            {numberOfWords}
          </div>
        </div>      
      </div>
    )
  }  
}
const wordContainer = document.getElementsByClassName('wordContainer')
class Game extends React.Component {
  // dragula([wordContainer])
  
  render(){
    return(
      <div>
        <Board/>
      </div>
    )
  }
}

export default Game ;
