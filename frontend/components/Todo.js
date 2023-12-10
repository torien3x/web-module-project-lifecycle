import React from 'react'

const Todo = (props) => {
  return (
    <>
      {props.hide && props.item.completed
        ? null
        :
        <div onClick={() => props.toggleItem(props.item.id)}>
            {props.item.name} {props.item.completed ? "✔️" : null}
        </div>
       }
    </>
  )
}


export default Todo