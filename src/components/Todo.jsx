import React, { useContext } from 'react'

import { RepeatTodoForm } from './RepeatTodoForm'

import { TodoContainer, ButtonHandleTodo, 
  TodoTitle, TodoButtons } from '../styled-components/DatTodos-style'
import '../App.css';
import { ThemeContext } from '../App'

export const Todo = ({ todo, removeTodo, repeatFormVisible, showTodoRepeatForm, hideTodoRepeatForm }) => {

  const theme = useContext(ThemeContext)

  return (
    <>
      <TodoContainer dark={theme === 'dark'}><TodoTitle>{todo.title}</TodoTitle>
        <TodoButtons>
          {!repeatFormVisible &&
            <ButtonHandleTodo dark={theme === 'dark'} onClick={() => showTodoRepeatForm(todo.id)}>
              &#8634;
            </ButtonHandleTodo>}
          <ButtonHandleTodo dark={theme === 'dark'} onClick={() => removeTodo(todo.id)}>
            &#10539;
          </ButtonHandleTodo>
        </TodoButtons>
      </TodoContainer>
      {repeatFormVisible && <RepeatTodoForm todoId={todo.id} hideTodoRepeatForm={hideTodoRepeatForm} />}
    </>
  )
}