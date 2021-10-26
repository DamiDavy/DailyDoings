import React, { useMemo, useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { sessionSelector } from '../redux/selectors'
import { addTodoThunk } from '../redux/calendar-reducer'

import {
  TextInput, SubmitFormButton, FormContainer,
  DisabledButton, Error
} from '../styled-components/Forms-style'
import { ThemeContext } from '../App'

export const AddTodoForm = ({ date }) => {

  const theme = useContext(ThemeContext)

  const dateAsObject = useMemo(() => {
    return new Date(date)
  }, [date])

  const session = useSelector(sessionSelector)

  const dispatch = useDispatch()

  const [todo, setTodo] = useState('')
  const [error, setError] = useState('')

  const addTodoFromForm = (e) => {
    if (todo.length < 2) {
      setError('todo must contain at least 2 letters')
    }
    else {
      dispatch(addTodoThunk(session, todo, date))
      setTodo('')
    }
    e.preventDefault()
  }

  const validateInputLength = (title) => {
    if (title.length <= 18) {
      setTodo(title)
    }
    else {
      setError('todo must not contain more than 18 letters')
    }
  }

  return (
    <FormContainer dark={theme === 'dark'} onClick={() => setError('')}>
      <TextInput value={todo} onChange={(e) => validateInputLength(e.target.value)} placeholder='new todo text' />
      {new Date() > dateAsObject.setDate(dateAsObject.getDate() + 1) ?
        <DisabledButton dark={theme === 'dark'}>Add Todo</DisabledButton> :
        <SubmitFormButton dark={theme === 'dark'} onClick={(e) => addTodoFromForm(e)}>
          Add Todo
        </SubmitFormButton>}
      {error && <Error>{error}</Error>}
    </FormContainer>
  )
}