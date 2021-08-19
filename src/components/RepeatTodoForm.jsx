import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router'

import { loginSelector} from '../redux/selectors'
import { addTodoThunk } from '../redux/calendar-reducer'
import {dateFormatted} from './Calendar'
import { RepeatConfirmButton, CancelButton, RepeatFormContainer, InlineInput } from '../styled-components/Forms-style'

export const RepeatTodoForm = ({todoId, hideTodoRepeatForm}) => {

  const user = useSelector(loginSelector)

  const todo = useSelector(state => state.todosCalendar.filter(todo => todo.id === +todoId))

  const [repaetedSuccessfully, setRepaetedSuccessfully] = useState(false)

  const [dayCount, setDayCount] = useState(1)
  const [repeatDayCount, setRepeatDayCount] = useState(1)

  const [weekCount, setWeekCount] = useState(1)
  const [repeatWeekCount, setRepeatWeekCount] = useState(1)

  const dispatch = useDispatch()

  const repeatInDaysOrWeeks = (repeatCount, timeAmount) => {
    const dateObject = new Date(todo[0].date)
    for (let i = 0; i < repeatCount; i += 1) {
      dateObject.setDate(dateObject.getDate() + +timeAmount)
      const newDateAsString = 
        dateFormatted(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate())
      dispatch(addTodoThunk(user, todo[0].title, newDateAsString))
    }
    setRepaetedSuccessfully(true)
  }

  return (
    <>
    {repaetedSuccessfully && <Redirect to="/" />}

    <RepeatFormContainer>In <InlineInput value={dayCount} onChange={(e) => setDayCount(e.target.value)}/> 
    day(s) for <InlineInput value={repeatDayCount} onChange={(e) => setRepeatDayCount(e.target.value)}/> 
    time(s) 
    <RepeatConfirmButton onClick={() => repeatInDaysOrWeeks(repeatDayCount, dayCount)}>OK</RepeatConfirmButton>
    </RepeatFormContainer>

    <RepeatFormContainer>In <InlineInput value={weekCount} onChange={(e) => setWeekCount(e.target.value)}/> 
    week(s) for <InlineInput value={repeatWeekCount} onChange={(e) => setRepeatWeekCount(e.target.value)}/> 
    time(s) <RepeatConfirmButton onClick={() => repeatInDaysOrWeeks(repeatWeekCount, 7 * weekCount)}>
      OK</RepeatConfirmButton></RepeatFormContainer>
      <RepeatFormContainer>
        <CancelButton onClick={() => hideTodoRepeatForm()}>Cansel</CancelButton>
      </RepeatFormContainer>
    </>
  );
}