import React, { ForwardRefRenderFunction, forwardRef } from 'react'

import { FieldError } from 'react-hook-form'

import { ErrorMessage } from '../ErrorMessage'
import { Container, InputContainer, LabelContainer } from './styles'

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: FieldError
}

const TextareaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextareaProps
> = ({ label = '', error = null, ...rest }, ref) => {
  return (
    <Container>
      {label && (
        <LabelContainer>
          <label>{label}</label>
        </LabelContainer>
      )}
      <InputContainer isError={!!error?.message}>
        <textarea ref={ref} {...rest}></textarea>
      </InputContainer>
      <ErrorMessage errorMessage={error?.message} />
    </Container>
  )
}

export const Textarea = forwardRef(TextareaBase)
