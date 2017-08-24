import firebase from 'firebase'
import {appName} from '../config'
import {Record} from 'immutable'

const ReducerRecord = Record({
    user: null,
    error: null,
    loading: false
})

export const moduleName = 'auth'
export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`

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

        case SIGN_UP_ERROR:
            return state
                .set('loading', false)
                .set('error', error)

        default:
            return state
    }
}

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