import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import { registrationThunk } from '../redux/auth-reducer'
import { registeredSelector } from '../redux/selectors'

export const Registration = () => {

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')

  const [error, setError] = useState('')

  const registered = useSelector(registeredSelector)

  const dispatch = useDispatch()
  const submitRegistrationForm = (e) => {
    console.log('nini')
    dispatch(registrationThunk(login, email, password, passwordRepeat))
    e.preventDefault()
  }

  const inputValidation = (e, type, title) => {
      if (type.length < 4) {
        setError(`${title} must contain at least four letters`)
        e.target.style.border = '1px solid red'
      } else {
        setError('')
        e.target.style.border = '1px solid gray'
      }
  }

  const equalityPasswordsValidation = (e) => {
    if (password !== passwordRepeat) {
      setError('passwords are not equal')
      e.target.style.border = '1px solid red'
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
      e.target.style.border = '1px solid red'
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
    <input value={login} onChange={(e) => setLogin(e.target.value)} autoComplete="off" placeholder='login'
        onBlur={e => inputValidation(e, login, 'login')}/><br/>
    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="off" placeholder='password'
        onBlur={e => inputValidation(e, password, 'password')}/><br/>
    <input value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} type="password" 
        autoComplete="off" placeholder='repeat password' 
        onBlur={e => equalityPasswordsValidation(e)} /><br/>
    <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" placeholder='name'/><br/>
    <input value={surname} onChange={(e) => setSurname(e.target.value)} autoComplete="off" placeholder='surname'/><br/>
    <input value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" placeholder='email' 
    onBlur={e => emailValidation(e)} /><br/>

    <p>{error}</p>

    <button onClick={submitRegistrationForm} 
    disabled={login.length < 4 || password.length < 4 || passwordRepeat !== password || email.length < 5}>Register</button>
    </form>
    </>
  );
}