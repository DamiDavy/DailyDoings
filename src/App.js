import './App.css';
import { BrowserRouter, Switch, Route, Redirect, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import {Calendar} from './components/Calendar'
import {DayTodos} from './components/DayTodos'
import {Login} from './components/Login'
import { logoutThunk, loginAC } from './redux/auth-reducer'
import { loggedInSelector, loginSelector } from './redux/selectors'
import { Registration } from './components/Registration';
import { useEffect, useState } from 'react';
import { deleteTodo } from './redux/calendar-reducer';
import { Container, ButtonLoginLogout, Header, AuthInfo } from './App-style'

const withRedirectionToLogin = (component, isAuth) => {
  if (!isAuth) return <Redirect to="/login" />
  return component
}

function App() {

  const now = new Date()

  const [todosFetched, setTodosFetched] = useState(false)

  const todos = useSelector(state => state.todosCalendar)

  const dispatch = useDispatch()

  const exit = () => {
    dispatch(logoutThunk())
    localStorage.removeItem('login')
    localStorage.removeItem('authorized')
    todos.map(todo => dispatch(deleteTodo(todo.id)))
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
  }, [loggedIn, login, dispatch])

  // const [hiddenLoginLink, setHiddenLoginLink] = useState(false)

  // const hideLoginLink = () => {
  //   setHiddenLoginLink(true)
  // }

  // const showLoginLink = () => {
  //   setHiddenLoginLink(false)
  // }

  return (
    <BrowserRouter>
    <Container>
      <Header>
      <AuthInfo>
    {loggedIn ? <><span>As {login}</span>
    <ButtonLoginLogout onClick={() => exit()}>Log Out</ButtonLoginLogout></> :
    <ButtonLoginLogout>
      <NavLink className='loginLinkGeneral' activeClassName="selected" to={'/login'}>Login</NavLink>
      </ButtonLoginLogout>}
    </AuthInfo>
    </Header>
      <Switch>
        <Route path="/login" >
          <Login/>
        </Route>
        <Route path="/registration" >
          <Registration/>
        </Route>
        <Route path="/:date">
          {withRedirectionToLogin(<DayTodos exit={exit}/>, loggedIn)}
        </Route>
        <Route path="/">
          <Calendar year={now.getFullYear()} month={now.getMonth()} 
                          today={now.getDate()} exit={exit} 
                          todosFetched={todosFetched} setFetched={setFetched}/>
        </Route>
      </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
