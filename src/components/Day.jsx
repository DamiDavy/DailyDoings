import React, { useMemo, useContext } from 'react'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { todosSelector } from '../redux/selectors'

import { DayItem, TodosCount } from '../styled-components/Day-style'
import { ThemeContext } from '../App'
import '../App.css'

export const Day = ({ date }) => {
  const theme = useContext(ThemeContext)

  const dayTodos = useSelector(state => todosSelector(state, date))

  let day = useMemo(() => date.split('-')[2], [date])

  return (
    <DayItem>
      <Link className={theme === 'dark' ? 'dayLinkDark' : 'dayLink'} to={`/${date}`}>
        {+day < 10 ? day.charAt(1) : day}
      </Link>
      {dayTodos.length !== 0 && <TodosCount dark={theme === 'dark'}>{dayTodos.length}</TodosCount>}
    </DayItem>
  )
}
