import { SyntheticEvent, useState } from 'react'

import ReactDatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker'

import { FieldError, Merge } from 'react-hook-form'

import ptBR from 'date-fns/locale/pt-BR'

import { Calendar } from 'phosphor-react'

import { InputDatePickerContainer } from './CalendarContainer'
import { ErrorMessage } from '../ErrorMessage'

import 'react-datepicker/dist/react-datepicker.css'

import { Container, LabelContainer } from './styles'

registerLocale('pt-BR', ptBR)

interface DatePickerProps extends Omit<ReactDatePickerProps, 'onChange'> {
  label?: string
  inputError?: Merge<FieldError, (FieldError | undefined | null)[]>
  onChange: (
    date: Date | null,
    event: SyntheticEvent<any, Event> | undefined,
  ) => void
}

export function InputDatePicker({
  onChange,
  label = '',
  inputError = undefined,
  ...rest
}: DatePickerProps) {
  const [isDatePickerOpen, setDatePickerOpen] = useState(false)

  function handleToggleCalendarVisibility() {
    setDatePickerOpen((state) => !state)
  }

  return (
    <div>
      <Container
        isError={!!(inputError !== undefined)}
        onClick={handleToggleCalendarVisibility}
      >
        {label && (
          <LabelContainer>
            <Calendar />
            <label>{label}</label>
          </LabelContainer>
        )}
        <ReactDatePicker
          onChange={onChange}
          placeholderText="Selecione o período"
          locale="pt-BR"
          dateFormat="dd/MM/yyyy hh:mm"
          customInput={
            <InputDatePickerContainer isError={!!(inputError !== undefined)} />
          }
          showTimeSelect
          showDisabledMonthNavigation
          open={isDatePickerOpen}
          shouldCloseOnSelect={false}
          {...rest}
        />
      </Container>
      {inputError !== undefined &&
        Array.isArray(inputError) &&
        inputError.map((error) => {
          if (!error) return false
          return (
            <ErrorMessage key={error.message} errorMessage={error.message} />
          )
        })}

      {inputError !== undefined && !Array.isArray(inputError) && (
        <ErrorMessage errorMessage={inputError.message} />
      )}
    </div>
  )
}
