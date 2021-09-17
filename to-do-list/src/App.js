import './App.css';
import React, {useState} from 'react'
import data from './data.json'
import Header  from './header';
import ToDoList from './ToDoList'


function App() {
  const [toDoList,setToDOList] = useState(data)

  return (
    <div className="App">
      <Header/>
      <ToDoList toDoList ={toDoList}/>
    </div>
  );
}

export default App;