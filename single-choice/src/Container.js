import './App.css'
import Checkboxes from './Checkboxes'
import React, { useState, useCallback } from 'react'

export default function Container ({ question, onFilterAnswerListChange }) {
  const [answers, setAnswers] = useState([])
  const [disable, setDisable] = useState(false)

  return (
    <div className='Container'>
      <h5>{question}</h5>
      <input
        id='yes'
        type='checkbox'
        // disabled = {document.getElementById('no').checked ? true : false}
        onChange={e => setAnswers(
          { answer: true })}
        onClick={() => onFilterAnswerListChange(answers)}
      />
      <input
        id='no'
        type='checkbox'
        onChange={e => setAnswers(
          { answer: false })}
        onClick={() => onFilterAnswerListChange(answers)}
      />
      {console.log(Object.values(answers))}
      {/* <Checkboxes
        answer={answer}
        answerList={answerList}
        onFilterAnswerChange={onFilterAnswerChange}
        onFilterAnswerListChange={onFilterAnswerListChange}
      /> */}
    </div>
  )
}
