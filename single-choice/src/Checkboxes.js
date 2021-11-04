import { useState } from 'react'
let nextId = 0

export default function Checkboxes ({ answer, answerList, onFilterAnswerChange, onFilterAnswerListChange }) {
  return (
    <section className='round'>
      <input
        id='yes'
        type='checkbox'
        // checked = {answer}
        onChange={e => onFilterAnswerChange(e.target.checked)}
        onClick={() => onFilterAnswerListChange([
          ...answerList,
          { id: nextId++, answer: answer }
        ])}
      />
      <label for='yes'>Yes</label>
      <input
        id='no'
        type='checkbox'
        //  checked = {answer}
        onChange={e => onFilterAnswerChange(e.target.checked)}
        onClick={() => onFilterAnswerListChange([
          ...answerList,
          { id: nextId++, answer: answer }
        ])}
      />
      <label for='no'>No</label>
      <ul>
        {answerList.map(singleanswer => (
          <li key={singleanswer.id}>{singleanswer.answer}</li>
        ))}
      </ul>
    </section>
  )
}
