import { createStore, compose, applyMiddleware } from 'redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import reducer from './reducer'
type windowWithReduxExtension = Window & {
	__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function
}
const composeEnhancers =
	(window as windowWithReduxExtension).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = configureStore(reducer)
// const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store
