import React, { useState } from "react"
import TodoElement from "../components/todo-element"

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import TodoModal from "../components/todo-modal";


const IndexPage = () => {
  // call an api with axios on page load
  React.useEffect(() => {
    // axios.get("https://jsonplaceholder.typicode.com/todos")
    //   .then(response => {
    //     console.log(response.data)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  }, [])

  // state with todos
  const [todos, setTodos] = React.useState([
    {id: 1, name: "Test Todo1s", date: "2023-01-01", percent: "12"},
    {id: 2, name: "Test Todos2", date: "2023-04-20", percent: "14"},
    {id: 3, name: "Test Todos3", date: "2023-03-23", percent: "16"},
  ])

  // modal state
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    percent: ""
  })

  function handleClose() {
    setShow(false);
    setFormData({name: "", date: "", percent: ""})
  }
  const handleShow = () => setShow(true);

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id != id))
  }

  function addTodo() {
    // check if formDate has an id
    if(formData.id) {
      // update todo
      let ind = todos.findIndex((todo => todo.id == formData.id))
      todos[ind] = formData
      setTodos([...todos])

    } else {
    setTodos([...todos, {id: todos.length+1, ...formData}])
    }
    setFormData({name: "", date: "", percent: ""})
  }

  function handleChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  function editTodo(todo) {
    setFormData(todo)
    handleShow()
  }

  const todoElements = todos.map(todo => 
    <TodoElement key={todo.id} todo={todo} onDelete={deleteTodo} onEdit={editTodo}/>
  )


  return (
    <Container className="py-3">
      <h1>
        ToDos
      </h1>
      <table className="table table-striped table-bordered">
       <thead>
        <tr>
          <th>Description</th>
          <th>Time</th>
          <th>Percent done</th>
          <th>Actions</th>
        </tr>
       </thead>
       <tbody id="todo_table">
        {todoElements}
       </tbody>
      </table>
      <Button variant="primary" className="float-end" onClick={handleShow}>New Todo</Button>

      <div className="container clearfix pt-5">
        <hr/>
        <p className="text-center"><a href="impressum.html">Impressum</a></p>
      </div>

      <TodoModal show={show} handleClose={handleClose} save={addTodo} handleChange={handleChange} defaultTodo={formData}/>

    </Container>
  )
}

export default IndexPage

export const Head = () => {
  return (<>
    <title>Home Page</title>
    
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />
    { // idk if we need this
      //<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
      //<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
      //<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js" integrity="sha384-+sLIOodYLS7CIrQpBjl+C7nPvqq+FbNUBDunl/OZv93DB7Ln/533i8e/mZXLi/P+" crossorigin="anonymous"></script>
    }

  </>) }
