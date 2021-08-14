import { v4 as uuidv4 } from 'uuid'
import { fetchTodos, addTodoFetch, deleteTodoFetch } from '../api'

const ADD_TODO = 'ADD_TODO'
const DELETE_TODO = 'DELETE_TODO'

export const addTodo = (date, todo, id, user) => ({
  type: ADD_TODO,
  date, todo, id, user
})

export const deleteTodo = (id) => ({
  type: DELETE_TODO, id
})

export const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      console.log('added', action.todo, action.date)
      if (state.some(item => item.id === action.id)) {
        return state
      }
      else {
        const newTodo = {
            user: action.user,
            title: action.todo,
            id: action.id,
            date: action.date
          }
        return [ ...state, newTodo ]
      }
    case DELETE_TODO:
        return state.filter(todo => todo.id !== action.id);
    default:
      return state
  }
}

export const getTodosThunk = (user, year, month) => async (dispatch) => {
  console.log(user)
  let response = await fetchTodos(user, year, month)
  response.forEach(todo => {
    const dateAsString = `${todo.year}-${todo.month}-${todo.day}`
    dispatch(addTodo(dateAsString, todo.title, todo.id, todo.user))
  })
}

export const addTodoThunk = (user, title, date) => async (dispatch) => {
  let response = await addTodoFetch(user, title, date)
  if (response.result === 0) {
    const dateAsArray = date.split('-')
    dispatch(getTodosThunk(user, dateAsArray[0], dateAsArray[1]))
  }
}

export const deleteTodoThunk = (id) => async (dispatch) => {
  let response = await deleteTodoFetch(id)
  if (response.result === 0) {
    dispatch(deleteTodo(id))
  }
}