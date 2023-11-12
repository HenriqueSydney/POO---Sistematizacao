import React, { ForwardRefRenderFunction, forwardRef } from 'react'

import { FieldError } from 'react-hook-form'

import { ErrorMessage } from '../ErrorMessage'

import { Container, InputContainer, LabelContainer } from './styles'

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputTextProps> = (
  { label = '', error = null, ...rest },
  ref,
) => {
  return (
    <Container>
      {label && (
        <LabelContainer>
          <label>{label}</label>
        </LabelContainer>
      )}
      <InputContainer isError={!!error?.message}>
        <input ref={ref} {...rest} />
      </InputContainer>
      <ErrorMessage errorMessage={error?.message} />
    </Container>
  )
}

export const InputText = forwardRef(InputBase)
