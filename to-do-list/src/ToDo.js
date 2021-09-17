import React from "react";

const ToDo = ({todo,handleToggle}) => {
    const handleClick = (e) => {
        e.preventDefault()
        handleToggle(e.currentTarget.id)
    }
    return (
        <div onClick={handleClick} className ={todo.complete ? 'strike' : ''}>
            {todo.task}
        </div>
    )
} 

export default ToDo