import React, { useEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import { loginThunk, setErrorLoginMessage } from '../redux/auth-reducer'
import {loggedInSelector, messageLoginSelector} from '../redux/selectors'

import { LoginFormInput, SubmitFormButton, 
  DisabledButton, Error, LoginFormContainer } from '../styled-components/Forms-style'
import '../App.css'
import { ThemeContext } from '../App'

export const Login = () => {
  const theme = useContext(ThemeContext)

  const loggedIn = useSelector(loggedInSelector)

  const message = useSelector(messageLoginSelector)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')

  const dispatch = useDispatch()

  const submitLoginForm = (e) => {
    dispatch(loginThunk(name, password))
    e.preventDefault()
  }

  useEffect(() => {
    setError(message)
  }, [message])

  const clearErrorMessage = () => {
    dispatch(setErrorLoginMessage(''))
  }

  return (
    <>
      {loggedIn && <Redirect to='/' />}
      <h2>Login</h2>
      <LoginFormContainer>
        <form>
          <LoginFormInput onClick={() => setError('')} value={name} onChange={(e) => setName(e.target.value)}
            autoComplete='off' placeholder='login' dark={theme === 'dark'} />
          <LoginFormInput onClick={() => setError('')} value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password' autoComplete='off' placeholder='password' dark={theme === 'dark'} />

          {error !== '' ? <Error>{error}</Error> : <p />}
          {name.length >= 2 && password.length >= 4 ?
            <SubmitFormButton onClick={submitLoginForm} dark={theme === 'dark'}>Login</SubmitFormButton> :
            <DisabledButton dark={theme === 'dark'}>Login</DisabledButton>}
        </form>
      </LoginFormContainer>
      <p>Or</p>
      <p>
        <Link className='loginLink' to='/registration'>
          <SubmitFormButton dark={theme === 'dark'} onClick={clearErrorMessage}>Register</SubmitFormButton>
        </Link>
      </p>
    </>
  )
}