import React from "react"
import Button from 'react-bootstrap/Button';

const TodoElement = ({todo, onDelete, onEdit}) => {
  return (
    <tr id={todo.id}>
      <td>{todo.description}</td>
      <td>{todo.deadline}</td>
      <td>{todo.percent_done}%</td>
      <td>
        <Button variant="primary" size="sm" onClick={() => onEdit(todo)}>Edit</Button>{' '}
        <Button variant="secondary" size="sm" onClick={() => onDelete(todo.id)}>Delete</Button>
      </td>
    </tr>
  )
}

export default TodoElement