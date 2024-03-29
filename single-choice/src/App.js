import './App.css'
import { orders } from './orders'
import Order from './Order'
import SoundIcon from './SoundIcon'
import { useState } from 'react'
import Container from './Container'
import Checkboxes from './Checkboxes'
import { questions } from './questions'

function App () {
  const [answerList, setAnswersList] = useState([])
  function Check() {
    const test = questions.map(question => (question.answer))
    questions === answerList ? console.log('Correct') : console.log('Wrong')
    console.log(Object.values(answerList))
 }
  return (
    <section>
      <h1>Polecenie:</h1>
      {orders.map(singleOrder => (
        singleOrder.id === 0
          ? <Order
              key={singleOrder.id}
              order={singleOrder.order}
            />
          : null
      ))}
      {/* <SoundIcon/> */}
      <div className='outerContainer'>
        {questions.map(question => (
          <Container
            question={question.content}
            // answer={answer}
            answerList={answerList}
            // onFilterAnswerChange={setAnswer}
            onFilterAnswerListChange={setAnswersList}
          />
        ))}
      </div>
      <button onClick = {Check} >Check</button>

      {console.log('answerList', answerList)}
      {/* {console.log('answerList', Object.entries(answerList))} */}
    </section>
  )
}

export default App
