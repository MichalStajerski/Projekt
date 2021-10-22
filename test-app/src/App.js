import logo from './logo.svg'
import './App.css'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const fetchApiData = () => {
  const currentUrl = new URL(window.location)
  const port = +currentUrl.searchParams.get('rest_port') || 8001
  const url = 'https://jsonplaceholder.typicode.com/users'
  return fetch(url)
    .then(response => response.json())
    .then(response => ({ ...response, port, url }))
}

function App () {
  function About () {
    const [apiData, setapiData] = useState(null)
    useEffect(() => {
      fetchApiData()
        .then(setapiData)
        .catch(err => setapiData(err => setapiData({ error: err.toString() })))
        // const response = await fetch(`https://jsonplaceholder.typicode.com/users`)
    }, [])

    return (
      <div>
        <h1>Data from API</h1>
        {/* display apiData from the API */}
        {apiData && (<pre>{JSON.stringify(apiData, null, ' ')}</pre>)}
      </div>
    )
  }

  function Home () {
    return <h2>Sweet home Alabama</h2>
  }
  return (
    <Router>
      <div>
        <nav>
          <button>
            <Link to='/'>Home</Link>
          </button>
          <br />
          <button>
            <Link to='/about'>About</Link>
          </button>
        </nav>
        <Switch>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
