import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import { loginThunk} from '../redux/auth-reducer'
import {loggedInSelector, messageSelector} from '../redux/selectors'
import { LoginFormInput, SubmitFormButton, DisabledButton, Error, LoginFormContainer } from '../styled-components/Forms-style'
import '../App.css';

export const Login = () => {

  const loggedIn = useSelector(loggedInSelector)

  // useEffect(() => {
  //   hideLoginLink()
  //   setError('')
  // }, [hideLoginLink])

  const message = useSelector(messageSelector)

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

  return (
    <>
    {loggedIn && <Redirect to="/" />}
    <h2>Login</h2>
    <LoginFormContainer>
    <LoginFormInput value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" placeholder='login'/>
    <LoginFormInput value={password} onChange={(e) => setPassword(e.target.value)} 
    type='password' autoComplete="off" placeholder='password'/>

    {error !== '' ? <Error>{error}</Error> : <p></p>}
    {name.length >= 2 && password.length >= 4 ?
    <SubmitFormButton onClick={submitLoginForm}>Login</SubmitFormButton> :
    <DisabledButton>Login</DisabledButton>}
    </LoginFormContainer>
    <p>Or</p>
    <p><SubmitFormButton>
      <Link className='loginLink' to='/registration'>Register</Link>
    </SubmitFormButton></p>
    </>
  );
}