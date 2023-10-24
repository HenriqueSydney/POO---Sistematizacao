import { ButtonHTMLAttributes, ReactNode } from 'react'
import { Container } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  variant?: 'PRIMARY' | 'WARNING'
}

export function ButtonIcons({
  icon,
  variant = 'PRIMARY',
  ...rest
}: ButtonProps) {
  return (
    <Container variant={variant} {...rest}>
      {icon}
    </Container>
  )
}
