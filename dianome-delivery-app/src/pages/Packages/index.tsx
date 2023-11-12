import { useContextSelector } from 'use-context-selector'
import { PackageContext } from '../../contexts/PackageContext'

import { Header } from '../../components/Header'
import { Summary, SummaryContent } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'

import {
  StatusHighlight,
  PackageContainer,
  PackageTable,
  ActionContainer,
} from './styles'
import {
  HouseLine,
  Pencil,
  Storefront,
  Trash,
  Package as PackageIcon,
} from 'phosphor-react'
import { ButtonIcons } from '../../components/ButtonIcons'
import { EmptyTable } from '../../components/EmptyTable'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { usePackageSummary } from '../../hooks/usePackageSummary'
import { Toast } from '../../components/Toast'

export function Package() {
  const [summaryContent, setSummaryContent] = useState<SummaryContent[]>([])
  const packages = useContextSelector(PackageContext, (context) => {
    return {
      packages: context.packages,
      fetchPackages: context.fetchPackages,
      removePackage: context.removePackage,
    }
  })

  const summary = usePackageSummary()

  const navigate = useNavigate()

  async function handleRemovePackage(packageId: string) {
    try {
      packages.removePackage(packageId)
    } catch (error) {
      console.log(error)
    }
  }

  function handleUpdatePackage(packageId: string) {
    navigate('/packages/update', {
      state: {
        packageId,
      },
    })
  }

  useEffect(() => {
    setSummaryContent([
      {
        title: 'Pendentes',
        icon: <Storefront size={32} color="#BF7206" />,
        value: summary.pending,
      },
      {
        title: 'Entregues',
        icon: <HouseLine size={32} color="#00B37E" />,
        value: summary.delivered,
      },
      {
        title: 'Total',
        icon: <PackageIcon size={32} color="#fff" />,
        value: summary.total,
      },
    ])
  }, [summary])

  useEffect(() => {
    packages.fetchPackages()
  }, [])

  return (
    <>
      <Header />

      <Summary content={summaryContent} />

      <PackageContainer>
        <SearchForm />
        {packages.packages.length === 0 && (
          <EmptyTable message="Nenhum pacote localizado" />
        )}
        {packages.packages.length > 0 && (
          <>
            <PackageTable>
              <thead>
                <tr>
                  <td>Código do item</td>
                  <td>Nome do item</td>
                  <td>Status</td>
                  <td>Recebimento</td>
                  <td>Entregador</td>
                  <td>Entrega</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {packages.packages.map((packageItem) => {
                  return (
                    <tr key={packageItem.id}>
                      <td>{packageItem.packageCode}</td>
                      <td>{packageItem.itemName}</td>
                      <td>
                        <StatusHighlight variant={packageItem.status}>
                          {packageItem.status}
                        </StatusHighlight>
                      </td>
                      <td>
                        {new Date(
                          packageItem.receivedDateTime,
                        ).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </td>
                      <td>
                        {packageItem && packageItem.deliveryMan !== null
                          ? packageItem.deliveryMan.name
                          : ''}
                      </td>
                      <td>
                        {packageItem.deliveredDateTime &&
                          new Date(
                            packageItem.deliveredDateTime,
                          ).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                      </td>
                      <td>
                        <ActionContainer>
                          <ButtonIcons
                            icon={<Pencil />}
                            onClick={() => handleUpdatePackage(packageItem.id)}
                          />
                          <ButtonIcons
                            icon={<Trash />}
                            variant="WARNING"
                            onClick={() => handleRemovePackage(packageItem.id)}
                          />
                        </ActionContainer>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </PackageTable>
          </>
        )}
      </PackageContainer>
      <Toast />
    </>
  )
}
