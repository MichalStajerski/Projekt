
import './App.css';
import React, { useEffect, useState } from 'react'
import Dragula from 'react-dragula';
import dragula from 'dragula';

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
const wordsOrder = shuffleArray([...Array(words.length).keys()]) // fills array with number from 0 to words.length - 1, then shuffles it

function CheckAnswer(setDisable){
  const answer = document.getElementsByClassName('droptarget')
  const answerToArray = Array.from(answer)
  const wordsSet = Array.from(answerToArray.map((word) => word.innerText))
  const finalSentence = answerToArray.map((word) => word.innerText).toString().replace(/,/g,' ')
  for (let i = 0; i < words.length; i++) {
    document.querySelector(`#word${i}`).style.backgroundColor = wordsSet[i] !== words[i] ? 'red' : 'silver'
  }

  if(sentences[drawnAnswer] === finalSentence){
    dragula([].slice.apply(document.querySelectorAll('.wordsContainer')),{
     accepts: (target, source) => {
       if (!target || !source || (target != source)) {
         return false;
       } else {
         return true;
       }
     }
   });
   setTimeout(()=>{alert('Victory')},200)
   setDisable(true)
  }else{
    setTimeout(()=>{alert('wrong sentence')},200)
  }
}

class Board extends React.Component{
  render(){
    var numberOfWords = []
    for (let i = 0; i < words.length; i++) {
      numberOfWords.push(
        <div className = 'droptarget' id = {`word${wordsOrder[i]}`}>
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

function Game() {
  const [disable,setDisable] = useState(false)
    return(
      <div>
        <Board/>
        <div class = 'row'>
          <button id ='btnCheck' className = 'glow-on-hover button-center' disabled ={disable}  onClick = {() => CheckAnswer(setDisable)} >Submit</button>
          <button className = 'glow-on-hover button-center' onClick= {() => window.location.reload()}>Reload</button>
        </div>
      </div> 
    )
}

export default Game ;
