import {Record, List} from 'immutable'
import {appName} from '../config'

const ReducerRecord = Record({
    user: new List(),
    error: null,
    loading: false
})

export const moduleName = 'people'

export const ADD_USER_SUCCESS = `${appName}/${moduleName}/ADD_USER_SUCCESS`

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case ADD_USER_SUCCESS:
            return state.set('user', state.user.push(payload))

        default:
            return state
    }
}

export function addUser(values) {

    return (dispatch) => {
        console.log('There')
        dispatch({
            type: ADD_USER_SUCCESS,
            payload: values
        })
    }
}
