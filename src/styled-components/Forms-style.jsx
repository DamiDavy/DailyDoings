import styled from 'styled-components'

export const TextInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  font-size: 1em;
  margin: 0.5rem;
`

export const LoginFormInput = styled(TextInput)`
  width: 85%;
  margin-bottom: 0.5rem;
  color: ${props => props.dark ? "MidnightBlue" : "gray"};
  background-color: ${props => props.dark ? "Gainsboro" : "white"}; 
`

export const InlineInput = styled(TextInput)`
  padding: 0.25rem 0.5rem;
  width: 2rem;
  text-align: center;
  margin: 0 0.5rem;
`

export const SubmitFormButton = styled.button`
  color: CornflowerBlue;
  background-color: ${props => props.dark ? "hsla(0, 0%, 100%, 0.4)" : "palevioletred"};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin: 0.3rem;
`

export const DisabledButton = styled(SubmitFormButton)`
  background-color: ${props => props.dark ? "#444" : "#ccc"};
  color: #999;
  cursor: default
`

export const RepeatConfirmButton = styled(SubmitFormButton)`
  font-size: 0.8em;
  margin: 0.5rem 0 0.5rem auto;
`

export const CancelButton = styled(RepeatConfirmButton)`
  margin-left: auto;
`

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 1.1rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.dark ? "#444" : "#ddd"};
`

export const LoginFormContainer = styled.div`
  width: 90%;
`

export const RepeatFormContainer = styled(FormContainer)`
  font-size: 1rem;
  padding: 0.2rem 0.5rem;
`

export const Error = styled.p`
  color: IndianRed
`