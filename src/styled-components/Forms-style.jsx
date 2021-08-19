import styled from 'styled-components'

export const TextInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  font-size: 1em;
  margin-bottom: 1rem;
`

export const LoginFormInput = styled(TextInput)`
  width: 85%;
  margin-bottom: 0.5rem;
  color: gray;
`

export const InlineInput = styled(TextInput)`
  padding: 0.25rem 0.5rem;
  width: 2rem;
  text-align: center;
  margin: 0 0.5rem;
`;

export const SubmitFormButton = styled.button`
  background-color: palevioletred;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
`

export const DisabledButton = styled(SubmitFormButton)`
background-color: #ccc;
cursor: default`

export const RepeatConfirmButton = styled(SubmitFormButton)`
  font-size: 0.8em;
  margin-top: 0.5rem;
  margin-left: auto;
`;

export const CancelButton = styled(RepeatConfirmButton)`
  margin-left: auto;
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  font-size: 1.1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #ccc;
  `

export const LoginFormContainer = styled.div`
  width: 90%;
  `

export const RepeatFormContainer = styled(FormContainer)`
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
  justify-content: space-around;
`;

export const Error = styled.p`
  color: IndianRed
`
