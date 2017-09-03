import firebase from 'firebase'
import {appName} from '../config'
import {Record} from 'immutable'
//import store from '../redux'
import {all, cps, call, put, take, takeEvery} from 'redux-saga/effects'
import {push} from 'react-router-redux'

const ReducerRecord = Record({
    user: null,
    error: null,
    loading: false
})

export const moduleName = 'auth'
export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`
export const SIGN_IN_REQUEST = `${appName}/${moduleName}/SIGN_IN_REQUEST`
export const SIGN_IN_SUCCESS = `${appName}/${moduleName}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${appName}/${moduleName}/SIGN_IN_ERROR`
export const SIGN_OUT_REQUEST = `${appName}/${moduleName}/SIGN_OUT_REQUEST`
export const SIGN_OUT_SUCCESS = `${appName}/${moduleName}/SIGN_OUT_SUCCESS`

//console.log('---', ReducerRecord)
export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload, error} = action

    switch (type) {
        case SIGN_UP_REQUEST:
            return state.set('loading', true)

        case SIGN_UP_SUCCESS:
            return state
                .set('loading', false)
                .set('user', payload.user)
                .set('error', null)

        case SIGN_IN_SUCCESS:
            return state
                .set('loading', false)
                .set('user', payload.user)
                .set('error', null)

        case SIGN_UP_ERROR:
            return state
                .set('loading', false)
                .set('error', error)

        case SIGN_IN_ERROR:
            return state
                .set('loading', false)
                .set('error', error)

        case SIGN_OUT_SUCCESS:
            return new ReducerRecord()

        default:
            return state
    }
}

export function signUp(email, password) {
    return {
        type: SIGN_UP_REQUEST,
        payload: {email, password}
    }
}

export function signOut() {
    return {
        type: SIGN_OUT_REQUEST
    }
}

export const signUpSaga = function * () {
    const auth = firebase.auth()

    while (true) {
        const action = yield take(SIGN_UP_REQUEST)

        try {
            const user = yield call(
                [auth, auth.createUserWithEmailAndPassword],
                action.payload.email, action.payload.password
            )
            yield put({
                type: SIGN_UP_SUCCESS,
                payload: {user}
            })
        } catch (error) {
            yield put({
                type: SIGN_UP_ERROR,
                error
            })
        }
    }
}

export const signInSaga = function * () {
    const auth = firebase.auth()

    while (true) {
        const action = yield take(SIGN_IN_REQUEST);
        try {
                //UserCredential
            const user = yield call(
                [auth, auth.signInWithEmailAndPassword],
                action.payload.email, action.payload.password
            )
            yield put({
                type: SIGN_IN_SUCCESS,
                payload: {user}
            })
        } catch (error) {
            yield put({
                type: SIGN_IN_ERROR,
                error
            })
        }
    }
}

/*
export function signUp(email, password) {
    return (dispatch) => {
        dispatch({
            type: SIGN_UP_REQUEST
        })

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => dispatch({
                type: SIGN_UP_SUCCESS,
                payload: {user}
            }))
            .catch(error => dispatch({
                type: SIGN_UP_ERROR,
                error
            }))
    }
}
*/

export const watchStatusChange = function * () {
    const auth = firebase.auth()
    try {
        yield cps([auth, auth.onAuthStateChanged])
    } catch (user) {
        yield put({
            type: SIGN_IN_SUCCESS,
            payload: {user}
        })
    }
}

/*
firebase.auth().onAuthStateChanged(user => {
    const store = require('../redux').default
    store.dispatch({
        type: SIGN_IN_SUCCESS,
        payload: {user}
    })
})

*/

export const signOutSaga = function * () {
    const auth = firebase.auth()

    try {
        yield call([auth, auth.signOut])
        yield put({
            type: SIGN_OUT_SUCCESS
        })
        yield put(push('/auth/signin'))
    } catch (_) {

    }
}

export const saga = function * () {
    yield all([
        signUpSaga(),
        signInSaga(),
        watchStatusChange(),
        takeEvery(SIGN_OUT_REQUEST, signOutSaga)
    ])
}