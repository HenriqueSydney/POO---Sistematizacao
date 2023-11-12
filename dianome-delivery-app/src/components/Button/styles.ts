import styled from 'styled-components'

interface IContainer {
  isSubmitting: boolean
  variant: 'PRIMARY' | 'SECONDARY'
}

export const Container = styled.button<IContainer>`
  height: 3.125rem;
  background: ${(props) =>
    props.variant === 'PRIMARY'
      ? props.theme['green-500']
      : props.theme['gray-800']};

  color: ${(props) =>
    props.variant === 'PRIMARY' ? props.theme.white : props.theme['green-300']};
  font-weight: 700;

  padding: 0 1.25rem;

  border-radius: 6px;
  border: 0;

  border: ${(props) =>
    props.variant === 'PRIMARY' ? 0 : `1px solid ${props.theme['green-300']}`};

  cursor: ${(props) => (props.isSubmitting ? 'wait' : 'pointer')};
  opacity: ${(props) => (props.isSubmitting ? 0.7 : 1)};

  &:hover {
    background: ${(props) =>
      props.variant === 'PRIMARY'
        ? props.theme['green-700']
        : props.theme['green-300']};
    transition: all 0.2s;
    color: ${(props) =>
      props.variant === 'PRIMARY' ? props.theme.white : props.theme.white};
  }
`
