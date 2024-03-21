import React from 'react'
import Todo from './Todo'


const  TodoList = (props) => {
  return (
      <div>
        <h1>Todos:</h1>
        {props.data.map(item => (

          <Todo toggleItem={() => props.toggleItem(item.id)} key={item.id} item={item} hide={props.hide} />
        ))}
      </div>
    )
  }


export default TodoList