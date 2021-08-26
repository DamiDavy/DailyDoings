import React, { useEffect, useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { useDispatch, useSelector } from 'react-redux'
import { sessionSelector} from '../redux/selectors'
import { getTodosThunk } from '../redux/calendar-reducer'

import { Day } from './Day';

import { MonthTitle, CalendarGrid, MonthTitleAndButtonsContainer, 
  ChangeMonthButton } from '../styled-components/Calendar-style'
import { DayItem } from '../styled-components/Day-style'
import { ThemeContext } from '../App'
import '../App.css'

export const dateFormatted = (year, month, day) => {
  return `${year}-${month + 1 < 10 ? `0${month + 1}` : month + 1}-${day < 10 ? `0${day}` : day}`
}

const weekDays = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']

export const monthsTitles = ['january', 'february', 'march', 'april', 'may', 'june', 'july',
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

  const theme = useContext(ThemeContext)

  const session = useSelector(sessionSelector)

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
    if (session !== undefined) {
      const monthAsString = month + 1 < 10 ? `0${month + 1}` : month + 1
      dispatch(getTodosThunk(session, year, monthAsString))
    }
  }, [year, month, session, dispatch])

  return <>
    <MonthTitleAndButtonsContainer>
      <ChangeMonthButton onClick={showPreviousMonth} dark={theme === 'dark'}>&#8249;</ChangeMonthButton>
      <MonthTitle dark={theme === 'dark'}>{`${monthsTitles[month]} ${year}`}</MonthTitle>
      <ChangeMonthButton onClick={showNextMonth} dark={theme === 'dark'}>&#8250;</ChangeMonthButton>
    </MonthTitleAndButtonsContainer>
    <CalendarGrid>
      {weekDays.map(day => <DayItem key={day}>{day}</DayItem>)}
      {monthFirstWeekDay !== 0 &&
        [...Array(monthFirstWeekDay).keys()].map(() => <DayItem key={`empty${uuidv4()}`}></DayItem>)}

      {[...Array(lastMonthDay(year, month)).keys()]
        .map((index) =>
          <DayItem key={`num${uuidv4()}`}
            className={index + 1 === props.today && month === props.month && year === props.year ?
              'today' : 'day'}>
            <Day date={dateFormatted(year, month, index + 1)} />
          </DayItem>)}
    </CalendarGrid>
  </>
}