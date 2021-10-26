import { todoAPI } from '../api'

const ADD_TODO = 'ADD_TODO'
const DELETE_TODO = 'DELETE_TODO'
const TOGGLE_IS_FETCHING = 'DELETE_TODO'
const EDIT_TODO = 'EDIT_TODO'

export const addTodo = (date, todo, id) => ({
  type: ADD_TODO,
  date, todo, id
})

export const deleteTodo = (id) => ({
  type: DELETE_TODO, id
})

export const editTodo = (id, title) => ({
  type: EDIT_TODO, id, title
})

const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
})

const initialState = {
  todos: [],
  isFetching: false,
}

export const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      if (state.todos.some(item => item.id === action.id)) {
        return state
      }
      else {
        const newTodo = {
          title: action.todo,
          id: action.id,
          date: action.date
        }
        return { ...state, todos: [...state.todos, newTodo] }
      }
    case EDIT_TODO:
      const todoTarget = state.todos.find(todo => todo.id === action.id)
      const newTodo = {
        ...todoTarget,
        title: action.title
      }
      const newTodos = state.todos.filter(todo => todo.id !== action.id)
      return { ...state, todos: [...newTodos, newTodo] }
    case DELETE_TODO:
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.id) }
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching }
    default:
      return state
  }
}

export const getTodosThunk = (session, year, month) => async (dispatch) => {
  toggleIsFetching(true)
  const response = await todoAPI.fetchTodos(+session, year, month)
  response.forEach(todo => {
    const dateAsString = `${todo.year}-${todo.month}-${todo.day}`
    dispatch(addTodo(dateAsString, todo.title, todo.id))
  })
  toggleIsFetching(false)
}

export const addTodoThunk = (session, title, date) => async (dispatch) => {
  const response = await todoAPI.addTodoFetch(+session, title, date)
  if (response.result === 0) {
    const dateAsArray = date.split('-')
    dispatch(getTodosThunk(session, dateAsArray[0], dateAsArray[1]))
  }
}

export const editTodoThunk = (id, title) => async (dispatch) => {
  const response = await todoAPI.editTodoFetch(id, title)
  if (response.result === 0) {
    dispatch(editTodo(id, title))
  }
}

export const deleteTodoThunk = (id) => async (dispatch) => {
  const response = await todoAPI.deleteTodoFetch(id)
  if (response.result === 0) {
    dispatch(deleteTodo(id))
  }
}