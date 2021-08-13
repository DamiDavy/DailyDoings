import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import { loginThunk} from '../redux/auth-reducer'
import {loggedInSelector} from '../redux/selectors'

export const Login = () => {

  const loggedIn = useSelector(loggedInSelector)
  // console.log(loggedIn)
  // const loggedIn = localStorage.getItem('authorized')

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const submitLoginForm = (e) => {
    dispatch(loginThunk(name, password))
    e.preventDefault()
  }

  // const addTodoFromForm = () => {
  //   if (todo.length < 2) {
  //     setError('todo must contain at least 2 letters')
  //   }
  //   else {
  //     dispatch(addTodo(date, todo))
  //     setTodo('')
  //   }
  // }

  return (
    <>
    {loggedIn && <Redirect to="/" />}
    <h2>Login</h2>
    <form>
    <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="off"/>
    <input value={password} onChange={(e) => setPassword(e.target.value)} 
    type='password' autoComplete="off"/>
    <button onClick={submitLoginForm}
    disabled={name.length < 2 || password.length < 4} >Login</button>
    </form>
    <Link to='/registration'>Register</Link>
    </>
  );
}