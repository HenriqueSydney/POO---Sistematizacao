import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Header } from '../../../components/Header'
import { InputText } from '../../../components/InputText'
import { Button } from '../../../components/Button'
import { ButtonContainer, ClaimFieldset } from './styles'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useContextSelector } from 'use-context-selector'
import { Toast } from '../../../components/Toast'
import { ClaimContext } from '../../../contexts/ClaimContext'
import { AxiosError } from 'axios'
import { Textarea } from '../../../components/Textarea'
import { ClaimContainer } from '../styles'

const createClaimSchema = z.object({
  claimantName: z
    .string({
      required_error: 'O nome do reclamante é obrigatório',
    })
    .max(100)
    .nonempty({ message: 'O nome do reclamante é obrigatório' }),
  phoneNumber: z
    .string({
      required_error: 'O telefone do reclamante é obrigatório',
    })
    .min(8)
    .max(11)
    .nonempty({ message: 'O telefone do reclamante é obrigatório' }),
  packageCode: z
    .string({
      required_error: 'O código do pacote é obrigatório',
    })
    .min(10)
    .max(10)
    .nonempty({ message: 'O código do pacote é obrigatório' }),
  claimDescription: z
    .string({
      required_error: 'Texto da reclamação é obrigatório',
    })
    .max(1000)
    .nonempty({ message: 'Texto da reclamação é obrigatório' }),
})

type ClaimInputs = z.infer<typeof createClaimSchema>

export function ClaimCreateForm() {
  const navigate = useNavigate()

  const { create } = useContextSelector(ClaimContext, (context) => {
    return {
      create: context.createClaim,
    }
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<ClaimInputs>({
    resolver: zodResolver(createClaimSchema),
  })

  async function createClaimFromForm(data: ClaimInputs) {
    try {
      const createdClaim = await create(data)

      toast.success(
        `Reclamação do(a) Sr(a). ${createdClaim.claimantName} criada com sucesso para o pacote ${data.packageCode}.`,
      )

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

  return (
    <>
      <Header />

      <ClaimContainer>
        <ClaimFieldset>
          <h1>Cadastrar uma nova reclamação</h1>
          <form onSubmit={handleSubmit(createClaimFromForm)}>
            <InputText
              label="Nome do Reclamante"
              placeholder="Escreva o nome do reclamante"
              error={errors.claimantName}
              {...register('claimantName')}
            />

            <InputText
              label="Telefone do Reclamante"
              placeholder="Escreva o Telefone do Reclamante"
              error={errors.phoneNumber}
              {...register('phoneNumber')}
            />

            <InputText
              label="Código do pacote"
              placeholder="Escreva o código do pacote"
              error={errors.packageCode}
              {...register('packageCode')}
            />

            <Textarea
              label="Conteúdo da Reclamação"
              placeholder="Escreva o conteúdo da reclamação"
              rows={10}
              error={errors.claimDescription}
              {...register('claimDescription')}
            />

            <ButtonContainer>
              <Button
                title={'Cadastrar'}
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
        </ClaimFieldset>
      </ClaimContainer>
      <Toast />
    </>
  )
}
