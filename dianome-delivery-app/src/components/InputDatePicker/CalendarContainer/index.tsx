import { ForwardRefRenderFunction, forwardRef } from 'react'
import { Container } from './styles'

interface ICalendarInputContainer {
  value?: any
  onClick?: any
  isError?: boolean
}

const InputDatePickerContainerBase: ForwardRefRenderFunction<
  HTMLInputElement,
  ICalendarInputContainer
> = ({ value, onClick, isError = false }, ref) => {
  return (
    <Container onClick={onClick} ref={ref} isError={isError}>
      {value}
    </Container>
  )
}

export const InputDatePickerContainer = forwardRef(InputDatePickerContainerBase)
