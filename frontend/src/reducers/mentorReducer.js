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

export const mentorRegisterReducer = (state= {}, action) => {
    switch (action.type) {
        case MENTOR_REGISTER_REQUEST:
            return  {
                loading: true
            }
        case MENTOR_REGISTER_SUCCESS:
            return  {
                loading: false,
                userInfo: action.payload
            }
        case MENTOR_REGISTER_FAIL:
            return  {
                loading: false,
                error: action.payload
            }
        case MENTOR_LOGOUT: 
            return {}
        default:
            return state
    }
}

export const mentorLoginReducer = (state= {}, action) => {
    switch (action.type) {
        case MENTOR_LOGIN_REQUEST:
            return  {
                loading: true
            }
        case MENTOR_LOGIN_SUCCESS:
            return  {
                loading: false,
                userInfo: action.payload
            }
        case MENTOR_LOGIN_FAIL:
            return  {
                loading: false,
                error: action.payload
            }
        case MENTOR_LOGOUT: 
            return {}
        default:
            return state
    }
}

export const mentorListReducer = (state= {mentors: []}, action) => {
    switch (action.type) {
        case GET_LIST_REQUEST:
            return  {
                loading: true
            }
        case GET_LIST_SUCCESS:
            return  {
                loading: false,
                mentors: action.payload
            }
        case GET_LIST_FAIL:
            return  {
                loading: false,
                error: action.payload
            }
        case ADD_MENTOR_REQUEST:
            return  {
                loading: true,
                mentors: state.mentors
            }
        case ADD_MENTOR_SUCCESS:
            return  {
                loading: false,
                mentors: [action.payload, ...state.mentors]
            }
        case ADD_MENTOR_FAIL:
            return  {
                loading: false,
                error: action.payload,
                mentors: state.mentors
            }
        case MENTOR_LOGOUT: 
            return {}
        default: 
            return state;
    }
}