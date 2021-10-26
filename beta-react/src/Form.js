import React, { useEffect, useState } from 'react'

export default function Form () {
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
    return (
      <section>
        <label>First Name</label>
        <input value={person.firstName} onChange={handleFirstNameChange} /><br />
        <label>Last Name</label>
        <input value={person.lastName} onChange={handleLastNameChange} /><br />
        <label>Age</label>
        <input value={person.age} onChange={handleAgeChange} /><br />
        <p>
          {person.firstName}{' '}
          {person.lastName}{' '}
          ({person.age})
        </p>
      </section>
    )
  }
