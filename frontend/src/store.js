import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import {mentorRegisterReducer, mentorLoginReducer, mentorListReducer} from './reducers/mentorReducer'
import {TaskReducer} from './reducers/taskReducer'

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null


const middleware = [thunk];

const reducer = combineReducers({
    mentorRegister: mentorRegisterReducer,
    mentorLogin: mentorLoginReducer,
    mentorList: mentorListReducer,
    Task: TaskReducer
})

const initialState = {
    mentorLogin: {
        userInfo: userInfoFromStorage
    }
};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;