import {createSelector} from 'reselect'

export function entitiesSelector(moduleName) {
    const stateSelector = state => state[moduleName]
    return createSelector(stateSelector, state => state.entities)
}