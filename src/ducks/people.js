import {appName} from '../config'
import {Record, List} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import {generateId} from './utils'
import {reset} from 'redux-form'
import firebase from 'firebase'

const ReducerState = Record({
    entities: new List([]),
    error:null
})

const PersonRecord = Record({
    id: null,
    firstName: null,
    lastName: null,
    email: null
})

export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON = `${prefix}/ADD_PERSON`
export const ADD_PERSON_ERROR = `${prefix}/ADD_PERSON_ERROR`




export default function reducer(state = new ReducerState(), action) {
    const {type, payload,error} = action

    switch (type) {
        case ADD_PERSON:
            return state.update('entities', entities => entities.push(new PersonRecord(payload)))
        case ADD_PERSON_ERROR:
            return state.set('error', error.message)
        default:
            return state
    }
}

export function addPerson(person) {
    return {
        type: ADD_PERSON_REQUEST,
        payload: person
    }
}
export function addPersonToFB(userId, {firstName,lastName,email}) {
    firebase.database().ref('users/' + userId).set({
        firstName,
        lastName,
        email
    });
  }


export const addPersonSaga = function * (action) {
    try {
        const id = yield call(generateId)

        yield call(()=>addPersonToFB(id,action.payload))
        
        yield put({
             type: ADD_PERSON,
             payload: {...action.payload, id}
        })

        yield put(reset('person'))
        
    } catch (error) {
        yield put({
            type: ADD_PERSON_ERROR,
            error
        })
    }
    

    
}



/*
export function addPerson(person) {
    return (dispatch) => {
        dispatch({
            type: ADD_PERSON,
            payload: {
                person: {id: Date.now(), ...person}
            }
        })
    }
}
*/

export const saga = function * () {
    yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga)
}
