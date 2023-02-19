import { createStore, compose, applyMiddleware } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import flightReducer from './flightSlice'
import userReducer from './userSlice'
import thunk from 'redux-thunk'

const persistConfig = {
	key: 'root',
	storage,
	blacklist: []
}

const rootReducer = combineReducers({
	flight: flightReducer,
	user: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk]
})
// const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
