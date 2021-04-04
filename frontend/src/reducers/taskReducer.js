import {
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAIL,
    // ADD_TASK_RESET,
    GET_TASK_REQUEST,
    GET_TASK_SUCCESS,
    GET_TASK_FAIL,
    UPDATE_TASK_REQUEST,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAIL,
} from '../constants/taskConstants'

export const TaskReducer = (state= {tasks: []}, action) => {
    switch(action.type) {
        case GET_TASK_REQUEST: 
            return {
                loading: true,
                tasks: []
            }
        case GET_TASK_SUCCESS:
            return {
                loading: false,
                tasks: action.payload
            }
        case GET_TASK_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ADD_TASK_REQUEST:
            return {
                loading: true,
                tasks: state.tasks
            }
        case ADD_TASK_SUCCESS:
            return {
                loading: false,
                tasks: state.tasks.length === 0 ? action.payload : [action.payload, ...state.tasks]
            }
        case ADD_TASK_FAIL:
            return {
                loading: false,
                error: action.payload,
                tasks: state.tasks
            }
        case UPDATE_TASK_REQUEST:
            return {
                loading: true,
                tasks: state.tasks
            }
        case UPDATE_TASK_SUCCESS:
            return {
                loading: false,
                tasks: state.tasks.length === 0 ? action.payload : state.tasks.map(task => task._id === action.payload._id ? action.payload : task)
            }
        case UPDATE_TASK_FAIL:
            return {
                loading: false,
                error: action.payload,
                tasks: state.tasks
            }
        default: 
            return state;
    }
}