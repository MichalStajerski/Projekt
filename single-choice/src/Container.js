import './App.css'
import Checkboxes from './Checkboxes'

export default function Container ({ question }) {
  return (
    <div className='Container'>
      <h5>{question}</h5>
      <Checkboxes />
    </div>
  )
}
