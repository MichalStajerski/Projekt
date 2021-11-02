import './App.css'
import Checkboxes from './Checkboxes'

export default function OuterContainer ({ question }) {
  return (
    <div className='OuterContainer'>
      <h5>{question}</h5>
      <Checkboxes />
    </div>
  )
}
