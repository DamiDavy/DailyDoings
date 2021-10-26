import { authAPI } from '../api'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const REGISTERED = 'REGISTERED'
const SET_REG_ERROR = 'SET_REG_ERROR'
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR'
const USER_LOADING = 'USER_LOADING'

export const loginAC = (login, session) => ({
  type: LOGIN,
  login, session
})

export const registrationAC = () => ({ type: REGISTERED })

export const logoutAC = () => ({ type: LOGOUT })

export const setErrorRegMessage = (message = '') => ({ type: SET_REG_ERROR, message })
export const setErrorLoginMessage = (message = '') => ({ type: SET_LOGIN_ERROR, message })

const initialState = {
  loggedIn: false,
  registered: false,
  isLoading: false,
}

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        login: action.login,
        session: action.session,
        isLoading: false,
      }
    case LOGOUT:
      localStorage.removeItem('session')
      return {
        ...state,
        loggedIn: false,
        login: '',
        isLoading: false,
      }
    case REGISTERED:
      return {
        ...state,
        registered: true,
        isLoading: false,
      }
    case SET_REG_ERROR:
      return {
        ...state,
        messageReg: action.message,
        isLoading: false,
      }
    case SET_LOGIN_ERROR:
      return {
        ...state,
        messageLogin: action.message,
        isLoading: false,
      }
    default:
      return state
  }
}

export const loginThunk = (name, password) => async (dispatch) => {
  dispatch({ type: USER_LOADING })
  const response = await authAPI.login(name, password)
  if (response.result === 0) {
    dispatch(loginAC(name, response.session))
  }
  else {
    dispatch(setErrorLoginMessage(response.message))
  }
}

export const isAuthThunk = (session) => async (dispatch) => {
  dispatch({ type: USER_LOADING })
  const response = await authAPI.isAuth(+session)
  console.log(session)
  if (response.result === 0) {
    dispatch(loginAC(response.name, session))
  } else {
    console.log('logout')
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
  dispatch({ type: USER_LOADING })
  const response = await authAPI.register(name, email, password, confirmation)
  if (response.result === 0) {
    dispatch(registrationAC())
  }
  else {
    dispatch(setErrorRegMessage(response.message))
  }
}