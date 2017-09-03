import {signInSaga,
    signUpSaga,
    SIGN_IN_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
    AUTH
} from './auth'
import {call,take, put} from 'redux-saga/effects'
import {push} from 'react-router-redux'

//signIn

const user = {
    email: 'uu@uu.com',
    password: '11111111'
}

const action ={
    type:SIGN_IN_REQUEST,
    payload:user
}


it('sign In user', () => {

    const saga = signInSaga()
  
    expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST))

    expect(saga.next(action).value).toEqual(call(
        [AUTH, AUTH.signInWithEmailAndPassword],
        user.email, user.password
    ))

    expect(saga.next(user).value).toEqual(put({
        type:SIGN_IN_SUCCESS,
        payload:{user}
    }))

    expect(saga.next().value).toEqual(put(push('/admin/people')))

    //const error = 'some error';
    expect(saga.throw()).toEqual({
        type: SIGN_IN_ERROR
    })
})
