import { useEffect, useState } from 'react'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Header } from '../../../components/Header'
import { InputText } from '../../../components/InputText'
import { Button } from '../../../components/Button'
import { ButtonContainer, PackageContainer, PackageFieldset } from './styles'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContextSelector } from 'use-context-selector'
import { Toast } from '../../../components/Toast'
import { Select, SelectOptions } from '../../../components/Select'
import {
  DeliveryMan,
  DeliveryManContext,
} from '../../../contexts/DeliveryManContext'
import { AxiosError } from 'axios'
import { ArrowRight } from 'phosphor-react'
enum VehicleCapacityEnum {
  BIG = 'BIG',
  MEDIUM = 'MEDIUM',
  SMALL = 'SMALL',
}
const vehicleCapacityValues = Object.values(VehicleCapacityEnum) as [
  string,
  string,
  string,
]

const createDeliveryManSchema = z
  .object({
    name: z
      .string({
        required_error: 'O nome do entregador é obrigatório',
      })
      .max(100)
      .nonempty({ message: 'O nome do entregador é obrigatório' }),
    cpf: z
      .string({
        required_error: 'O CPF do entregador é obrigatório',
      })
      .min(11)
      .max(11)
      .nonempty({ message: 'O CPF do entregador é obrigatório' }),
    vehicleCapacity: z.enum(vehicleCapacityValues),
  })
  .refine(
    (data) =>
      data.vehicleCapacity === 'BIG' ||
      data.vehicleCapacity === 'MEDIUM' ||
      data.vehicleCapacity === 'SMALL',
    {
      message: 'Valores permitidos: ',
      path: ['vehicleCapacity'],
    },
  )

type DeliveryManInputs = z.infer<typeof createDeliveryManSchema>

const OPTIONS: SelectOptions[] = [
  { label: 'Grandes Volumes', value: 'BIG' },
  { label: 'Médio Volumes', value: 'MEDIUM' },
  { label: 'Pequenos Volumes', value: 'SMALL' },
]

export function DeliveryManCreateForm() {
  const [deliveryMan, setDeliveryMan] = useState<DeliveryMan>()
  let vehicleDefaultValue = 'BIG'
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state

  const { getDeliveryMan, create, update } = useContextSelector(
    DeliveryManContext,
    (context) => {
      return {
        getDeliveryMan: context.getDeliveryMan,
        create: context.createDeliveryMan,
        update: context.updateDeliveryMan,
      }
    },
  )

  async function getDeliveryManById(DeliveryManId: string) {
    const deliveryMan = await getDeliveryMan(DeliveryManId)
    if (deliveryMan !== undefined) {
      setDeliveryMan(deliveryMan)
      setValue('name', deliveryMan.name)
      setValue('cpf', deliveryMan.cpf)
      const findValue = OPTIONS.find(
        (option) => option.label === deliveryMan.vehicleCapacity,
      )
      if (findValue) {
        vehicleDefaultValue = findValue.value
        setValue('vehicleCapacity', vehicleDefaultValue)
      }
    }
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = useForm<DeliveryManInputs>({
    resolver: zodResolver(createDeliveryManSchema),
    defaultValues: {
      name: deliveryMan ? deliveryMan.name : '',
      cpf: deliveryMan ? deliveryMan.cpf : '',
      vehicleCapacity: 'BIG',
    },
  })

  function convertVehicleCapacity(value: string): VehicleCapacityEnum {
    return value as VehicleCapacityEnum
  }

  async function createPackageFromForm(data: DeliveryManInputs) {
    try {
      const convertedVehicleCapacity = convertVehicleCapacity(
        data.vehicleCapacity,
      )

      const createdDeliveryMan = await create({
        ...data,
        vehicleCapacity: convertedVehicleCapacity,
      })

      toast.success(`Entregador ${createdDeliveryMan.name} criado com sucesso.`)

      setTimeout(() => {
        reset()
        navigate('/delivery-men')
      }, 2000)
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data)
      } else {
        toast.error('Erro interno do sistema. Tente novamente mais tarde')
      }
    }
  }

  async function updatePackageFromForm(data: DeliveryManInputs) {
    try {
      const convertedVehicleCapacity = convertVehicleCapacity(
        data.vehicleCapacity,
      )

      await update(locationState.deliveryManId, {
        ...data,
        vehicleCapacity: convertedVehicleCapacity,
      })

      toast.success(`Entregador atualizado com sucesso.`)

      setTimeout(() => {
        reset()
        navigate('/delivery-men')
      }, 2000)
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data)
      } else {
        toast.error('Erro interno do sistema. Tente novamente mais tarde')
      }
    }
  }

  function handleGoBack() {
    navigate('/delivery-men')
  }

  useEffect(() => {
    if (locationState && locationState.deliveryManId) {
      getDeliveryManById(locationState.deliveryManId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />

      <PackageContainer>
        <PackageFieldset>
          <h1>Cadastrar um novo pacote</h1>
          <form
            onSubmit={
              deliveryMan
                ? handleSubmit(updatePackageFromForm)
                : handleSubmit(createPackageFromForm)
            }
          >
            <InputText
              label="Nome do Entregador"
              placeholder="Escreva o nome do entregador"
              error={errors.name}
              {...register('name')}
            />

            <InputText
              label="CPF do Entregador"
              placeholder="Escreva o CPF do entregador"
              error={errors.cpf}
              {...register('cpf')}
            />
            <Select
              options={OPTIONS}
              label="Capacidade do Veículo"
              placeholder="Selecione a capacidade do veículo"
              error={errors.vehicleCapacity}
              {...register('vehicleCapacity')}
            />

            <ButtonContainer>
              <Button
                title={deliveryMan ? 'Atualizar' : 'Cadastrar'}
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
        </PackageFieldset>
      </PackageContainer>
      <Toast />
    </>
  )
}
