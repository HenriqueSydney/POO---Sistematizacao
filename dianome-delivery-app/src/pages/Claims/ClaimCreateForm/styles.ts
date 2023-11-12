import styled from 'styled-components'

export const ClaimContainer = styled.main`
  width: 100%;
  max-width: 70rem;
  margin: 4rem auto 0;
  padding: 0 1.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const ClaimFieldset = styled.fieldset`
  position: relative;
  width: 75%;

  margin-top: 1.5rem;

  padding: 1.5rem;

  border: 1px solid ${(props) => props.theme['green-300']};
  border-radius: 6px;

  h1 {
    display: block;
    position: absolute;
    padding: 0%.5rem;

    margin-top: -2.8rem;

    background-color: ${(props) => props.theme['gray-800']};
  }

  form {
    display: flex;
    flex-direction: column;

    gap: 2rem;

    margin-top: 1.5rem;
  }
`

export const ButtonContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 2rem;
`
