import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { registrationThunk } from '../redux/auth-reducer'
import { messageSelector, registeredSelector } from '../redux/selectors'
import { LoginFormInput, SubmitFormButton, DisabledButton, Error} from '../styled-components/Forms-style'
import '../App.css';

export const Registration = () => {

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')

  const [error, setError] = useState('')

  const registered = useSelector(registeredSelector)

  const message = useSelector(messageSelector)

  const dispatch = useDispatch()
  const submitRegistrationForm = (e) => {
    dispatch(registrationThunk(login, email, password, passwordRepeat))
    e.preventDefault()
  }

  useEffect(() => {
    setError(message)
  }, [message])

  const inputValidation = (e, type, title) => {
      if (type.length < 4) {
        setError(`${title} must contain at least four letters`)
        e.target.style.border = '2px solid IndianRed'
      } else {
        setError('')
        e.target.style.border = '1px solid gray'
      }
  }

  const equalityPasswordsValidation = (e) => {
    if (password !== passwordRepeat) {
      setError('passwords are not equal')
      e.target.style.border = '2px solid IndianRed'
    }
    else {
      setError('')
      e.target.style.border = '1px solid gray'
    }
  } 

  const emailValidation = (e) => {
    const re = /^[^@]+@[^@]+.[^@]+$/
    if (!re.test(email)) {
      setError('invalid email address')
      e.target.style.border = '2px solid IndianRed'
    }
    else {
      setError('')
      e.target.style.border = '1px solid gray'
    }
  } 

  return (
    <>
    {registered && <Redirect to="/login" />}
    <h2>Registration</h2>
    <form>
    <LoginFormInput value={login} onChange={(e) => setLogin(e.target.value)} autoComplete="off" placeholder='login'
        onBlur={e => inputValidation(e, login, 'login')}/><br/>
    <LoginFormInput value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="off" placeholder='password'
        onBlur={e => inputValidation(e, password, 'password')}/><br/>
    <LoginFormInput value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} type="password" 
        autoComplete="off" placeholder='repeat password' 
        onKeyUp={e => equalityPasswordsValidation(e)} /><br/>
    <LoginFormInput value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" placeholder='name'/><br/>
    <LoginFormInput value={surname} onChange={(e) => setSurname(e.target.value)} autoComplete="off" placeholder='surname'/><br/>
    <LoginFormInput value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" placeholder='email' 
    onBlur={e => emailValidation(e)} /><br/>

    <Error>{error}</Error>

    {login.length < 4 || password.length < 4 || passwordRepeat !== password || email.length < 5 ? 
    <DisabledButton>Register</DisabledButton> :
    <SubmitFormButton onClick={submitRegistrationForm}>Register</SubmitFormButton>}
    </form>
    <p>Or</p>
    <p><SubmitFormButton>
      <Link className='loginLink' to='/login'>Login</Link>
    </SubmitFormButton></p>
    </>
  );
}