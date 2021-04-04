import React, {useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {addTask} from '../actions/taskActons'

const TaskModal = (props) => {
    const [name, setTask] = useState('')  

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(props.onHide);
      dispatch(addTask(name));
      setTask('');
    }


    return (
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Task Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setTask(e.target.value)} placeholder="Enter Task" />
            <Form.Text className="text-muted">
              Your task will be shared with everyone.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" onClick={handleSubmit} >
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default TaskModal
