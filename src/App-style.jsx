import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  width: 80%;
  max-width: 590px;
  font-size: 1rem;
  color: ${props => props.dark ? "#bbb" : "gray"};
  background-color: ${props => props.dark ? "hsla(232, 60%, 12%, 0.7)" : "hsla(357, 17%, 90%, 0.9)"};
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.2), 0 2.5rem 5rem 0 rgba(0,0,0,.1);
  padding: 0 1rem;
`

export const ButtonLoginLogout = styled.button`
  color: ${props => props.dark ? "CornflowerBlue" : "palevioletred"};
  font-size: 1em;
  margin: 1rem 0.5rem 0.5rem;
  padding: 0.2em 0.2em;
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