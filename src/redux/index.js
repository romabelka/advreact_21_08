import {createStore,  applyMiddleware, compose} from 'redux'
import reducer from './reducer'
import logger from 'redux-logger'
import {routerMiddleware} from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import history from '../history'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()
const enhancer = applyMiddleware(sagaMiddleware, routerMiddleware(history), logger)

const store = createStore(reducer, compose(
        enhancer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
window.store = store

sagaMiddleware.run(rootSaga)

export default store
