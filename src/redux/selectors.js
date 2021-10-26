export const loggedInSelector = (state) => {
  return state.authentication.loggedIn
}
export const registeredSelector = (state) => {
  return state.authentication.registered
}
export const loginSelector = (state) => {
  return state.authentication.login
}
export const isLoadingSelector = (state) => {
  return state.authentication.isLoading
}
export const sessionSelector = (state) => {
  return state.authentication.session
}

export const messageLoginSelector = (state) => {
  return state.authentication.messageLogin
}
export const messageRegSelector = (state) => {
  return state.authentication.messageReg
}

export const todosSelector = (state, date) => {
  return state.todosCalendar.todos.filter(todo => todo.date === date)
}