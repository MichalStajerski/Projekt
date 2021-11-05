import './App.css'
import Checkboxes from './Checkboxes'
import React, { useState, useCallback } from 'react'

export default function Container ({ question, answerList, onFilterAnswerListChange }) {
  const [answers, setAnswers] = useState([])

  function selectOnlyThis(id,question, value){
    var myCheckbox = document.getElementsByName("myCheckbox");
    Array.prototype.forEach.call(myCheckbox,function(el){
      el.checked = false;
    });
    id.checked = true;

    onFilterAnswerListChange([...answerList,
      {
        content: question,
        answer: true
      }])
  }

  // const onChangeAttribute = (value) => {
  //   console.log(value);
  //   setCheckBoxChecked(value);
  // };

  return (
    <div className='Container'>
      <h5>{question}</h5>
      <input
        id='yes'
        name = 'myCheckBox'
        type='checkbox'
        onChange={() => setAnswers(true)}
        onClick={() => selectOnlyThis(this.id, question, true)}
      />
      <input
        id='no'
        type='checkbox'
        // disabled = {document.getElementById(question + 'no').checked ? true : false}
        onChange={e => setAnswers(false)}
        onClick={() => selectOnlyThis(this.id, question, false)}
      />
      {/* {console.log(answers)} */}
      {/* <Checkboxes
        answer={answer}
        answerList={answerList}
        onFilterAnswerChange={onFilterAnswerChange}
        onFilterAnswerListChange={onFilterAnswerListChange}
      /> */}
    </div>
  )
}
