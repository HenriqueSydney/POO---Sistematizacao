import { useContextSelector } from 'use-context-selector'
import { MagnifyingGlass, PlusCircle } from 'phosphor-react'
import { useForm } from 'react-hook-form'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { SearchFormContainer } from './styles'
import { useNavigate } from 'react-router-dom'
import { PackageContext } from '../../../../contexts/PackageContext'

const searchFromSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFromSchema>

export function SearchForm() {
  const navigate = useNavigate()

  const fetchPackage = useContextSelector(PackageContext, (context) => {
    return context.fetchPackages
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFromSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchPackage(data.query)
  }

  function handleCreateNewPackage() {
    navigate('/packages/update')
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por um pacote específico pelo código..."
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>

      <button type="button" onClick={() => handleCreateNewPackage()}>
        <PlusCircle size={20} />
        Cadastrar Pacote
      </button>
    </SearchFormContainer>
  )
}
