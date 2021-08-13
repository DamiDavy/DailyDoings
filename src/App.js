import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import {Calendar} from './components/Calendar'
import {DayTodos} from './components/DayTodos'
import {RepeatTodoForm} from './components/RepeatTodoForm'
import {Login} from './components/Login'
import { logoutThunk, loginAC, logoutAC } from './redux/auth-reducer'
import { loggedInSelector, loginSelector } from './redux/selectors'
import { Registration } from './components/Registration';
import { useEffect, useState } from 'react';
import { isAuthorized, login } from './api'

const withRedirectionToLogin = (component, isAuth) => {
  if (!isAuth) return <Redirect to="/login" />
  return component
}

function App() {

  const now = new Date()

  const [todosFetched, setTodosFetched] = useState(false)

  const dispatch = useDispatch()

  const exit = () => {
    dispatch(logoutThunk())
    localStorage.removeItem('login')
    localStorage.removeItem('authorized')
    console.log('logged out')
  }

  const setFetched = () => {
    setTodosFetched(true)
  }

  const login = useSelector(loginSelector)
  const loggedIn = useSelector(loggedInSelector)

  useEffect(() => {
    if (loggedIn && !localStorage.getItem('authorized')) {
      localStorage.setItem('login', login)
      localStorage.setItem('authorized', 'ok')
    } else if (localStorage.getItem('authorized') === 'ok' && !loggedIn) {
      dispatch(loginAC(localStorage.getItem('login'), ''))
    }
    const authInfoFromLocalStorage = localStorage.getItem('authorized')
    const loginFromLocalStorage = localStorage.getItem('login')
    console.log(authInfoFromLocalStorage, loginFromLocalStorage, loggedIn)
  }, [loggedIn])

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" >
          <Login />
        </Route>
        <Route path="/registration" >
          <Registration />
        </Route>
        <Route path="/repeat/:todoId">
          {withRedirectionToLogin(<RepeatTodoForm exit={exit}/>, loggedIn)}
        </Route>
        <Route path="/:date">
          {withRedirectionToLogin(<DayTodos exit={exit}/>, loggedIn)}
        </Route>
        <Route path="/">
          {withRedirectionToLogin(<Calendar year={now.getFullYear()} month={now.getMonth()} 
                          today={now.getDate()} exit={exit} 
                          todosFetched={todosFetched} setFetched={setFetched}/>, loggedIn)}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
