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

it('auth by sign up', () => {
    const person = {
        email: 'kaf_90@mail.ru',
        password: '11111111'
    }
    const saga = signUpSaga()

    expect(saga.next({type: SIGN_UP_SUCCESS, payload: person})).toEqual(take(SIGN_UP_REQUEST));
    // expect(saga.next({type: SIGN_UP_SUCCESS, payload: person})).toEqual(put({type: SIGN_UP_SUCCESS, payload: person}));

})


it('auth by sign in', () => {
    const person = {
        email: 'kaf_90@mail.ru',
        password: '11111111'
    }
    const saga = signInSaga()
    expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST))
    expect(saga.next({type: SIGN_IN_SUCCESS, payload: person}))
        .toEqual(put({type: SIGN_IN_SUCCESS, payload: person}))

//     // debugger;

})