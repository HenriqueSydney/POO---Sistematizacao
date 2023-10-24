import { useEffect, useState } from 'react'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Header } from '../../../components/Header'
import { InputText } from '../../../components/InputText'
import { Button } from '../../../components/Button'
import { ButtonContainer, PackageContainer, PackageFieldset } from './styles'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { InputDatePicker } from '../../../components/InputDatePicker'
import { Package, PackageContext } from '../../../contexts/PackageContext'
import { useContextSelector } from 'use-context-selector'
import { Toast } from '../../../components/Toast'
import { Select, SelectOptions } from '../../../components/Select'
import { DeliveryManContext } from '../../../contexts/DeliveryManContext'
import { AxiosError } from 'axios'

const createPackageSchema = z.object({
  itemName: z
    .string({
      required_error: 'O nome do item é obrigatório',
    })
    .nonempty({ message: 'O nome do item é obrigatório' }),
  receivedDateTime: z.date({
    required_error: 'A data pretendida de reserva é obrigatória',
    invalid_type_error: 'Data inválida',
  }),
  deliveredDateTime: z
    .date({
      invalid_type_error: 'Data inválida',
    })
    .nullable(),
  deliveryManId: z.string().nullable(),
})

type packageInputs = z.infer<typeof createPackageSchema>

export function PackageCreateForm() {
  const [packageItem, setPackageItem] = useState<Package>()
  const [options, setOptions] = useState<SelectOptions[]>([])

  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state

  const getPackage = useContextSelector(PackageContext, (context) => {
    return context.getPackage
  })

  const fetchDeliveryMen = useContextSelector(DeliveryManContext, (context) => {
    return context.fetchDeliveryMen
  })

  async function getPackageById(packageId: string) {
    const deliveryMen = await fetchDeliveryMen()

    const deliveryMenOptions: SelectOptions[] = deliveryMen.map(
      (deliveryMan) => {
        return {
          label: deliveryMan.name,
          value: deliveryMan.id,
        }
      },
    )

    setOptions(deliveryMenOptions)

    const packageItem = await getPackage(packageId)
    if (packageItem !== undefined) {
      setPackageItem(packageItem)
      setValue('receivedDateTime', new Date(packageItem.receivedDateTime))
      setValue('itemName', packageItem.itemName)
      if (packageItem.deliveredDateTime) {
        setValue('deliveredDateTime', new Date(packageItem.deliveredDateTime))
      }

      setValue('deliveryManId', packageItem.deliveryMan.id)
    }
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = useForm<packageInputs>({
    resolver: zodResolver(createPackageSchema),
    defaultValues: {
      itemName: packageItem ? packageItem.itemName : '',
      receivedDateTime: packageItem && new Date(packageItem.receivedDateTime),
      deliveredDateTime:
        packageItem && packageItem.deliveredDateTime
          ? new Date(packageItem.deliveredDateTime)
          : null,
      deliveryManId: packageItem ? packageItem.deliveryMan.id : '',
    },
  })

  const packageContext = useContextSelector(PackageContext, (context) => {
    return {
      create: context.createPackage,
      update: context.updatePackage,
    }
  })

  function onDatePickerChange(date: Date | null, type?: string | null) {
    if (!date) return
    if (type === 'delivery') {
      setValue('deliveredDateTime', date)
      return
    }
    setValue('receivedDateTime', date)
  }

  async function createPackageFromForm(data: packageInputs) {
    try {
      const createdPackage = await packageContext.create(data)

      toast.success(
        `Pacote criado com sucesso. O código do pacote gerado é o ${createdPackage.packageCode}`,
      )

      setTimeout(() => {
        reset()
        navigate('/packages')
      }, 2000)
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data)
      } else {
        toast.error('Erro interno do sistema. Equipe de suporte foi notificada')
      }
    }
  }

  async function updatePackageFromForm(data: packageInputs) {
    try {
      await packageContext.update(locationState.packageId, data)

      toast.success(`Pacote atualizado com sucesso.`)

      setTimeout(() => {
        reset()
        navigate('/packages')
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
    navigate('/packages')
  }

  useEffect(() => {
    if (locationState && locationState.packageId) {
      getPackageById(locationState.packageId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (packageItem) {
      setValue('deliveryManId', packageItem.deliveryMan.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packageItem])

  return (
    <>
      <Header />

      <PackageContainer>
        <PackageFieldset>
          <h1>Cadastrar um novo pacote</h1>
          <form
            onSubmit={
              packageItem
                ? handleSubmit(updatePackageFromForm)
                : handleSubmit(createPackageFromForm)
            }
          >
            <InputText
              label="Nome do item"
              placeholder="Escreva o nome do item"
              error={errors.itemName}
              {...register('itemName')}
            />

            <Controller
              control={control}
              name="receivedDateTime"
              render={({ field }) => (
                <InputDatePicker
                  label="Selecione o dia do recebimento do pacote"
                  onChange={(date) => onDatePickerChange(date)}
                  selected={field.value}
                  minDate={new Date()}
                  inputError={errors.receivedDateTime}
                />
              )}
            />

            {packageItem && (
              <>
                <Select
                  options={options}
                  label="Entregador"
                  placeholder="Selecione o entregador"
                  error={errors.deliveryManId}
                  {...register('deliveryManId')}
                />
                <Controller
                  control={control}
                  name="deliveredDateTime"
                  render={({ field }) => (
                    <InputDatePicker
                      label="Selecione o dia da entrega do pacote"
                      onChange={(date) => onDatePickerChange(date, 'delivery')}
                      selected={field.value}
                      minDate={new Date()}
                      inputError={errors.deliveredDateTime}
                    />
                  )}
                />
              </>
            )}

            <ButtonContainer>
              <Button
                title={packageItem ? 'Atualizar' : 'Cadastrar'}
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
