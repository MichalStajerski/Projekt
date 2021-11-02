import './App.css'
import { orders } from './orders'
import Order from './Order'
import SoundIcon from './SoundIcon'
import { useState } from 'react'
import OuterContainer from './OuterContainer'
import Checkboxes from './Checkboxes'
import { questions } from './questions'

function App () {
  const [answers, setAnswersList] = useState([])
  const [answer, setAnswer] = useState()
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
      {questions.map(question => (
        <OuterContainer
          question={question.content}
        />
      ))}
      {/* <SoundIcon/> */}
    </section>
  )
}

export default App
