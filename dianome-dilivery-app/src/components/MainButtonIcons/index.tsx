import { ButtonHTMLAttributes, ReactNode } from 'react'
import { Container } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  title: string
}

export function MainButtonIcons({ icon, title, ...rest }: ButtonProps) {
  return (
    <Container {...rest}>
      {icon}
      <strong>{title}</strong>
    </Container>
  )
}
