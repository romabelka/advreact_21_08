import {appName} from '../config'
import {Record, List} from 'immutable'
import {put, call, all, take} from 'redux-saga/effects'
import {generateId, fbPeopleDatatoEntities} from './utils'
import {reset} from 'redux-form'
import {addPersonToFB} from '../mocks/index'
import {createSelector} from 'reselect'
import {entitiesSelector} from "../redux/entitiesSelector"
import firebase from 'firebase'


const ReducerState = Record({
    entities: new List([]),
    loading: false,
    loaded: false
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
export const FETCH_PEOPLE_REQUEST = `${prefix}/FETCH_PEOPLE_REQUEST`
export const FETCH_PEOPLE_SUCCESS = `${prefix}/FETCH_PEOPLE_SUCCESS`

export default function reducer(state = new ReducerState(), action) {
    const {type, payload} = action

    switch (type) {
        case FETCH_PEOPLE_REQUEST: return state
            .set('loading', true)

        case ADD_PERSON:
            return state.update('entities', entities => entities.push(new PersonRecord(payload)))

        case FETCH_PEOPLE_SUCCESS:
            console.log(payload)
            return state
            .set('loading', false)
            .set('loaded', true)
            .set('entities', fbPeopleDatatoEntities(payload, PersonRecord))

        default:
            return state
    }
}



export const peopleListSelector = createSelector(entitiesSelector(moduleName), entities => (
    entities.valueSeq().toArray()
))

export function addPerson(person) {
    return {
        type: ADD_PERSON_REQUEST,
        payload: person
    }
}

export function fetchPeople() {
    return {
        type: FETCH_PEOPLE_REQUEST
    }
}

export const addPersonSaga = function * (action) {

    while(true) {
        yield take(ADD_PERSON_REQUEST)

        const id = yield call(generateId)

        addPersonToFB(action.payload)

        yield put({
            type: ADD_PERSON,
            payload: {...action.payload, id}
        })

        yield put(reset('person'))
    }
}

export const fetchPeopleSaga = function * () {
    while (true) {
        yield take(FETCH_PEOPLE_REQUEST)

        const ref = firebase.database().ref('people')

        const data = yield call([ref, ref.once], 'value')

        yield put({
            type: FETCH_PEOPLE_SUCCESS,
            payload: data.val()
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
    yield all([
        addPersonSaga,
        fetchPeopleSaga()
    ])
}
