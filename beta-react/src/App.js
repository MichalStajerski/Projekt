import logo from './logo.svg'
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
          <Route path='/about' />
          <Route path='/'>
            <Gallery />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
