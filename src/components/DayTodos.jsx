import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {useParams} from "react-router-dom";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'

import { deleteTodoThunk } from '../redux/calendar-reducer'
import {AddTodoForm} from './AddTodoForm'

export const DayTodos = (props) => {

  const { date } = useParams();
  const dayTodos = useSelector(state => state.todosCalendar.filter(todo => todo.date === date))

  const [allTodosRemoved, setAllTodosRemoved] = useState(false)

  const dispatch = useDispatch()
  const removeTodo = (id) => {
    dispatch(deleteTodoThunk(id))
    if (dayTodos.length === 1) {
      setAllTodosRemoved(true)
    }
  }

  return (
    <>
    {allTodosRemoved && <Redirect to="/" />}
    <h2>{date}</h2>
    {dayTodos.map(todo => 
    <div key={todo.id}><Link className="dayLink" to={`/todoitem/${todo.id}`}>{todo.title}</Link>
    <button onClick={() => removeTodo(todo.id)}>Delete</button>
    <button><Link className="dayLink" to={`/repeat/${todo.id}`}>Repeat</Link></button></div>)}
    <AddTodoForm date={date}/>
    <button onClick={() => props.exit()}>Log Out</button>
    </>
  );
}