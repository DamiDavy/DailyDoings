import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useParams } from 'react-router'

import {loggedInSelector, loginSelector} from '../redux/selectors'
import { addTodoThunk } from '../redux/calendar-reducer'
import {dateFormatted} from './Day'

export const RepeatTodoForm = (props) => {

  const user = useSelector(loginSelector)
  // const user = localStorage.getItem('login')

  const { todoId } = useParams();
  console.log( todoId )
  const todo = useSelector(state => state.todosCalendar.filter(todo => todo.id === +todoId))
  console.log(todo)

  const[repaetedSuccessfully, setRepaetedSuccessfully] = useState(false)

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
    <h2>Repeat {todo[0].title} of {todo[0].date}</h2>

    <p>In <input value={dayCount} onChange={(e) => setDayCount(e.target.value)}/> 
    day(s) for <input value={repeatDayCount} onChange={(e) => setRepeatDayCount(e.target.value)}/> 
    time(s) <button onClick={() => repeatInDaysOrWeeks(repeatDayCount, dayCount)}>OK</button></p>

    <p>In <input value={weekCount} onChange={(e) => setWeekCount(e.target.value)}/> 
    weeks(s) for <input value={repeatWeekCount} onChange={(e) => setRepeatWeekCount(e.target.value)}/> 
    time(s) <button onClick={() => repeatInDaysOrWeeks(repeatWeekCount, 7 * weekCount)}>OK</button></p>
    <button onClick={() => props.exit()}>Log Out</button>
    </>
  );
}