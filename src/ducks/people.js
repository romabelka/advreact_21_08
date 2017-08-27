import {appName} from '../config';
import {Record} from 'immutable';

const ReducerRecord = Record({
  firstName: '',
  lastName: '',
  email: ''
});

export const moduleName = 'people';
export const ADD_PEOPLE = `${appName}/${moduleName}/ADD_PEOPLE`;

export default function reducer (state = new ReducerRecord(), action) {
  const {type, payload} = action;

  switch (type) {
    case ADD_PEOPLE:
      return state
        .set('firstName', payload.firstName)
        .set('lastName', payload.lastName)
        .set('email', payload.email)
    default:
      return state;
  }
}

export const addPeople = (firstName, lastName, email) => ({
  type: ADD_PEOPLE,
  payload: {
    firstName, lastName, email
  }
})