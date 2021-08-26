import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { registrationThunk, setErrorRegMessage } from '../redux/auth-reducer'
import { messageRegSelector, registeredSelector } from '../redux/selectors'

import { LoginFormInput, SubmitFormButton, DisabledButton, Error} from '../styled-components/Forms-style'
import '../App.css'
import { ThemeContext } from '../App'

export const Registration = () => {
  const theme = useContext(ThemeContext)

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')

  const [error, setError] = useState('')

  const registered = useSelector(registeredSelector)

  const message = useSelector(messageRegSelector)

  const dispatch = useDispatch()
  const submitRegistrationForm = (e) => {
    dispatch(registrationThunk(login, email, password, passwordRepeat))
    e.preventDefault()
  }

  useEffect(() => {
    setError(message)
  }, [message])

  const inputValidationOnBlur = (e, type, title) => {
    if (type.length < 4) {
      setError(`${title} must contain at least four letters`)
      e.target.style.border = `4px solid ${theme === 'dark' ? '#ff7373' : 'IndianRed'}`
    }
  }

  const inputValidationOnKeyUp = (e, type, title) => {
    if (type.length > 3) {
      setError('')
      e.target.style.border = '1px solid gray'
    }
  }

  const equalityPasswordsValidation = (e) => {
    if (password !== passwordRepeat) {
      setError('passwords are not equal')
      e.target.style.border = `4px solid ${theme === 'dark' ? '#ff7373' : 'IndianRed'}`
    }
    else {
      setError('')
      e.target.style.border = '1px solid gray'
    }
  }

  const re = /^[^@]+@[^@]+.[^@]+$/
  const emailValidationOnBlur = (e) => {
    if (!re.test(email)) {
      setError('invalid email address')
      e.target.style.border = `4px solid ${theme === 'dark' ? '#ff7373' : 'IndianRed'}`
    }
  }
  const emailValidationOnKeyUp = (e) => {
    if (re.test(email)) {
      setError('')
      e.target.style.border = '1px solid gray'
    }
  }

  const clearErrorMessage = () => {
    dispatch(setErrorRegMessage(''))
  }

  return (
    <>
      {registered && <Redirect to='/login' />}
      <h2>Registration</h2>
      <form onClick={() => setError('')}>
        <LoginFormInput value={login} onChange={(e) => setLogin(e.target.value)} autoComplete='off'
          placeholder='login'
          onKeyUp={e => inputValidationOnKeyUp(e, login, 'login')}
          onBlur={e => inputValidationOnBlur(e, login, 'login')} dark={theme === 'dark'} /><br />
        <LoginFormInput value={password} onChange={(e) => setPassword(e.target.value)} type='password'
          autoComplete='off' placeholder='password'
          onKeyUp={e => inputValidationOnKeyUp(e, password, 'password')}
          onBlur={e => inputValidationOnBlur(e, password, 'password')} dark={theme === 'dark'} /><br />
        <LoginFormInput value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)}
          type='password'
          autoComplete='off' placeholder='repeat password'
          onKeyUp={e => equalityPasswordsValidation(e)} dark={theme === 'dark'} /><br />
        <LoginFormInput value={name} onChange={(e) => setName(e.target.value)}
          autoComplete='off' placeholder='name' dark={theme === 'dark'} /><br />
        <LoginFormInput value={surname} onChange={(e) => setSurname(e.target.value)}
          autoComplete='off' placeholder='surname' dark={theme === 'dark'} /><br />
        <LoginFormInput value={email} onChange={(e) => setEmail(e.target.value)}
          autoComplete='off' placeholder='email'
          onKeyUp={e => emailValidationOnKeyUp(e)}
          onBlur={e => emailValidationOnBlur(e)} dark={theme === 'dark'} /><br />
      </form>
      <Error>{error}</Error>

      {login.length < 4 || password.length < 4 || passwordRepeat !== password || email.length < 5 ?
        <DisabledButton dark={theme === 'dark'}>Register</DisabledButton> :
        <SubmitFormButton dark={theme === 'dark'} onClick={submitRegistrationForm}>
          Register
        </SubmitFormButton>}

      <p>Or</p>
      <p>
        <Link className='loginLink' to='/login'>
          <SubmitFormButton dark={theme === 'dark'} onClick={clearErrorMessage}>Login</SubmitFormButton>
        </Link>
      </p>
    </>
  )
}