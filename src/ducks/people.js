// import firebase from 'firebase'
import {appName} from '../config'
import {Record} from 'immutable'

const ReducerRecord = Record({
    user: null,
    error: null,
    loading: false
})

export const moduleName = 'people'
export const ADD_USER_REQUEST = `${appName}/${moduleName}/ADD_USER_REQUEST`
export const ADD_USER_SUCCESS = `${appName}/${moduleName}/ADD_USER_SUCCESS`
export const ADD_USER_ERROR = `${appName}/${moduleName}/ADD_USER_ERROR`
export const ADD_USER = `${appName}/${moduleName}/ADD_USER`

export function addUser (email, first_name, last_name) {
    return (dispatch) => {
        dispatch({type: ADD_USER, payload: {user : {email, first_name, last_name} }})
    }
}


export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload, error} = action
    
    switch(type) {
        case ADD_USER_REQUEST:
            return state
                .set('loading', true)

        case ADD_USER_SUCCESS:
            return state

        case ADD_USER_ERROR: 
            return state
                .set('loading', false)
                .set('error', error)
        case ADD_USER:
            return state
                .set('user', payload.user)
        default:
            return state;
    } 
}