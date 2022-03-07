import { authActionType, authInitialState, authReducer } from './authReducer'
import combineReducers from './combineReducers'

export type rootActionType = authActionType

export const initialState = {
  auth: authInitialState
}

export const rootReducer = combineReducers({
  auth: authReducer,
})
