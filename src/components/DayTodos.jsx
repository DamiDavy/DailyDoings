import React, { useState, useMemo, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import { Redirect } from 'react-router'

import { deleteTodoThunk } from '../redux/calendar-reducer'
import { todosSelector } from '../redux/selectors';

import { AddTodoForm } from './AddTodoForm'
import { monthsTitles } from './Calendar'

import { TodosContainer } from '../styled-components/DatTodos-style'
import { ButtonLoginLogout, FlexItem, ButtonsContainer } from '../App-style'
import { Todo } from './Todo'
import { ThemeContext } from '../App'

export const DayTodos = () => {

  const { date } = useParams();
  const dateAsArray = useMemo(() => date.split('-'), [date])
  const dayTodos = useSelector(state => todosSelector(state, date))

  const [allTodosRemoved, setAllTodosRemoved] = useState(false)

  const dispatch = useDispatch()
  const removeTodo = (id) => {
    dispatch(deleteTodoThunk(id))
    if (dayTodos.length === 1) {
      setAllTodosRemoved(true)
    }
  }
  let history = useHistory();

  const [todoRepeatFormId, setTodoRepeatFormId] = useState(null)
  const [todoEditFormId, setTodoEditFormId] = useState(null)

  const showTodoRepeatForm = (id) => {
    setTodoRepeatFormId(id)
    setTodoEditFormId(null)
  }

  const hideTodoRepeatForm = () => {
    setTodoRepeatFormId(null)
    setTodoEditFormId(null)
  }

  const showTodoEditForm = (id) => {
    setTodoEditFormId(id)
    setTodoRepeatFormId(null)
  }

  const theme = useContext(ThemeContext)

  return (
    <>
      <TodosContainer dark={theme === 'dark'}>
        {allTodosRemoved && <Redirect to='/' />}
        <h3>{`${monthsTitles[+dateAsArray[1] - 1]} ${dateAsArray[2]} ${dateAsArray[0]}`}</h3>
        {dayTodos.map(todo => <Todo key={todo.id} todo={todo} removeTodo={removeTodo}
          showTodoRepeatForm={showTodoRepeatForm} hideTodoRepeatForm={hideTodoRepeatForm}
          repeatFormVisible={todo.id === todoRepeatFormId} showTodoEditForm={showTodoEditForm}
          editFormVisible={todo.id === todoEditFormId} />)}
        <AddTodoForm date={date} />
      </TodosContainer>
      <ButtonsContainer>
        <FlexItem>
          <ButtonLoginLogout onClick={() => history.push("/")} dark={theme === 'dark'} >
            Back To Calendar
          </ButtonLoginLogout>
        </FlexItem>
      </ButtonsContainer>
    </>
  )
}