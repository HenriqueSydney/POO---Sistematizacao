import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;

  align-items: center;
  justify-content: center;

  margin: 4rem auto;

  color: ${(props) => props.theme['gray-100']};
  font-weight: 700;
  font-size: 1.5rem;
`
