import React, {useState, useEffect} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {updateTask} from '../actions/taskActons'

const EditTaskModal = (props) => {
    const [task, setTask] = useState()  

    const dispatch = useDispatch()

    useEffect(() => {
        setTask(props.task)
    }, [props])

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateTask(task));
      dispatch(props.onHide);
    //   setTask('');
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
          Edit Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Task Name</Form.Label>
            <Form.Control type="text" value={task && task.name} onChange={(e) => setTask(task => ({...task, name: e.target.value}))} placeholder="Enter Task" />
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

export default EditTaskModal
