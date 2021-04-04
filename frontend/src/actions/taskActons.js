import {
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAIL,
    GET_TASK_REQUEST,
    GET_TASK_SUCCESS,
    GET_TASK_FAIL,
    UPDATE_TASK_REQUEST,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAIL,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAIL,
} from '../constants/taskConstants'
import axios from 'axios';

export const getTasks = () => async (dispatch, getState) => {
    try {

        dispatch({type: GET_TASK_REQUEST});

        const {mentorLogin : {userInfo}} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get('/api/tasks', config);

        dispatch({type: GET_TASK_SUCCESS, payload: data});
    } catch (err) {
        dispatch({    
            type: GET_TASK_FAIL,
            payload: err.response && err.response.data.message
            ? err.response.data.message
            :  err.message
        })
    }
    
}

export const addTask = (name) => async (dispatch, getState) => {
    try {

        dispatch({type: ADD_TASK_REQUEST});

        const {mentorLogin : {userInfo}} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post('/api/tasks', {name} ,config);

        dispatch({type: ADD_TASK_SUCCESS, payload: data});
    } catch (err) {
        dispatch({    
            type: ADD_TASK_FAIL,
            payload: err.response && err.response.data.message
            ? err.response.data.message
            :  err.message
        })
    }   
}


export const updateTask = (task) => async (dispatch, getState) => {
    try {

        dispatch({type: UPDATE_TASK_REQUEST});

        const {mentorLogin : {userInfo}} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/tasks/${task._id}`, task ,config);

        dispatch({type: UPDATE_TASK_SUCCESS, payload: data});
    } catch (err) {
        dispatch({    
            type: UPDATE_TASK_FAIL,
            payload: err.response && err.response.data.message
            ? err.response.data.message
            :  err.message
        })
    }   
}


export const deleteTask = (id) => async (dispatch, getState) => {
    try {

        dispatch({type: DELETE_TASK_REQUEST});

        const {mentorLogin : {userInfo}} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/tasks/${id}`, config);

        dispatch({type: DELETE_TASK_SUCCESS, payload: id});
    } catch (err) {
        dispatch({    
            type: DELETE_TASK_FAIL,
            payload: err.response && err.response.data.message
            ? err.response.data.message
            :  err.message
        })
    }   
}