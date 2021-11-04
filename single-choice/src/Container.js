import './App.css'
import Checkboxes from './Checkboxes'
import React, { useState, useCallback } from 'react'

export default function Container ({ question, answerList, onFilterAnswerListChange }) {
  const [answers, setAnswers] = useState([])

  return (
    <div className='Container'>
      <h5>{question}</h5>
      <input
        id= 'yes'
        type='checkbox'
        // disabled = {document.getElementById(question + 'no').checked ? true : false}
        onChange={() => setAnswers(true)}
        onClick={() => onFilterAnswerListChange([...answerList,
        {question :question,
        value : answers }])}
      />
      <input
        id='no'
        type='checkbox'
        // disabled = {document.getElementById(question + 'no').checked ? true : false}
        onChange={() => setAnswers(false)}
        onClick={() => onFilterAnswerListChange([...answerList,
          {question :question,
          value : answers}])}
      />
      {console.log(answers)}
      {/* <Checkboxes
        answer={answer}
        answerList={answerList}
        onFilterAnswerChange={onFilterAnswerChange}
        onFilterAnswerListChange={onFilterAnswerListChange}
      /> */}
    </div>
  )
}
