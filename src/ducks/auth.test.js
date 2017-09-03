import firebase from 'firebase'
import {push} from 'react-router-redux'
import {all, cps, call, put, take, takeEvery} from 'redux-saga/effects'
import {
    signUpSaga, signOutSaga, watchStatusChange, signInSaga, saga as authSaga,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_ERROR,
    SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_ERROR,
    SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS,
} from './auth';

const auth = firebase.auth()
const user = {
  email: 'a@a.aa',
  password: 'aaaaaaaaaa',
}

describe('test auth sagas', () => {
  it('should sign up', () => {
    const saga = signUpSaga();

    expect(saga.next().value).toEqual(take(SIGN_UP_REQUEST))

    const action = {
      type: SIGN_UP_REQUEST,
      payload: { ...user }
    }

    expect(saga.next(action).value).toEqual(
      call([auth, auth.createUserWithEmailAndPassword], user.email, user.password)
    )

    expect(saga.next(user).value).toEqual(put({
      type: SIGN_UP_SUCCESS,
      payload: { user }
    }))

    expect(saga.throw('test').value).toEqual(put({
      type: SIGN_UP_ERROR,
      error: 'test',
    }))
  })

  it('should sign in', () => {
    const action = {
      type: SIGN_IN_REQUEST,
      payload: { ...user }
    }

    const saga = signInSaga(action);

    expect(saga.next().value).toEqual(
      call([auth, auth.signInWithEmailAndPassword], user.email, user.password)
    )

    expect(saga.next(user).value).toEqual(put({
      type: SIGN_IN_SUCCESS,
      payload: { user }
    }))

    expect(saga.throw('test').value).toEqual(put({
      type: SIGN_IN_ERROR,
      error: 'test',
    }))
  })

  it('should sign out', () => {
    const action = {
      type: SIGN_OUT_REQUEST,
    }

    const saga = signOutSaga(action);

    expect(saga.next().value).toEqual(
      call([auth, auth.signOut])
    )

    expect(saga.next().value).toEqual(put({
      type: SIGN_OUT_SUCCESS
    }))

    expect(saga.next().value).toEqual(put(push('/auth/signin')))
  })

  it('should watch auth status', () => {
    const saga = watchStatusChange();

    expect(saga.next().value).toEqual(
      cps([auth, auth.onAuthStateChanged])
    )

    expect(saga.throw(user).value).toEqual(put({
      type: SIGN_IN_SUCCESS,
      payload: { user },
    }))
  })
})
