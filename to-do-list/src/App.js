import './App.css';
import React, {useState} from 'react'
import data from './data.json'
import Header  from './header';
import ToDoList from './ToDoList'


function App() {
  const [toDoList,setToDoList] = useState(data)
  const handleToggle = (id) => {
    let mapped = toDoList.map(task => {
      return task.id == id ? { ...task, complete: !task.complete } : { ...task};
    });
    setToDoList(mapped);
  }

  return (
    <div className="App">
      <Header/>
      <ToDoList toDoList ={toDoList} handleToggle = {handleToggle}/>
    </div>
  );
}

export default App;