import {
    SIGN_IN_REQUEST,
    SIGN_UP_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_UP_SUCCESS,
    SIGN_IN_ERROR,
    SIGN_UP_ERROR,
    signIn,
    signUp,
    signUpSaga,
    signInSaga,
    signOut
} from './auth'
import firebase from 'firebase'
import {call, put, take} from 'redux-saga/effects'
const AUTH = firebase.auth()
const person = {
    email: 'kaf_90@mail.ru',
    password: '11111111'
}

it('auth by sign up', () => {
    
    const saga = signUpSaga()
    expect(saga.next().value).toEqual(take(SIGN_UP_REQUEST))
    expect(saga.next({type: SIGN_UP_REQUEST, payload: person}).value).toEqual(call([AUTH, AUTH.createUserWithEmailAndPassword], person.email, person.password));
    expect(saga.next(person).value).toEqual(put({
                type:SIGN_UP_SUCCESS,
                payload:{user:person}
        }))
    // expect(saga.throw()).toEqual({
    //     type: SIGN_UP_ERROR
    // })
})


it('auth by sign in', () => {
    const saga = signInSaga()
    expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST))
    expect(saga.next({type: SIGN_IN_REQUEST, payload: person}).value).toEqual(call([AUTH, AUTH.signInWithEmailAndPassword], person.email, person.password));
    expect(saga.next(person).value).toEqual(put({
        type:SIGN_IN_SUCCESS,
        payload:{user:person}
}))
    // expect(saga.throw()).toEqual({
    //     type: SIGN_UP_ERROR
    // })
})