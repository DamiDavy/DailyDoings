import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginSelector} from '../redux/selectors'

import {addTodoThunk} from '../redux/calendar-reducer'
import { TextInput, SubmitFormButton, FormContainer, DisabledButton, Error } from '../styled-components/Forms-style'

export const AddTodoForm = ({date}) => {
  const dateAsObject = useMemo(() => {
    console.log(date)
    return new Date(date)
  }, [date])

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
    <FormContainer>
    <TextInput value={todo} onChange={(e) => setTodo(e.target.value)} placeholder='title'/>
    {new Date() > dateAsObject.setDate(dateAsObject.getDate() + 1) ? 
    <DisabledButton>Add Todo</DisabledButton> :
    <SubmitFormButton onClick={(e) => addTodoFromForm(e)}>Add Todo</SubmitFormButton>}
    {error && <Error>{error}</Error>}
    </FormContainer>
  );
}