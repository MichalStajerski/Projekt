import './App.css'
import Profile from './Profile'
import { people } from './data'
import List from './List'
import Form from './Form'
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

  return (
    <Router>
      <div>
        <nav>
          <button>
            <Link to='/'>Gallery</Link>
          </button>
          <br />
          <button>
            <Link to='/form'>Form</Link>
          </button>
          <br />
          <button>
            <Link to='/list'>List</Link>
          </button>
        </nav>
        <Switch>
          <Route path='/form'>
            <Form />
          </Route>
          <Route path='/list'>
            <List />
          </Route>
          <Route path='/'>
            <Gallery />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
