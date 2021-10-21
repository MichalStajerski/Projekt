import logo from './logo.svg'
import './App.css'
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [dataApi, setdataApi] = useState(null);

  function About() {
    useEffect(() => {
      getData();
  
      // we will use async/await to fetch this data
      async function getData() {
        const currentUrl = new URL(window.location)
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
  
        // store the data into our dataApi variable
        setdataApi(data) ;
      }
    }, [])
  
    return (
      <div>
      <h1>Data from API</h1>
  
      {/* display dataApi from the API */}
      {dataApi && (
        <div className="dataApi">        
          {/* loop over the dataApi */}
          {dataApi.map((data, index) => (
            <div key={index}>
              {/* <h3>{`${Object.keys(data)}`}</h3> */}
              <h3>{`${Object.keys(data)}`}</h3>
              <h4>{`${Object.values(data)}`}</h4><br></br>
            </div>
          ))}
        </div>
      )}
    </div>
  )
  }

  function Home() {
    return <h2>Home</h2>
  }
  return (
    <Router>
      <div>
        <nav>
            <button>
            <Link to="/">Home</Link>
            </button>
            <br></br>
          <button>
              <Link to="/about">About</Link>
          </button>
        </nav>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// function About() {
//   const currentUrl = new URL(window.location)
//   const port = +currentUrl.searchParams.get('rest_port') || 8001
//   console.log('our port',port)
//   fetch(`https://jsonplaceholder.typicode.com/users`)
//     .then(res => res.json())
//     .then(res => alert(JSON.stringify({...res,port})))
//     .catch(err => console.error(err))

//   return <h2>About</h2>
// }

export default App


// import logo from './logo.svg'
// import './App.css'

// import React, { useEffect, useState } from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

// function App() {
//   const [dataApi, setdataApi] = useState(null);

//   // + adding the use
//   useEffect(() => {
//     getData();

//     // we will use async/await to fetch this data
//     async function getData() {
//       const currentUrl = new URL(window.location)
//       const response = await fetch("https://jsonplaceholder.typicode.com/users");
//       const data = await response.json();

//       // store the data into our dataApi variable
//       setdataApi(data) ;
//     }
//   }, [])

//   return (
//     <div>
//     <h1>Data from API</h1>

//     {/* display dataApi from the API */}
//     {dataApi && (
//       <div className="dataApi">        
//         {/* loop over the dataApi */}
//         {dataApi.map((data, index) => (
//           <div key={index}>
//             {/* <h3>{`${Object.keys(data)}`}</h3> */}
//             <h4>{`${Object.entries(data)}`}</h4><br></br>
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
// )
// }

// export default App
