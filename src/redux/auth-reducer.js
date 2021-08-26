import { authAPI } from '../api'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const REGISTERED = 'REGISTERED'
const SET_REG_ERROR = 'SET_REG_ERROR'
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR'

export const loginAC = (login, session) => ({
  type: LOGIN,
  login, session
})

export const registrationAC = () => ({ type: REGISTERED })

export const logoutAC = () => ({ type: LOGOUT })

export const setErrorRegMessage = (message = '') => ({ type: SET_REG_ERROR, message })
export const setErrorLoginMessage = (message = '') => ({ type: SET_LOGIN_ERROR, message })

export const authenticationReducer = (state = {loggedIn: false, registered: false}, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state, loggedIn: true, login: action.login, session: action.session }
    case LOGOUT:
      return {...state, loggedIn: false, login: '' }
    case REGISTERED:
      return {...state, registered: true}
    case SET_REG_ERROR: 
      return {...state, messageReg: action.message}
    case SET_LOGIN_ERROR: 
      return {...state, messageLogin: action.message}
    default:
      return state
  }
}

export const loginThunk = (name, password) => async (dispatch) => {
  const response = await authAPI.login(name, password)
  if (response.result === 0) {
    dispatch(loginAC(name, response.session))
  }
  else {
    dispatch(setErrorLoginMessage(response.message))
  }
}

export const isAuthThunk = (session) => async (dispatch) => {
  const response = await authAPI.isAuth(+session)
  if (response.result === 0) {
    dispatch(loginAC(response.name, session))
  } else {
    dispatch(logoutAC())
  }
}

export const logoutThunk = (session) => async (dispatch) => {
  const response = await authAPI.logout(+session)
  if (response.result === 0) {
    dispatch(logoutAC())
  }
}

export const registrationThunk = (name, email, password, confirmation) => async (dispatch) => {
  const response = await authAPI.register(name, email, password, confirmation)
  if (response.result === 0) {
    dispatch(registrationAC())
  }
  else {
    dispatch(setErrorRegMessage(response.message))
  }
}