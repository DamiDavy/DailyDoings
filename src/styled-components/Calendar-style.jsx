import styled from 'styled-components'

export const MonthTitle = styled.h3`
  font-size: 1.5rem;
  text-align: center;
  color: ${props => props.dark ? "CornflowerBlue" : "palevioletred"};
`
export const MonthTitleAndButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`
export const ChangeMonthButton = styled.button`
  color: ${props => props.dark ? "CornflowerBlue" : "palevioletred"};
  font-size: 3rem;
  cursor: pointer;
  border: none;
  background-color: rgba(117, 190, 218, 0.0);
`

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0rem;
`