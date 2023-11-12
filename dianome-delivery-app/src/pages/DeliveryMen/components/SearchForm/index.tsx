import { useContextSelector } from 'use-context-selector'
import { MagnifyingGlass, PlusCircle } from 'phosphor-react'
import { useForm } from 'react-hook-form'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { SearchFormContainer } from './styles'
import { useNavigate } from 'react-router-dom'
import { DeliveryManContext } from '../../../../contexts/DeliveryManContext'

const searchFromSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFromSchema>

export function SearchForm() {
  const navigate = useNavigate()

  const fetchDeliveryMen = useContextSelector(DeliveryManContext, (context) => {
    return context.fetchDeliveryMen
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFromSchema),
  })

  async function handleSearchDeliveryMen(data: SearchFormInputs) {
    await fetchDeliveryMen(data.query)
  }

  function handleCreateNewDeliveryMan() {
    navigate('/delivery-men/update')
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchDeliveryMen)}>
      <input
        type="text"
        placeholder="Busque por um entregador pelo nome..."
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>

      <button type="button" onClick={() => handleCreateNewDeliveryMan()}>
        <PlusCircle size={20} />
        Cadastrar Entregador
      </button>
    </SearchFormContainer>
  )
}
