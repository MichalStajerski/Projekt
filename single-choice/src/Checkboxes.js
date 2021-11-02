import { useState } from 'react'
let nextId = 0

export default function Checkboxes ({answerList}) {
  return (
    <section className = 'round'>
      <input id='yes' type='checkbox'/>
      <label for='yes'>Yes</label>
      <input id='no' type='checkbox'/>
      <label for='no'>No</label>
      {/* <ul>
        {answers.map(singleanswer => (
          <li key = {singleanswer.id}>{singleanswer.answer}</li>
        ))}
      </ul> */}
    </section>
  )
}
