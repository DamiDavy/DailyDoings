import { applyMiddleware, combineReducers, createStore } from "redux"
import thunkMiddleware from 'redux-thunk'

import {authenticationReducer} from './auth-reducer'
import {todosReducer} from './calendar-reducer'

let reducers = combineReducers({
  authentication: authenticationReducer,
  todosCalendar: todosReducer,
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));