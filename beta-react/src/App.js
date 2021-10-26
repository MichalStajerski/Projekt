import './App.css'
import Profile from './Profile'
import { people } from './data'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

export default function App () {
  function Gallery () {
    return (
      <section>
        {people.map(person => (
          <Profile
            key={person.id}
            name={person.name}
            imageId={person.imageId}
          />
        ))}
      </section>
    )
  }

  function Form () {
    const [person, setPerson] = useState({
      firstName: 'Zosia',
      lastName: 'Samosia',
      age: 23
    })
    function handleFirstNameChange (e) {
      setPerson({
        ...person,
        firstName: e.target.value
      })
    }
    function handleLastNameChange (e) {
        setPerson({
          ...person,
          lastName: e.target.value
        })
      }
      function handleAgeChange (e) {
        setPerson({
          ...person,
          age: e.target.value
        })
      }
    return(
        <section>
          <label>First Name</label>
          <input value = {person.firstName} onChange = {handleFirstNameChange}></input><br/>
          <label>Last Name</label>
          <input value = {person.lastName} onChange = {handleLastNameChange}></input><br/>
          <label>Age</label>
          <input value = {person.age} onChange = {handleAgeChange}></input><br/>
          <p>
            {person.firstName}{' '}
            {person.lastName}{' '}
            ({person.age})
          </p>
        </section>
    )
  }

  return (
    <Router>
      <div>
        <nav>
          <button>
            <Link to='/'>Gallery</Link>
          </button>
          <br />
          <button>
            <Link to='/about'>About</Link>
          </button>
        </nav>
        <Switch>
          <Route path='/about'>
            <Form />
          </Route>
          <Route path='/'>
            <Gallery />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
