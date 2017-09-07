import {addPersonSaga, ADD_PERSON_SUCCESS, ADD_PERSON_REQUEST} from './people'
import {call, put} from 'redux-saga/effects'
import {generateId} from './utils'
import firebase from 'firebase'
import {reset} from 'redux-form'

it('should dispatch person with id', () => {
    const person = {
        firstName: 'Roman',
        email: 'test@test.com'
    }

    const saga = addPersonSaga({
        type: ADD_PERSON_REQUEST,
        payload: person
    })

    const peopleRef = firebase.database().ref('people')

    expect(saga.next().value).toEqual(call([peopleRef, peopleRef.push], person))

    const key = generateId()

    expect(saga.next({ key }).value).toEqual(put({
        type: ADD_PERSON_SUCCESS,
        payload: {...person, uid: key}
    }))

    expect(saga.next().value).toEqual(put(reset('person')))

    expect(saga.next().done).toBe(true)

})