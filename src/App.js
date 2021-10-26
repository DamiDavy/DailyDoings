import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect, NavLink } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import { logoutThunk, isAuthThunk } from './redux/auth-reducer'
import { loggedInSelector, loginSelector, sessionSelector, isLoadingSelector } from './redux/selectors'
import { deleteTodo } from './redux/calendar-reducer'

import { Calendar } from './components/Calendar'
import { DayTodos } from './components/DayTodos'
import { Login } from './components/Login'
import { Registration } from './components/Registration'

import { Container, ButtonLoginLogout, ButtonsContainer, FlexItem } from './App-style'
import './App.css'

const withRedirectionToLogin = (component, isAuth) => {
  if (!isAuth) return <Redirect to='/login' />
  return component
}

export const ThemeContext = React.createContext()

function App() {

  const themeFromLocalStorage = localStorage.getItem('theme') || 'light'

  const [theme, setTheme] = useState(themeFromLocalStorage)

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  const changeTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  const now = new Date()

  const [todosFetched, setTodosFetched] = useState(false)

  const todos = useSelector(state => state.todosCalendar.todos)

  const dispatch = useDispatch()

  const exit = () => {
    dispatch(logoutThunk(session))
    localStorage.removeItem('session')
    todos.map(todo => dispatch(deleteTodo(todo.id)))
  }

  const setFetched = () => {
    setTodosFetched(true)
  }

  const login = useSelector(loginSelector)
  const loggedIn = useSelector(loggedInSelector)
  const isLoading = useSelector(isLoadingSelector)
  const session = useSelector(sessionSelector)

  useEffect(() => {
    if (loggedIn && !localStorage.getItem('session')) {
      localStorage.setItem('session', session)
    } else if (localStorage.getItem('session') && !loggedIn) {
      dispatch(isAuthThunk(+localStorage.getItem('session')))
    }
  }, [loggedIn, session, dispatch])

  return (
    <BrowserRouter>
      {theme === 'dark' ? <img src='./dark-mountains.png'
        className='back-img' alt='night mountains' /> :
        <img src='./pinky.png'
          className='back-img light-img' alt='pink nature' />}

      <Container dark={theme === 'dark'}>
        <ButtonsContainer>
          <NavLink to="/" activeClassName='disabled'>
            <ButtonLoginLogout dark={theme === 'dark'}><h2>Daily Doings</h2></ButtonLoginLogout>
          </NavLink>
          <FlexItem>
            {isLoading ? <ButtonLoginLogout dark={theme === 'dark'} ><span>Loading...</span></ButtonLoginLogout> : null}
            {loggedIn ? <><span>As {login}</span>
              <ButtonLoginLogout onClick={() => exit()} dark={theme === 'dark'}>
                Log Out
              </ButtonLoginLogout></> : null}

            {(!loggedIn && !isLoading) ? <NavLink className='loginLinkGeneral' activeClassName='disabled' to={'/login'}>
              <ButtonLoginLogout dark={theme === 'dark'}>Login</ButtonLoginLogout>
            </NavLink> : null}
          </FlexItem>
        </ButtonsContainer>
        <ThemeContext.Provider value={theme}>
          <Switch>
            <Route path='/login' >
              <Login />
            </Route>
            <Route path='/registration'>
              <Registration />
            </Route>
            <Route path='/:date'>
              {withRedirectionToLogin(<DayTodos exit={exit} />, loggedIn)}
            </Route>
            <Route path='/'>
              <Calendar year={now.getFullYear()} month={now.getMonth()}
                today={now.getDate()} exit={exit}
                todosFetched={todosFetched} setFetched={setFetched} />
            </Route>
          </Switch>
        </ThemeContext.Provider>
        <ButtonsContainer>
          <FlexItem>
            <ButtonLoginLogout onClick={changeTheme} dark={theme === 'dark'}>
              To {theme === 'dark' ? 'Light' : 'Dark'} Theme
            </ButtonLoginLogout>
          </FlexItem>
        </ButtonsContainer>
      </Container>
    </BrowserRouter>
  )
}

export default App
