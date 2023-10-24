import { useContextSelector } from 'use-context-selector'
import { MagnifyingGlass, PlusCircle } from 'phosphor-react'
import { useForm } from 'react-hook-form'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { SearchFormContainer } from './styles'
import { useNavigate } from 'react-router-dom'
import { ClaimContext } from '../../../../contexts/ClaimContext'

const searchFromSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFromSchema>

export function SearchForm() {
  const navigate = useNavigate()

  const fetchClaim = useContextSelector(ClaimContext, (context) => {
    return context.fetchClaims
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFromSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchClaim(data.query)
  }

  function handleCreateNewClaim() {
    navigate('/claims/create')
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque a reclamação pelo código do pacote..."
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>

      <button type="button" onClick={() => handleCreateNewClaim()}>
        <PlusCircle size={20} />
        Cadastrar Reclamação
      </button>
    </SearchFormContainer>
  )
}
