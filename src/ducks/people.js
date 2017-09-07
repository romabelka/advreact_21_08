import {appName} from '../config'
import {all, take, call, put, select, takeEvery} from 'redux-saga/effects'
import {generateId} from './utils'
import {reset} from 'redux-form'
import firebase from 'firebase'
import {Record, OrderedMap, OrderedSet,List} from 'immutable'
import {fbDatatoEntities} from './utils'

const ReducerState = Record({
    entities: new List([])
})

const PersonRecord = Record({
    id: null,
    firstName: null,
    lastName: null,
    email: null
})


export const ReducerRecord = Record({
    entities: new OrderedMap({}),
    selected: new OrderedSet([]),
    loading: false,
    loaded: false
})

export const PeopleRecord = Record({
    email: null,
    firstName: null,
    lastName: null
})

export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_REQUEST`
export const ADD_PERSON = `${prefix}/ADD_PERSON`


export default function reducer(state = new ReducerState(), action) {
    const {type, payload} = action

    switch (type) {
        case ADD_PERSON:
            return state.update('people', entities => entities.push(new PersonRecord(payload)))

        case FETCH_ALL_SUCCESS:
            console.log(payload,'payload');
            return new OrderedMap(payload);

        case FETCH_ALL_REQUEST:
            return state.set('loading', true);

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
export function fetchAll() {
    return {
        type: FETCH_ALL_REQUEST
    }
}


export const addPersonSaga = function * (action) {

    const id = yield call(generateId)

    function saveEventsToFB(person) {
        const eventsRef = firebase.database().ref('/people')
        eventsRef.push(person);
    }

    firebase.database().ref('/people').once('value', data => {
        saveEventsToFB(action.payload)
    })

    yield put({
        type: ADD_PERSON,
        payload: {...action.payload, id}
    })

    yield put(reset('person'))
}


export const fetchAllSaga = function * () {
    console.log('while start');
    while (true) {
        yield console.log('while true')
        yield take(FETCH_ALL_REQUEST)
        const ref = firebase.database().ref('people')
        const data = yield call([ref, ref.once], 'value')
        console.log(data.val(), 'data.val()');
        yield put({
            type: FETCH_ALL_SUCCESS,
            payload: data.val()
        })
    }
}
export const saga = function * () {
    yield all([
        fetchAllSaga(),
        takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    ])
}
