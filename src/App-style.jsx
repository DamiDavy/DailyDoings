import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  width: 80%;
  max-width: 600px;
  font-size: 1.2rem;
  color: ${props => props.dark ? "#bbb" : "gray"};
  background-color: ${props => props.dark ? "hsla(232, 60%, 12%, 0.7)" : "hsla(0, 0%, 98%, 0.8)"};
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.2), 0 2.5rem 5rem 0 rgba(0,0,0,.1);
  padding: 0 2rem;
`

export const ButtonLoginLogout = styled.button`
  color: ${props => props.dark ? "CornflowerBlue" : "palevioletred"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: none;
  cursor: pointer;
  background-color: hsla(0, 0%, 100%, 0.0);
`

export const ButtonsContainer = styled.header`
  display: flex;
`

export const FlexItem = styled.div`
  margin-left: auto;
`