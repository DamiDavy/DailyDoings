import { login, logout, register } from '../api'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const REGISTERED = 'REGISTERED'

export const loginAC = (login, password) => ({
  type: LOGIN,
  login, password
})

export const registrationAC = () => ({ type: REGISTERED })

export const logoutAC = () => ({ type: LOGOUT })

export const authenticationReducer = (state = {loggedIn: false, registered: false}, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state, loggedIn: true, login: action.login, password: action.password}
    case LOGOUT:
      return {...state, loggedIn: false, login: '', password: ''}
    case REGISTERED:
      console.log('in redus')
      return {...state, registered: true}
    default:
      return state
  }
}

export const loginThunk = (name, password) => async (dispatch) => {
  let response = await login(name, password)
  if (response.result === 0) {
    dispatch(loginAC(name, password))
  }
}

export const logoutThunk = () => async (dispatch) => {
  let response = await logout()
  if (response.result === 0) {
    dispatch(logoutAC())
  }
}

export const registrationThunk = (name, email, password, confirmation) => async (dispatch) => {
  let response = await register(name, email, password, confirmation)
  if (response.result === 0) {
    dispatch(registrationAC())
  }
}