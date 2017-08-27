//import firebase from 'firebase'
import {appName} from '../config'
//import store from '../redux'
import {reset} from 'redux-form';

let initialState={
    loading:false,
    error:null,
    people:[],
}

export const moduleName = 'people'
export const CREATE_REQUEST = `${appName}/${moduleName}/CREATE_REQUEST`
export const CREATE_SUCCESS = `${appName}/${moduleName}/CREATE_SUCCESS`
export const CREATE_ERROR = `${appName}/${moduleName}/CREATE_ERROR`

export default function reducer(state = initialState, action) {
    const {type, payload, error} = action

    switch (type) {
        case CREATE_REQUEST:
            return {...state,loading:true}

        case CREATE_SUCCESS:
            return {
                people:[...state.people,payload],
                loading:false,
                error:null
            }

        case CREATE_ERROR:
            return {...state,loading:false,error}

        default:
            return state
    }
}

export function create(firstName, lastName, email) {
    return (dispatch) => {
        dispatch({
            type: CREATE_REQUEST
        })

        setTimeout(()=> {
            dispatch({
                type: CREATE_SUCCESS,
                payload: {firstName, lastName, email}
            })
            dispatch(reset('people-create'));
        },1000)
        /*firebase.database().ref('users/' + userId).set({
            firstName,
            lastName,
            email,
        })
        .then(user => dispatch({
           type: CREATE_SUCCESS,
           payload: {user}
        }))
        .catch(error => dispatch({
           type: CREATE_ERROR,
           error
        }))*/
    }
}

