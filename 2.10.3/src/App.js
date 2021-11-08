import React, { Component, useState } from 'react'
import './App.css'
import { toppings } from './toppings'
const n = 2;

class Example extends React.Component {

  constructor() {
    super();
    this.state = {
      // checked/unchecked is stored here
      // initially the first one is checked:
      // [true, false, false]
      checkboxes: new Array(n).fill(false),
    };
  }
  onChange(e, changedIndex) {
    // it is a good habit to extract things from event variable
    const { checked } = e.target;
    
    this.setState(state => ({
      // this lets you unselect all.
      // but selected can be anly one at a time
      checkboxes: state.checkboxes.map((_, i) => i === changedIndex ? checked : false),
    }));
    // setAnswer( {value : checked})
  }
  render() {
    const { checkboxes } = this.state;
    
    return (
      <div>
        {checkboxes.map((item, i) => (
          <input
            key={i}
            type="checkbox"
            checked={item}
            onChange={e => this.onChange(e, i) /* notice passing an index. we will use it */}
          />
        ))}
      </div>
    );
  }
}

export default function App () {
const [answer, setAnswer] = useState([])

 return(
   <section>
     <Example/>
   </section>
 )
}
