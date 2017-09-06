import {appName} from '../config'
import {Record, OrderedMap} from 'immutable'
import {put, call, takeEvery, all, take} from 'redux-saga/effects'
import firebase from 'firebase'
import {createSelector} from 'reselect'
import {generateId, fbDatatoEntities} from './utils'
import {reset} from 'redux-form'

const ReducerState = Record({
    entities: new OrderedMap([]),
    loading: false,
    loaded: false
})

const PersonRecord = Record({
    uid: null,
    id: null,
    firstName: null,
    lastName: null,
    email: null
})

/**
 * Constants
 * */

export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`
export const ADD_PERSON = `${prefix}/ADD_PERSON`
export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

/**
 * Reducer
 * */

export default function reducer(state = new ReducerState(), action) {
    const {type, payload} = action

    switch (type) {
        case ADD_PERSON_SUCCESS:
            return state.mergeIn(['entities'], fbDatatoEntities(payload, PersonRecord))

        case FETCH_ALL_REQUEST:
            return state.set('loading', true)

        case FETCH_ALL_SUCCESS:
            return state
              .set('loading', false)
              .set('loaded', true)
              .set('entities', fbDatatoEntities(payload, PersonRecord))

        default:
            return state
    }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const entitiesSelector = createSelector(stateSelector, state => state.entities)
export const personListSelector = createSelector(entitiesSelector, entities => {
    return entities.valueSeq().toArray()
})

/**
 * Action Creators
 * */

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

/**
 * Sagas
 * */

export const addPersonSaga = function * (action) {
    const id = yield call(generateId)

    const person = { ...action.payload, id }

    const ref = firebase.database().ref('people')

    const data = yield call([ref, ref.push], person)

    yield put({
        type: ADD_PERSON_SUCCESS,
        payload: {
            [data.key]: person,
        }
    })

    yield put(reset('person'))
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

export const fetchAllSaga = function * () {
  while (true) {
    yield take(FETCH_ALL_REQUEST)
    
    const ref = firebase.database().ref('people')

    const data = yield call([ref, ref.once], 'value')

    yield put({
      type: FETCH_ALL_SUCCESS,
      payload: data.val()
    })
  }
}

export const saga = function * () {
    yield all([
      takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
      fetchAllSaga(),
    ])
}
