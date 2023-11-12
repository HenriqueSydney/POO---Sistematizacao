import React, { ForwardRefRenderFunction, ReactNode, forwardRef } from 'react'

import { FieldError } from 'react-hook-form'

import { ErrorMessage } from '../ErrorMessage'

import { Container, LabelContainer } from './styles'

export type SelectOptions = {
  value: string
  label: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOptions[]
  icon?: ReactNode
  label?: string
  error?: FieldError
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { options, icon = null, label = '', error = null, ...rest },
  ref,
) => {
  return (
    <div>
      <Container isError={!!error?.message}>
        {label && (
          <LabelContainer>
            {icon && icon}
            <label>{label}</label>
          </LabelContainer>
        )}
        <select ref={ref} {...rest}>
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </Container>
      <ErrorMessage errorMessage={error?.message} />
    </div>
  )
}

export const Select = forwardRef(SelectBase)
