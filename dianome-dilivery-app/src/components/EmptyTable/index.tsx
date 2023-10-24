import { Container } from './styles'

interface EmptyTableProps {
  message: string
}

export function EmptyTable({ message }: EmptyTableProps) {
  return <Container>{message}</Container>
}
