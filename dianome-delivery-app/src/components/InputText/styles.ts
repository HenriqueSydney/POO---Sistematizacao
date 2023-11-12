import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  position: relative;

  input {
    width: 100%;
    flex: 1;
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
    padding: 1rem;
    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }
  }
`
export const LabelContainer = styled.div`
  position: absolute;

  top: -0.6rem;
  left: 1rem;

  padding: 0 0.25rem;

  z-index: 1;

  background: ${(props) => props.theme['gray-800']};

  label {
    color: ${(props) => props.theme['gray-100']};
    font-weight: 700;
    font-size: 0.875rem;
    font-style: italic;
  }
`

interface ErrorStatus {
  isError: boolean
}

export const InputContainer = styled.div<ErrorStatus>`
  position: relative;
  display: flex;
  align-items: center;

  input {
    box-sizing: border-box;
    display: flex;

    align-items: center;
    justify-content: flex-start;

    height: 2.625rem;

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
      color: ${(props) => props.theme['gray-300']};
      font-style: italic;
      opacity: 0.7;
    }

    &:read-only {
      background: var(--gray-300);
      opacity: 0.8;
      cursor: not-allowed;
    }
  }
`
