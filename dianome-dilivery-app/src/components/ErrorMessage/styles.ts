import styled from 'styled-components'

export const Container = styled.div`
  display: flex;

  align-items: center;

  gap: 0.25rem;

  margin-top: 0.5rem;

  font-size: 0.875rem;
  color: ${(props) => props.theme['red-300']};
  font-style: italic;
`
