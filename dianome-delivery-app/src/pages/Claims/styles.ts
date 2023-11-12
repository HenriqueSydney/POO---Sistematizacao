import styled from 'styled-components'

export const ClaimContainer = styled.main`
  width: 100%;
  max-width: 90rem;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ClaimTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;

  margin: 1.5rem auto;

  td {
    padding: 1.25rem 2rem;

    background: ${(props) => props.theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`
interface StatusHighlightProps {
  variant: 'respondido' | 'pendente'
}

export const StatusHighlight = styled.span<StatusHighlightProps>`
  color: ${(props) =>
    props.variant === 'respondido'
      ? props.theme['green-300']
      : props.theme['red-300']};
`

export const ActionContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`
