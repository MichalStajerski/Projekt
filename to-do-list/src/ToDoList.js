import React from 'react'
import ToDo from './ToDo'

const ToDoList = ({ toDoList, handleToggle, handleFilter }) => {
  return (
    <div>
      {toDoList.map(todo => {
        return (
          <ToDo todo={todo} handleToggle={handleToggle} handleFilter={handleFilter} />
        )
      })}
      <label for='clear completed tasks' className='visuallyhidden' />
      <button id='clearTask' aria-label='clear button' aria-required='true' name='clear all completed tasks' style={{ margin: '20px' }} onClick={handleFilter}>Clear completed tasks</button>
    </div>
  )
}

export default ToDoList
