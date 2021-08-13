import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {loggedInSelector, loginSelector} from '../redux/selectors'

import {addTodoThunk} from '../redux/calendar-reducer'

export const AddTodoForm = ({date}) => {
  const dateAsObject = new Date(date)

  const user = useSelector(loginSelector)

  const dispatch = useDispatch()

  const [todo, setTodo] = useState('')
  const [error, setError] = useState('')

  const addTodoFromForm = (e) => {
    if (todo.length < 2) {
      setError('todo must contain at least 2 letters')
    }
    else {
      console.log(user, todo, date)
      dispatch(addTodoThunk(user, todo, date))
      setTodo('')
    }
    e.preventDefault()
  }

  return (
    <>
    <input value={todo} onChange={(e) => setTodo(e.target.value)}/>
    {error && <span>{error}</span>}
    <button onClick={(e) => addTodoFromForm(e)}
    disabled={new Date() > dateAsObject.setDate(dateAsObject.getDate() + 1)}
    >Add</button>
    </>
  );
}