import styled from 'styled-components'

export const Container = styled.button`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  align-items: center;
  justify-content: center;

  height: 14rem;
  width: 14rem;
  background: ${(props) => props.theme['gray-700']};

  color: ${(props) => props.theme.white};
  font-size: 1.5rem;

  padding: 0 1.25rem;

  border-radius: 6px;
  border: 2px solid ${(props) => props.theme['gray-100']};

  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme['green-700']};
    border: 2px solid ${(props) => props.theme['green-500']};
    transition: all 0.2s;
  }
`
