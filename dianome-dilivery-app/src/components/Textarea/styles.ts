import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  width: 100%;

  .error-message {
    display: flex;

    align-items: center;

    gap: 0.25rem;

    margin-top: 0.5rem;

    font-size: 0.875rem;
    color: var(--red-500);
    font-style: italic;
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

interface IInputContainer {
  isError: boolean
}

export const InputContainer = styled.div<IInputContainer>`
  position: relative;
  display: flex;
  align-items: center;

  textarea {
    width: 100%;

    box-sizing: border-box;
    display: flex;

    align-items: center;
    justify-content: flex-start;

    padding: 0.75rem;

    background: ${(props) => props.theme['gray-800']};

    color: ${(props) => props.theme['gray-100']};

    border: 1px solid
      ${(props) =>
        props.isError ? props.theme['red-300'] : props.theme['green-300']};

    ${(props) =>
      props.isError && `box-shadow: 0 0 5px ${props.theme['red-300']};`};

    border-radius: 4px;

    font-size: 0.875rem;

    resize: none;

    &::placeholder {
      color: ${(props) => props.theme['gray-300']};
      font-style: italic;
      opacity: 0.7;
    }
  }
`
