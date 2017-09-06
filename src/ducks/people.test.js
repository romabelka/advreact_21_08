import {addPersonSaga,addPersonToFB, ADD_PERSON, ADD_PERSON_REQUEST} from './people'
import {call, put} from 'redux-saga/effects'
import {generateId} from './utils'

it('should dispatch person with id', () => {
    const person = {
        firstName: 'Roman',
        lastName:'Roman',
        email: 'test@test.com'
    }

    const saga = addPersonSaga({
        type: ADD_PERSON_REQUEST,
        payload: person
    })

    

    expect(saga.next().value).toEqual(call(generateId))

    const id = generateId()

    //в начале я написл так
    //expect(saga.next(id).value).toEqual(call(()=>addPersonToFB(id, person)))
    //спустя тек оверфлоу написал так
    //жестко или норм?
     expect(JSON.stringify(saga.next(id).value))
    .toBe(JSON.stringify(call(()=>addPersonToFB(id, person))))

    expect(saga.next(id).value).toEqual(put({
        type: ADD_PERSON,
        payload: {id, ...person}
    }))
})