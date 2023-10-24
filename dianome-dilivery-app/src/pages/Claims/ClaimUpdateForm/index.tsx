import { useEffect, useState } from 'react'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Header } from '../../../components/Header'
import { Button } from '../../../components/Button'
import {
  ButtonContainer,
  ClaimFieldset,
  InfoContainer,
  InfoContent,
} from './styles'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContextSelector } from 'use-context-selector'
import { Toast } from '../../../components/Toast'
import { Claim, ClaimContext } from '../../../contexts/ClaimContext'
import { AxiosError } from 'axios'
import { Textarea } from '../../../components/Textarea'
import { ClaimContainer } from '../styles'

const createClaimSchema = z.object({
  claimSolutionDescription: z
    .string({
      required_error: 'Texto da solução aplicada é obrigatório',
    })
    .max(1000)
    .nonempty({ message: 'Texto da solução aplicada é obrigatório' }),
})

type ClaimInputs = z.infer<typeof createClaimSchema>

export function ClaimUpdateForm() {
  const [claim, setClaim] = useState<Claim>()
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state

  const { getClaim, update } = useContextSelector(ClaimContext, (context) => {
    return {
      getClaim: context.getClaim,
      update: context.updateClaim,
    }
  })

  async function getClaimById(ClaimId: string) {
    const claimRetrieved = await getClaim(ClaimId)
    if (claimRetrieved !== undefined) {
      setClaim(claimRetrieved)
      setValue(
        'claimSolutionDescription',
        claimRetrieved.claimSolutionDescription,
      )
    }
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = useForm<ClaimInputs>({
    resolver: zodResolver(createClaimSchema),
  })

  async function updateClaimFromForm(data: ClaimInputs) {
    try {
      await update(locationState.claimId, data)

      toast.success(`Reclamação respondida com sucesso.`)

      setTimeout(() => {
        reset()
        navigate('/claims')
      }, 2000)
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data)
      } else {
        toast.error('Erro interno do sistema. Equipe de suporte foi notificada')
      }
    }
  }

  function handleGoBack() {
    navigate('/claims')
  }

  useEffect(() => {
    if (locationState && locationState.claimId) {
      getClaimById(locationState.claimId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />

      <ClaimContainer>
        <ClaimFieldset>
          <h1>
            {claim?.claimSolutionDescription
              ? 'Dados da reclamação'
              : 'Responder reclamação'}
          </h1>

          <InfoContainer>
            <InfoContent>
              <div>
                <label>Nome Reclamante:</label>
                <span>{claim?.claimantName}</span>
              </div>
              <div>
                <label>Telefone do Reclamante:</label>
                <span>{claim?.phoneNumber}</span>
              </div>
            </InfoContent>

            <InfoContent>
              <div>
                <label>Código do pacote:</label>
                <span>{claim?.packageItem.packageCode}</span>
              </div>
              <div>
                <label>Nome do Pacote:</label>
                <span>{claim?.packageItem.itemName}</span>
              </div>
            </InfoContent>

            <InfoContent>
              <div>
                <label>Dados do Entregador:</label>
                <span>
                  {claim?.packageItem.deliveryMan != null
                    ? claim?.packageItem.deliveryMan.name
                    : 'Não definido entregador'}
                </span>
              </div>
              {claim?.packageItem.deliveryMan != null && (
                <>
                  <div>
                    <label>CPF do Entregador:</label>
                    <span>{claim?.packageItem.deliveryMan.cpf}</span>
                  </div>
                  <div>
                    <label>Capacidade do veículo:</label>
                    <span>
                      {claim?.packageItem.deliveryMan.vehicleCapacity}
                    </span>
                  </div>
                </>
              )}
            </InfoContent>
            <InfoContent>
              <div>
                <label>Descrição da reclamação:</label>
                <span>{claim?.claimDescription}</span>
              </div>
            </InfoContent>
            {claim?.claimSolutionDescription && (
              <>
                <InfoContent>
                  <div>
                    <label>Descrição da solução aplicada:</label>
                    <span>{claim?.claimSolutionDescription}</span>
                  </div>
                </InfoContent>
                <ButtonContainer>
                  <Button
                    type="button"
                    title="Voltar"
                    variant="SECONDARY"
                    onClick={() => handleGoBack()}
                  />
                </ButtonContainer>
              </>
            )}
          </InfoContainer>
          {!claim?.claimSolutionDescription && (
            <form onSubmit={handleSubmit(updateClaimFromForm)}>
              <Textarea
                label="Solução aplicada"
                placeholder="Escreva o conteúdo da solução aplicada"
                rows={10}
                error={errors.claimSolutionDescription}
                {...register('claimSolutionDescription')}
              />

              <ButtonContainer>
                <Button
                  title={'Responder'}
                  isSubmitting={isSubmitting}
                  disabled={isSubmitting}
                />

                <Button
                  type="button"
                  title="Voltar"
                  variant="SECONDARY"
                  onClick={() => handleGoBack()}
                />
              </ButtonContainer>
            </form>
          )}
        </ClaimFieldset>
      </ClaimContainer>
      <Toast />
    </>
  )
}
