import logo from './logo.svg'
import './App.css'
import React, { useState } from 'react'
import data from './data.json'
import Header from './Header'
import ToDoList from './ToDoList'
import ToDoForm from './ToDoForm'

function App () {
  const [toDoList, setToDoList] = useState(data)
  const handleToggle = (id) => {
    const mapped = toDoList.map(task => {
      return task.id == id ? { ...task, complete: !task.complete } : { ...task }
    })
    setToDoList(mapped)
  }

  const handleFilter = () => {
    const filtered = toDoList.filter(task => {
      return !task.complete
    })
    setToDoList(filtered)
    setTimeout(() => {
      alert('You cleared completed tasks!')
    }, 500)
  }

  const addTask = (userInput) => {
    let copy = [...toDoList]
    copy = [...copy, { id: toDoList.length + 1, task: userInput, complete: false }]
    setToDoList(copy)
  }

  return (
    <div className='App'>
      <img src={logo} className='App-logo' alt='logo' />
      <Header />
      <ToDoList toDoList={toDoList} handleToggle={handleToggle} handleFilter={handleFilter} />
      <ToDoForm addTask={addTask} />
    </div>
  )
}

export default App
