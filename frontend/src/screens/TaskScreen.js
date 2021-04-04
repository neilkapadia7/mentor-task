import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Button, Table} from 'react-bootstrap'
import Message from '../components/Message';
import Loader from '../components/Loader';
import TaskComponent from '../components/Task';
import TaskModal from '../components/AddTaskModal';
// import EditTaskModal from '../components/EditTaskModal';
import {getTasks} from '../actions/taskActons'


const TaskScreen = ({history}) => {
    const [modalShow, setModalShow] = useState(false);
    // const [editModalShow, setEditModalShow] = useState(false);
    const [message, setMessage] = useState('');
    // const [task, setTask] = useState({});

    const dispatch = useDispatch();

    const mentorLogin = useSelector(state => state.mentorLogin)
    const {userInfo} = mentorLogin;

    const Task = useSelector(state => state.Task)
    const {tasks,loading, error} = Task;

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        }   
        if(error) {
            setMessage(error);
            setTimeout(() => {
                setMessage('');
            }, 5000);
        }
       
            dispatch(getTasks());
        
    }, [userInfo, history, error, dispatch])

    // const handleUpdate = () => {
    //     console.log("hi")
    // }
    

    return (
        <>  
            {message && <Message variant='danger'>{message}</Message>}
            {loading && <Loader />}
            <Row>
                <Button onClick={() => setModalShow(true)}>Add New Task</Button>
            </Row>
            <Row>
                <h3 style={{paddingTop: '40px'}}>Tasks</h3>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Complete</th>
                            <th>Task</th>
                            <th>Added By</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks && tasks.length > 0 ? tasks.map(task =>(
                            <TaskComponent key={task._id} task={task}/>
                        )): null }
                        <tr>

                        </tr>
                    </tbody>
                </Table>
            </Row>

             <TaskModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />            
        </>
    )
}

export default TaskScreen
