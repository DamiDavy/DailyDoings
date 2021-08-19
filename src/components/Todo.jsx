import React from 'react'

import { TodoContainer, ButtonHandleTodo, 
  TodoTitle, TodoButtons } from '../styled-components/DatTodos-style'
import { RepeatTodoForm } from './RepeatTodoForm'
import '../App.css';

export const Todo = ({todo, removeTodo, repeatFormVisible, showTodoRepeatForm, hideTodoRepeatForm}) => {

  return (
    <>
    <TodoContainer><TodoTitle>{todo.title}</TodoTitle>
      <TodoButtons>
        {!repeatFormVisible &&
          <ButtonHandleTodo onClick={() => showTodoRepeatForm(todo.id)}>&#8634;</ButtonHandleTodo>}
        <ButtonHandleTodo onClick={() => removeTodo(todo.id)}>&#10539;</ButtonHandleTodo>
      </TodoButtons>
      
    </TodoContainer>
    {repeatFormVisible && <RepeatTodoForm todoId={todo.id} hideTodoRepeatForm={hideTodoRepeatForm}/>}
    </>
  );
}