import styled from 'styled-components'

interface IContainer {
  isError: boolean
}

export const Container = styled.div<IContainer>`
  width: 100%;
  position: relative;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  align-items: flex-start;
  justify-content: flex-start;

  .react-datepicker-wrapper {
    width: 100% !important;
    display: flex !important;
  }
  .react-datepicker-popper {
    z-index: 2 !important;
  }

  font-size: 0.875rem;
  color: ${(props) => props.theme['gray-100']};

  border: ${(props) =>
    props.isError ? props.theme['red-300'] : props.theme['green-300']};
  border-radius: 4px;
  ${(props) =>
    props.isError && `box-shadow: 0 0 5px ${props.theme['red-300']};`};

  background: ${(props) => props.theme['gray-800']};

  cursor: pointer;
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
    pointer-events: none;
  }

  label {
  }
`
