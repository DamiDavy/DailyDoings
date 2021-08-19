import styled from 'styled-components'

export const TodosContainer = styled.div`
  text-align: center;
  margin: 0 auto;
  font-size: 1.2rem;
  `

export const TodoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  border-top: 1px solid #eee;
`

export const TodoTitle = styled.div`
  font-size: 1em;
`

export const ButtonHandleTodo = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em 0 1em 1em;
  padding: 0.25em 0.5em;
  border: 1px solid palevioletred;
  border-radius: 50%;
  cursor: pointer;
  background-color: white;
`;

export const TodoButtons = styled.div`
  margin-left: auto;
`