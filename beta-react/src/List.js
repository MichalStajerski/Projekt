import React, { useEffect, useState } from 'react'
let nextId = 0

export default function List () {
    const [task, setTask] = useState('')
    const [list, setList] = useState([])

    return (
      <>
        <h1>List:</h1>
        <input
          value={task}
          onChange={e => setTask(e.target.value)}
        />
        <button onClick={() => {
          setList([
            ...list,
            { id: nextId++, task: task }
          ])
        }}
        >Add
        </button>
        <ul>
          {list.map(list => (
            <li key={list.id}>{list.task}</li>
          ))}
        </ul>
      </>
    )
  }