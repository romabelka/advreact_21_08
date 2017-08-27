import {appName} from '../config'
import {Record} from 'immutable'

const ReducerRecord = Record({
    users: [],
    loading: false
})

export const moduleName = 'registeredUser'
export const CHANGE_USERS_LIST = `${appName}/${moduleName}/CHANGE_USERS_LIST`

//console.log('---', ReducerRecord)
export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case CHANGE_USERS_LIST:
            return state
                .set('users', payload)
        default:
            return state
    }
}

export function addUser(email, lastName,firstName) {

    return (dispatch,getState) => {
        let _users=[...getState()[moduleName].users]
        _users.push({email,lastName,firstName})
        dispatch({
            type: CHANGE_USERS_LIST,
            payload:_users
        })
    }
}
