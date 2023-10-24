import { useContextSelector } from 'use-context-selector'
import { ClaimContext } from '../../contexts/ClaimContext'

import { Header } from '../../components/Header'
import { Summary, SummaryContent } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'

import {
  StatusHighlight,
  ClaimContainer,
  ClaimTable,
  ActionContainer,
} from './styles'
import {
  Eye,
  Pencil,
  Smiley,
  SmileySad,
  SmileyWink,
  Trash,
} from 'phosphor-react'
import { ButtonIcons } from '../../components/ButtonIcons'
import { EmptyTable } from '../../components/EmptyTable'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useClaimSummary } from '../../hooks/useClaimSummary'
import { Toast } from '../../components/Toast'

export function Claims() {
  const [summaryContent, setSummaryContent] = useState<SummaryContent[]>([])
  const claims = useContextSelector(ClaimContext, (context) => {
    return {
      claims: context.claims,
      fetchClaims: context.fetchClaims,
      removeClaim: context.removeClaim,
    }
  })

  const summary = useClaimSummary()

  const navigate = useNavigate()

  async function handleRemoveClaim(claimId: string) {
    try {
      claims.removeClaim(claimId)
    } catch (error) {
      console.log(error)
    }
  }

  function handleUpdateClaim(claimId: string) {
    navigate('/claims/update', {
      state: {
        claimId,
      },
    })
  }

  useEffect(() => {
    setSummaryContent([
      {
        title: 'Pendentes',
        icon: <SmileySad size={32} color="#BF7206" />,
        value: summary.pending,
      },
      {
        title: 'Respondidos',
        icon: <SmileyWink size={32} color="#00B37E" />,
        value: summary.answered,
      },
      {
        title: 'Total',
        icon: <Smiley size={32} color="#fff" />,
        value: summary.total,
      },
    ])
  }, [summary])

  useEffect(() => {
    claims.fetchClaims()
  }, [])

  return (
    <>
      <Header />

      <Summary content={summaryContent} />

      <ClaimContainer>
        <SearchForm />
        {claims.claims.length === 0 && (
          <EmptyTable message="Nenhuma reclamação localizada" />
        )}
        {claims.claims.length > 0 && (
          <>
            <ClaimTable>
              <thead>
                <tr>
                  <td>Código do item</td>
                  <td>Nome do Reclamante</td>
                  <td>Status</td>
                  <td>Criado</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {claims.claims.map((claimItem) => {
                  return (
                    <tr key={claimItem.id}>
                      <td>{claimItem.packageItem.packageCode}</td>
                      <td>{claimItem.claimantName}</td>
                      <td>
                        <StatusHighlight
                          variant={
                            claimItem.claimSolutionDescription
                              ? 'respondido'
                              : 'pendente'
                          }
                        >
                          {claimItem.claimSolutionDescription
                            ? 'Respondido'
                            : 'Pendente'}
                        </StatusHighlight>
                      </td>
                      <td>
                        {new Date(claimItem.createdAt).toLocaleDateString(
                          'pt-BR',
                          {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          },
                        )}
                      </td>
                      <td>
                        <ActionContainer>
                          {claimItem.claimSolutionDescription ? (
                            <ButtonIcons
                              icon={<Eye />}
                              onClick={() => handleUpdateClaim(claimItem.id)}
                            />
                          ) : (
                            <>
                              <ButtonIcons
                                icon={<Pencil />}
                                onClick={() => handleUpdateClaim(claimItem.id)}
                              />
                              <ButtonIcons
                                icon={<Trash />}
                                variant="WARNING"
                                onClick={() => handleRemoveClaim(claimItem.id)}
                              />
                            </>
                          )}
                        </ActionContainer>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </ClaimTable>
          </>
        )}
      </ClaimContainer>
      <Toast />
    </>
  )
}
