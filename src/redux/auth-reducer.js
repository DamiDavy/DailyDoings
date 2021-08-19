import { authAPI } from '../api'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const REGISTERED = 'REGISTERED'

export const loginAC = (login, password) => ({
  type: LOGIN,
  login, password
})

export const registrationAC = () => ({ type: REGISTERED })

export const logoutAC = (message = '') => ({ type: LOGOUT, message })

export const authenticationReducer = (state = {loggedIn: false, registered: false}, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state, loggedIn: true, login: action.login, 
        password: action.password}
    case LOGOUT:
      return {...state, loggedIn: false, login: '', password: '', message: action.message}
    case REGISTERED:
      console.log('in redus')
      return {...state, registered: true}
    default:
      return state
  }
}

export const loginThunk = (name, password) => async (dispatch) => {
  let response = await authAPI.login(name, password)
  if (response.result === 0) {
    dispatch(loginAC(name, password))
  }
  else {
    dispatch(logoutAC(response.message))
  }
}

export const logoutThunk = () => async (dispatch) => {
  let response = await authAPI.logout()
  if (response.result === 0) {
    dispatch(logoutAC())
  }
}

export const registrationThunk = (name, email, password, confirmation) => async (dispatch) => {
  let response = await authAPI.register(name, email, password, confirmation)
  if (response.result === 0) {
    dispatch(registrationAC())
  }
  else {
    dispatch(logoutAC(response.message))
  }
}