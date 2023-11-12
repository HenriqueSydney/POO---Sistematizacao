import { ButtonHTMLAttributes } from 'react'
import { Container } from './styles'
import { ClipLoader } from 'react-spinners'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  isSubmitting?: boolean
  variant?: 'PRIMARY' | 'SECONDARY'
}

export function Button({
  title,
  variant = 'PRIMARY',
  isSubmitting = false,
  ...rest
}: ButtonProps) {
  return (
    <Container variant={variant} isSubmitting={isSubmitting} {...rest}>
      {isSubmitting && <ClipLoader color="#F0F0F0" size={24} />}
      {title}
    </Container>
  )
}
