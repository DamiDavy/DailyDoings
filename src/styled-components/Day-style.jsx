import styled from 'styled-components'

export const DayItem = styled.div`
  position: relative;
  font-size: 1.3rem;
  padding: 0.8rem 0.3rem;
  text-align: center;
`

export const TodosCount = styled.div`
  position: absolute;
  top: -0.4rem;
  right: 0rem;
  font-size: 0.8rem;
  padding: 0.2rem;
  font-weight: bold;
  background-color: ${props => props.dark ? "Gainsboro" : "palevioletred"};
  color: ${props => props.dark ? "MidnightBlue" : "white"};
  border: 0.1rem solid ${props => props.dark ? "Gainsboro" : "palevioletred"};
  border-radius: 50%;
`