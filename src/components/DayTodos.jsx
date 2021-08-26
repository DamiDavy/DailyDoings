import React, { useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { Redirect } from 'react-router'

import { deleteTodoThunk } from '../redux/calendar-reducer'
import { todosSelector } from '../redux/selectors';

import { AddTodoForm } from './AddTodoForm'
import { monthsTitles } from './Calendar'

import { TodosContainer } from '../styled-components/DatTodos-style'
import { Todo } from './Todo'

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

  const [todoRepeatFormId, setTodoRepeatFormId] = useState(null)

  const showTodoRepeatForm = (id) => {
    setTodoRepeatFormId(id)
  }

  const hideTodoRepeatForm = () => {
    setTodoRepeatFormId(null)
  }

  return (
    <TodosContainer>
      {allTodosRemoved && <Redirect to='/' />}
      <h3>{`${monthsTitles[+dateAsArray[1] - 1]} ${dateAsArray[2]} ${dateAsArray[0]}`}</h3>
      {dayTodos.map(todo => <Todo key={todo.id} todo={todo} removeTodo={removeTodo}
        showTodoRepeatForm={showTodoRepeatForm} hideTodoRepeatForm={hideTodoRepeatForm}
        repeatFormVisible={todo.id === todoRepeatFormId} />)}
      <AddTodoForm date={date} />
    </TodosContainer>
  )
}