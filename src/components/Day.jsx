import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const dateFormatted = (year, month, day) => {
  return `${year}-${month + 1 < 10 ? `0${month + 1}` : month + 1}-${day < 10 ? `0${day}` : day}`
}

export const Day = ({day, month, year}) => {

  const dateInFormat = dateFormatted(year, month, day)

  const dayTodos = useSelector(state => state.todosCalendar.filter(todo => todo.date === dateInFormat))

  return (
    <>
    <Link className="dayLink" to={`/${dateInFormat}`}>{day}</Link>
    <div className="todosCount">{dayTodos.length !== 0 && dayTodos.length}</div>
    </>
  );
}

export default Day;
