import React, { useState } from "react";

const ToDoForm = ({addTask}) =>{
    const [userInput,setUserInput] = useState('')

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        addTask(userInput)
        setUserInput('')
    }
    return(
        <form onSubmit = {hnadleSubmit}>
            <input value = {userInput} type='text' onChange = {handleChange} placeholder= "Enter task" ></input>
            <button>Submit new Task</button>
        </form>
    )
}