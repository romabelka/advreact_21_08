import {appName} from '../config'
import {List, Record} from 'immutable'
import {reset} from 'redux-form'

const PeopleListRecord = Record({
  peopleList: List(),
  error: null,
  loading: false
})

const PersonRecord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null
})

export const moduleName = 'people'
export const ADD_PERSON_REQUEST = `${appName}/${moduleName}/ADD_PERSON_REQUEST`
export const ADD_PERSON_SUCCESS = `${appName}/${moduleName}/ADD_PERSON_SUCCESS`
export const ADD_PERSON_ERROR = `${appName}/${moduleName}/ADD_PERSON_ERROR`


export default function reducer(state = new PeopleListRecord(), action) {
  const {type, payload, error} = action

  switch (type) {
  case ADD_PERSON_REQUEST:
    return state.set('loading', true)

  case ADD_PERSON_SUCCESS:
    return state
      .set('loading', false)
      .set('error', null)
      .setIn(['peopleList', state.get('peopleList').size], new PersonRecord({
        id: state.get('peopleList').size,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email
      }))

  case ADD_PERSON_ERROR:
    return state
      .set('loading', false)
      .set('error', error)

  default:
    return state
  }
}

export function addPerson(firstName, lastName, email) {
  return (dispatch) => {
    dispatch({
      type: ADD_PERSON_SUCCESS,
      payload: {firstName, lastName, email}
    })
    // Dispatching this to reset redux-form
    dispatch(reset('people'))
  }
}
