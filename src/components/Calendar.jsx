import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import '../App.css'
import { Day } from './Day';
import { useDispatch, useSelector } from 'react-redux'

import {loggedInSelector, loginSelector} from '../redux/selectors'
import { getTodosThunk } from '../redux/calendar-reducer'
import { fetchTodos } from '../api';

const weekDays = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']

const monthsTitles = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 
                      'august', 'september', 'october', 'november', 'december']

const weekDayHandling = (day) => {
  if (day === 0) return 6
  else return day - 1
}

const lastMonthDay = (year, month) => {
  const firstDay = new Date(year, month)
  firstDay.setMonth(firstDay.getMonth() + 1)
  firstDay.setDate(0)
  return firstDay.getDate()
}

const getFirstWeekDay = (year, month) => {
  const firstDay = new Date(year, month)
  return weekDayHandling(firstDay.getDay())
}

export const Calendar = (props) => {

  const user = useSelector(loginSelector)

  const [year, setYear] = useState(props.year)
  const [month, setMonth] = useState(props.month)

  const [monthFirstWeekDay, setMonthFirstWeekDay] = 
  useState(getFirstWeekDay(year, month))

  useEffect(() => {
    setMonthFirstWeekDay(getFirstWeekDay(year, month))
  }, [year, month])

  const showPreviousMonth = () => {
    setMonth(prev => {
      if (prev === 0) {
        setYear(y => y - 1)
        return 11
      }
      return prev - 1
    })
  }

  const showNextMonth = () => {
    setMonth(prev => {
      if (prev === 11) {
        setYear(y => y + 1)
        return 0
      }
      return prev + 1
    })
  }

  const dispatch = useDispatch()

  useEffect(() => {
    const monthAsString = month + 1 < 10 ? `0${month + 1}` : month + 1
    dispatch(getTodosThunk(user, year, monthAsString))
    console.log('todos for', year, monthAsString)
  }, [year, month])

  return <>
  
  <h3>{`${monthsTitles[month]} ${year}`}</h3>
  <div>
    <button onClick={showPreviousMonth}>Prev</button>
    <button onClick={showNextMonth}>Next</button>
  </div>
  <div className='wrapper'>
      {weekDays.map(day => <div>{day}</div>)}
        {monthFirstWeekDay !== 0 && 
        [...Array(monthFirstWeekDay).keys()].map(() => <div key={`empty${uuidv4()}`}></div>)}

      {[...Array(lastMonthDay(year, month)).keys()]
      .map((index) => <div key={`num${uuidv4()}`}
      className={index + 1 === props.today && month === props.month && year === props.year ? 'today' : 'day'}>
        <Day day={index + 1} month={month} year={year} /> </div>)}
  </div>
  <button onClick={() => props.exit()}>Log Out</button>
  </>
}