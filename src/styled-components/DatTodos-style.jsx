import styled from 'styled-components'

export const TodosContainer = styled.div`
  text-align: center;
  margin: 0 auto;
  font-size: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${props => props.dark ? "#666" : "#eee"};
`

export const TodoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  border-top: 1px solid ${props => props.dark ? "#666" : "#eee"};
  padding: 0rem 0.3rem;
  margin: 0rem;
`

export const TodoTitle = styled.div`
  font-size: 1em;
`

export const ButtonHandleTodo = styled.button`
  color: ${props => props.dark ? "MidnightBlue" : "palevioletred"};
  border: ${props => props.dark ? "none" : "1px solid palevioletred"};
  background-color: ${props => props.dark ? "DarkGrey" : "white"};
  font-size: 1em;
  font-weight: bold;
  margin: 0.5em;
  padding: 0.25em 0.5em;
  border-radius: 50%;
  cursor: pointer;
`

export const TodoButtons = styled.div`
  margin-left: auto;
`

export const Pencil = styled.span`
  font-size: 0.8rem
`