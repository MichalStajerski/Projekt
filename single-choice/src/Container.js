import './App.css'
import Checkboxes from './Checkboxes'
import { useState } from 'react'


export default function Container ({ question, answerList }) {
  return (
    <div className='Container'>
      <h5>{question}</h5>
      <Checkboxes 
        answerList = {answerList}
      />
    </div>
  )
}
