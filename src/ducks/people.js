import {appName} from '../config'
//import {Record, List} from 'immutable'
import {all, put, call, takeEvery} from 'redux-saga/effects'
//import {generateId} from './utils'
import {reset} from 'redux-form'
import firebase from 'firebase'


export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON = `${prefix}/ADD_PERSON`
export const FETCH_PEOPLE_REQUEST = `${prefix}/FETCH_PEOPLE_REQUEST`
export const FETCH_PEOPLE_SUCCESS = `${prefix}/FETCH_PEOPLE_SUCCESS`

const peopleRef = firebase.database().ref('/people')

export default function reducer(state = [], action) {
    const {type, payload} = action

    switch (type) {
        case ADD_PERSON:
            return [...state, payload]

        case FETCH_PEOPLE_SUCCESS:
            return [...state, ...payload]

        default:
            return state
    }
}

export function fetchPeopleRequest() {
    return {
        type: FETCH_PEOPLE_REQUEST
    }
}

export const listPersonSaga = function *(action) {
    const data = yield call([peopleRef, peopleRef.once], 'value')
    const peopleObject = data.val()
    const peopleArray= Object.values(peopleObject)

    yield put({
        type: FETCH_PEOPLE_SUCCESS,
        payload: peopleArray
    })
}

export function addPerson(person) {
    return {
        type: ADD_PERSON_REQUEST,
        payload: person
    }
}

export const addPersonSaga = function * (action) {
    const personRef = yield peopleRef.push()
    const PersonID = personRef.key
    yield personRef.set(
        {...action.payload, id: PersonID}
    )

    yield put({
        type: ADD_PERSON,
        payload: {...action.payload, id: PersonID}
    })

    yield put(reset('person'))
}


export const saga = function * () {
    yield all([
        takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
        takeEvery(FETCH_PEOPLE_REQUEST, listPersonSaga)
    ])

}
