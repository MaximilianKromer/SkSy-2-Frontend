import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const TodoModal = ({show, handleClose, save, handleChange, defaultTodo}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="TextInput" className="mb-3">
          <Form.Label>Todo Name</Form.Label>
          <Form.Control name="description" type="text" placeholder="Todo Name" defaultValue={defaultTodo.description} onChange={handleChange} /> 
        </Form.Group>
        <Form.Group controlId="DateInput" className="mb-3">
          <Form.Label>Deadline</Form.Label>
          <Form.Control name="deadline" type="date" placeholder="Date" defaultValue={defaultTodo.deadline} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="PercentInput" className="mb-3">
          <Form.Label>Percent done</Form.Label>
          <Form.Control name="percent_done" type="number" placeholder="%" defaultValue={defaultTodo.percent_done} onChange={handleChange} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={() => {save(); handleClose()}}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TodoModal