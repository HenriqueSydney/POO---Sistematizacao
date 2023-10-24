import styled from 'styled-components'

interface ErrorStatus {
  isError: boolean
}

export const Container = styled.div<ErrorStatus>`
  position: relative;
  width: 100%;

  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  align-items: flex-start;
  justify-content: flex-start;

  border: 1px solid
    ${(props) =>
      props.isError ? props.theme['red-300'] : props.theme['green-300']};
  border-radius: 4px;

  border: 0;

  font-size: 0.875rem;
  color: ${(props) => props.theme['gray-100']};

  cursor: pointer;

  &.input-error {
    border-color: var(--red-500);
    box-shadow: 0 0 5px var(--red-500);
  }

  select {
    width: 100%;
    box-sizing: border-box;
    display: flex;

    align-items: center;
    justify-content: flex-start;

    height: 2.625rem;
    cursor: pointer;

    padding: 0.75rem;

    background: ${(props) => props.theme['gray-800']};
    border: 1px solid
      ${(props) =>
        props.isError ? props.theme['red-300'] : props.theme['green-300']};
    border-radius: 4px;

    ${(props) =>
      props.isError && `box-shadow: 0 0 5px ${props.theme['red-300']};`};

    font-size: 0.875rem;
    color: ${(props) => props.theme['gray-100']};

    &::placeholder {
      color: var(--gray-500);
      font-style: italic;
    }
  }
`

export const LabelContainer = styled.div`
  position: absolute;
  top: -0.6rem;
  left: 1rem;

  padding: 0 0.25rem;
  display: flex;
  flex: 1;

  align-items: center;
  justify-content: flex-start;

  gap: 0.5rem;

  background: ${(props) => props.theme['gray-800']};

  label {
    color: ${(props) => props.theme['gray-100']};
    font-weight: 700;
    font-size: 0.875rem;
    font-style: italic;
  }
`
