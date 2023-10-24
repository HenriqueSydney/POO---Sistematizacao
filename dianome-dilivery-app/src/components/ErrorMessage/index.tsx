import { Triangle } from 'phosphor-react'
import { Container } from './styles'

interface IErrorMessage {
  errorMessage?: string | null
}

export function ErrorMessage({ errorMessage = null }: IErrorMessage) {
  if (!errorMessage) return

  return (
    <Container>
      <Triangle />
      <span>{errorMessage}</span>
    </Container>
  )
}
