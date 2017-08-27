import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import {reducer as form} from 'redux-form'
import authReducer, {moduleName as authModule} from '../ducks/auth'
import registeredUser, {moduleName as registeredUserModule} from '../ducks/registeredUser'

export default combineReducers({
    router, form,
    [authModule]: authReducer,
    [registeredUserModule]:registeredUser
})