import React, { useMemo } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DayItem, TodosCount } from '../styled-components/Day-style'

export const Day = ({date}) => {

  const dayTodos = useSelector(state => state.todosCalendar.filter(todo => todo.date === date))
  let day = useMemo(() => date.split('-')[2], [date])

  return (
    <DayItem>
      <Link className="dayLink" to={`/${date}`}>{+day < 10 ? day.charAt(1) : day}</Link>
      {dayTodos.length !== 0 && <TodosCount>{dayTodos.length}</TodosCount>}
    </DayItem>
  );
}

export default Day;
