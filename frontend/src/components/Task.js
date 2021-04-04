import React, {useState} from 'react'
import {updateTask, deleteTask} from '../actions/taskActons'
import {useDispatch} from 'react-redux'
import EditTaskModal from './EditTaskModal';

const TaskComponent = ({task}) => {
    const [editModalShow, setEditModalShow] = useState(false);
    
    const dispatch = useDispatch();

    // const [task, setTask] = useState({});

    const handleUpdate = () => {
        task.isCompleted = !task.isCompleted
        dispatch(updateTask(task))
    }

    const handleDelete = () => {
        dispatch(deleteTask(task._id))
    }

    return (
        <>
        <tr key={task._id}>
            <td><input type='checkbox' onChange={handleUpdate} checked={task.isCompleted}/></td>
            <td className={task.isCompleted ? 'td-line' : null}>{task.name}</td>
            <td className={task.isCompleted ? 'td-line' : null}>{task.mentor.name}</td>
            <td><img 
                src='https://www.flaticon.com/svg/vstatic/svg/1159/1159633.svg?token=exp=1617514659~hmac=fcb7380476eec77b6ffdfd0e7deaed28' 
                alt='Edit' 
                onClick={() => {setEditModalShow(true)} }
            />
            </td> 
            <td><img 
                src='https://www.flaticon.com/svg/vstatic/svg/1214/1214428.svg?token=exp=1617521330~hmac=8bee4ce4d68448f9c47ba602f53fbc58' 
                alt='Delete' 
                onClick={handleDelete}
            />
            </td> 
        </tr>
            <EditTaskModal
                show={editModalShow}
                onHide={() => {setEditModalShow(false);}}
                task={task}
            />
        </>
    )
}

export default TaskComponent
