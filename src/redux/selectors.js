export const loggedInSelector = (state) => {
  return state.authentication.loggedIn
}

export const registeredSelector = (state) => {
  return state.authentication.registered
}

export const loginSelector = (state) => {
  return state.authentication.login
}

export const messageSelector = (state) => {
  return state.authentication.message
}