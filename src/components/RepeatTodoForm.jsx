import React, { useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router'

import { sessionSelector} from '../redux/selectors'
import { addTodoThunk } from '../redux/calendar-reducer'

import { dateFormatted } from './Calendar'

import { RepeatConfirmButton, CancelButton, 
  RepeatFormContainer, InlineInput } from '../styled-components/Forms-style'
import { ThemeContext } from '../App'

export const RepeatTodoForm = ({ todoId, hideTodoRepeatForm }) => {
  const theme = useContext(ThemeContext)

  const session = useSelector(sessionSelector)

  const todo = useSelector(state => state.todosCalendar.todos.find(todo => todo.id === +todoId))

  const [repaetedSuccessfully, setRepaetedSuccessfully] = useState(false)

  const [dayCount, setDayCount] = useState(1)
  const [repeatDayCount, setRepeatDayCount] = useState(1)

  const [weekCount, setWeekCount] = useState(1)
  const [repeatWeekCount, setRepeatWeekCount] = useState(1)

  const dispatch = useDispatch()

  const repeatInDaysOrWeeks = (repeatCount, timeAmount) => {
    const dateObject = new Date(todo.date)
    for (let i = 0; i < repeatCount; i += 1) {
      dateObject.setDate(dateObject.getDate() + +timeAmount)
      const newDateAsString =
        dateFormatted(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate())
      dispatch(addTodoThunk(session, todo.title, newDateAsString))
    }
    setRepaetedSuccessfully(true)
  }

  return (
    <>
      {repaetedSuccessfully && <Redirect to='/' />}

      <RepeatFormContainer dark={theme === 'dark'}>
        In
        <InlineInput value={dayCount} onChange={(e) => setDayCount(e.target.value)} />
        day{dayCount > 1 && 's'} for
        <InlineInput value={repeatDayCount} onChange={(e) => setRepeatDayCount(e.target.value)} />
        time{repeatDayCount > 1 && 's'}
        <RepeatConfirmButton dark={theme === 'dark'}
          onClick={() => repeatInDaysOrWeeks(repeatDayCount, dayCount)}>OK
        </RepeatConfirmButton>
      </RepeatFormContainer>

      <RepeatFormContainer dark={theme === 'dark'}>
        In
        <InlineInput value={weekCount} onChange={(e) => setWeekCount(e.target.value)} />
        week{weekCount > 1 && 's'} for
        <InlineInput value={repeatWeekCount} onChange={(e) => setRepeatWeekCount(e.target.value)} />
        time{repeatWeekCount > 1 && 's'}
        <RepeatConfirmButton dark={theme === 'dark'}
          onClick={() => repeatInDaysOrWeeks(repeatWeekCount, 7 * weekCount)}>
          OK</RepeatConfirmButton>
      </RepeatFormContainer>
      <RepeatFormContainer dark={theme === 'dark'}>
        <CancelButton dark={theme === 'dark'} onClick={() => hideTodoRepeatForm()}>Cansel</CancelButton>
      </RepeatFormContainer>
    </>
  )
}