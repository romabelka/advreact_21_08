import firebase from 'firebase'
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
        default:
            return state;
    } 
}