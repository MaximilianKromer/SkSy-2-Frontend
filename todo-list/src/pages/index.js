import React, { useState } from "react"
import TodoElement from "../components/todo-element"
import Axios from "axios"

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import TodoModal from "../components/todo-modal";
import Alert from 'react-bootstrap/Alert';

const serverUrl = "http://127.0.0.1:5000"


const IndexPage = () => {

  // state with todos
  const [todos, setTodos] = React.useState([
    {id: 1, description: "Test Todo1s", deadline: "2023-01-01", percent_done: "12"},
    {id: 2, description: "Test Todos2", deadline: "2023-04-20", percent_done: "14"},
    {id: 3, description: "Test Todos3", deadline: "2023-03-23", percent_done: "16"},
  ])

  // async todos (request if true)
  const [asyncTodos, setAsyncTodos] = React.useState(true)

  // call an api with axios on page load
  React.useEffect(() => {

    if(!asyncTodos) return

    setAsyncTodos(false)
    Axios.get(serverUrl + "/api/todo")
      .then(response => {
        console.log(response.data)
        setTodos(response.data.todos)
      })
      .catch(error => {
        console.log(error)
        console.log("====================================")
        console.log(`Something bad happened while fetching the data\n${error}`)
        console.log("====================================")
      })
  }, [asyncTodos])

  // modal state
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    namdescriptione: "",
    deadline: "",
    percent_done: ""
  })

  function handleClose() {
    setShow(false);
    setFormData({description: "", deadline: "", percent_done: ""})
  }
  const handleShow = () => setShow(true);

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
    Axios.delete(serverUrl + "/api/todo/" + id)
      .then(response => {
        console.log(response.data)
        setAsyncTodos(true)
      })
      .catch(error => {
        console.log(error)
        setAsyncTodos(true)
      })
  }

  // out of sync messafe
  const alert = <Alert variant="warning">Not in Sync with Server. Please wait...</Alert>

  function addTodo() {
    // check if formDate has an id
    if(formData.id) {
      // update todo
      let ind = todos.findIndex((todo => todo.id === formData.id))
      todos[ind] = formData
      setTodos([...todos])
      Axios.post(serverUrl + "/api/todo/" + formData.id, formData)
        .then(response => {
          console.log(response.data)
          setAsyncTodos(true)
        })
        .catch(error => {
          console.log(error)
          setAsyncTodos(true)
        })

    } else {
      // add todo
      setTodos([...todos, {id: todos.length+150, ...formData}])
      Axios.post(serverUrl + "/api/todo", formData)
        .then(response => {
          console.log(response.data)
          setAsyncTodos(true)
        })
        .catch(error => {
          console.log(error)
          setAsyncTodos(true)
        })
    }
    setFormData({name: "", deadline: "", percent_done: ""})
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
      {asyncTodos ? alert : null}
      <table className="table table-striped table-bordered">
       <thead>
        <tr>
          <th>Description</th>
          <th>Deadline</th>
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
