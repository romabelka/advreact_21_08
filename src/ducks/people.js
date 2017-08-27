import { appName } from '../config';

export const moduleName = 'people'
export const ADD_PERSON = `${appName}/${moduleName}/ADD_PERSON`

export default (state = [], action) => {
  const { type, payload } = action

  switch (type) {
    case ADD_PERSON:
      return state.concat({
        id: Date.now(),
        ...payload.person
      })

    default:
      return state
  }
};

export const addPerson = (person) => ({
  type: ADD_PERSON,
  payload: { person }
})
