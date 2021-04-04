import {
    MENTOR_LOGIN_FAIL,
    MENTOR_LOGIN_REQUEST, 
    MENTOR_LOGIN_SUCCESS,
    MENTOR_LOGOUT,
    MENTOR_REGISTER_FAIL,
    MENTOR_REGISTER_REQUEST, 
    MENTOR_REGISTER_SUCCESS,
    GET_LIST_FAIL,
    GET_LIST_REQUEST, 
    GET_LIST_SUCCESS,
    ADD_MENTOR_FAIL,
    ADD_MENTOR_REQUEST, 
    ADD_MENTOR_SUCCESS,
} from '../constants/mentorConstants';
import axios from 'axios';

export const register = (name, email, password) => async dispatch => {
    try {
        dispatch({type: MENTOR_REGISTER_REQUEST});

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/mentors', { name, email, password }, config);

        dispatch({
            type: MENTOR_REGISTER_SUCCESS,
            payload: data
        });

        dispatch({
            type: MENTOR_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
        dispatch({    
            type:MENTOR_REGISTER_FAIL,
            payload: err.response && err.response.data.message
            ? err.response.data.message
            :  err.message
        })
    }      
}

export const login = (email, password) => async dispatch => {
    try {
        dispatch({type: MENTOR_LOGIN_REQUEST});

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/mentors/login', { email, password }, config);

        dispatch({
            type: MENTOR_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
        dispatch({    
            type:MENTOR_LOGIN_FAIL,
            payload: err.response && err.response.data.message
            ? err.response.data.message
            :  err.message
        })
    }      
}
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({type: MENTOR_LOGOUT});

}


export const getMentors = () => async (dispatch, getState) => {
    try {
        dispatch({type: GET_LIST_REQUEST});

        const {mentorLogin : {userInfo}} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(' /api/mentors', config);

        dispatch({type: GET_LIST_SUCCESS, payload: data});
    } catch (err) {
        dispatch({    
            type: GET_LIST_FAIL,
            payload: err.response && err.response.data.message
            ? err.response.data.message
            :  err.message
        })
    }      
}

export const addMentor = (name, email, password) => async dispatch => {
    try {
        dispatch({type: ADD_MENTOR_REQUEST});

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/mentors', { name, email, password }, config);

        dispatch({
            type: ADD_MENTOR_SUCCESS,
            payload: data
        });

       
    } catch (err) {
        dispatch({    
            type:ADD_MENTOR_FAIL,
            payload: err.response && err.response.data.message
            ? err.response.data.message
            :  err.message
        })
    }      
}
