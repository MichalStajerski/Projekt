import './App.css'
import Checkboxes from './Checkboxes'
import { useState } from 'react'

export default function Container ({question, onFilterAnswerListChange }) {
  const [answers, setAnswers] = useState([])
  return (
    <div className='Container'>
      <h5>{question}</h5>
      <input
        id='yes'
        type='checkbox'
        // checked = {answer}
        onChange={e => setAnswers(
          {answer : true})}
        onClick={() => onFilterAnswerListChange([answers])}
      />
      
      <input
        id='no'
        type='checkbox'
        // checked = {answer}
        onChange={e => setAnswers(
          {answer : false})}
        onClick={() => onFilterAnswerListChange([answers])}
      />
      {/* {onFilterAnswerListChange([...answers])}   */}
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
