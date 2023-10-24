import styled from 'styled-components'

interface ColorVariant {
  variant: 'PRIMARY' | 'WARNING'
}

export const Container = styled.button<ColorVariant>`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  align-items: center;
  justify-content: center;

  background: ${(props) => props.theme['gray-700']};

  color: ${(props) =>
    props.variant === 'WARNING'
      ? props.theme['red-300']
      : props.theme['gray-100']};

  padding: 0.5rem;

  border-radius: 6px;
  border: 1px solid
    ${(props) =>
      props.variant === 'WARNING'
        ? props.theme['red-300']
        : props.theme['gray-100']};

  cursor: pointer;

  &:hover {
    background: ${(props) =>
      props.variant === 'WARNING'
        ? props.theme['red-700']
        : props.theme['green-700']};

    border: 1px solid
      ${(props) =>
        props.variant === 'WARNING'
          ? props.theme['red-500']
          : props.theme['green-500']};

    color: ${(props) =>
      props.variant === 'WARNING'
        ? props.theme['gray-100']
        : props.theme['gray-100']};

    transition: all 0.2s;
  }
`
