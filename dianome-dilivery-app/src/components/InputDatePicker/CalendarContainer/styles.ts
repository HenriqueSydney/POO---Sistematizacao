import styled from 'styled-components'

interface IContainer {
  isError: boolean
}

export const Container = styled.div<IContainer>`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  align-items: center;
  justify-content: flex-start;

  height: 2.625rem;

  padding: 0.75rem;

  border: 1px solid
    ${(props) =>
      props.isError ? props.theme['red-300'] : props.theme['green-300']};
  border-radius: 4px;

  ${(props) =>
    props.isError && `box-shadow: 0 0 5px ${props.theme['red-300']};`};

  &::placeholder {
    color: ${(props) => props.theme['gray-300']};
    font-style: italic;
    opacity: 0.7;
  }

  cursor: pointer;

  div {
    width: 100%;
  }
`
