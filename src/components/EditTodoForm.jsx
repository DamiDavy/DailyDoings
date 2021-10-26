import React, { useState, useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { sessionSelector } from '../redux/selectors'
import { editTodoThunk } from '../redux/calendar-reducer'

import {
  Error,
  RepeatFormContainer, TextInput, SubmitFormButton
} from '../styled-components/Forms-style'
import { ThemeContext } from '../App'

export const EditTodoForm = ({ todoId, hideTodoRepeatForm }) => {
  const theme = useContext(ThemeContext)

  const session = useSelector(sessionSelector)

  const todo = useSelector(state => state.todosCalendar.todos.find(todo => todo.id === +todoId))

  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setTitle(todo.title)
  }, [todo])

  const dispatch = useDispatch()

  const setTodoTitle = (id, title) => {
    dispatch(editTodoThunk(id, title))
    hideTodoRepeatForm()
  }

  const validateInputLength = (title) => {
    if (title.length <= 18) {
      setTitle(title)
    }
    else {
      setError('todo must not contain more than 18 letters')
    }
  }

  return (
    <RepeatFormContainer dark={theme === 'dark'} onClick={() => setError('')} >
      <TextInput value={title} onChange={(e) => validateInputLength(e.target.value)} />

      <SubmitFormButton dark={theme === 'dark'}
        onClick={() => setTodoTitle(+todoId, title)}>Save
      </SubmitFormButton>
      <SubmitFormButton dark={theme === 'dark'} onClick={() => hideTodoRepeatForm()}>Cansel</SubmitFormButton>
      {error && <Error>{error}</Error>}
    </RepeatFormContainer>
  )
}