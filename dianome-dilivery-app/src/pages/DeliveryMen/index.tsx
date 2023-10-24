import { useContextSelector } from 'use-context-selector'

import { Header } from '../../components/Header'
import { Summary, SummaryContent } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'

import { Pencil, Trash, Bicycle, Car, Truck } from 'phosphor-react'
import { ButtonIcons } from '../../components/ButtonIcons'
import { EmptyTable } from '../../components/EmptyTable'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { DeliveryManContext } from '../../contexts/DeliveryManContext'
import {
  ActionContainer,
  DeliveryManContainer,
  DeliveryManTable,
} from './styles'
import { useDeliveryManSummary } from '../../hooks/useDeliveryManSummary'
import { Toast } from '../../components/Toast'

export function DeliveryMen() {
  const [summaryContent, setSummaryContent] = useState<SummaryContent[]>([])
  const deliveryMen = useContextSelector(DeliveryManContext, (context) => {
    return {
      deliveryMen: context.deliveryMen,
      fetchDeliveryMen: context.fetchDeliveryMen,
      removeDeliveryMan: context.removeDeliveryMan,
    }
  })

  const summary = useDeliveryManSummary()

  const navigate = useNavigate()

  async function handleRemoveDeliveryMan(deliveryManId: string) {
    try {
      deliveryMen.removeDeliveryMan(deliveryManId)
    } catch (error) {
      console.log(error)
    }
  }

  function handleUpdateDeliveryMan(deliveryManId: string) {
    navigate('/delivery-men/update', {
      state: {
        deliveryManId,
      },
    })
  }

  useEffect(() => {
    setSummaryContent([
      {
        title: 'Pequenos Volumes',
        icon: <Bicycle size={32} color="#fff" />,
        value: summary.small,
      },
      {
        title: 'Médio Volumes',
        icon: <Car size={32} color="#fff" />,
        value: summary.medium,
      },
      {
        title: 'Grandes Volumes',
        icon: <Truck size={32} color="#fff" />,
        value: summary.big,
      },
    ])
  }, [summary])

  useEffect(() => {
    deliveryMen.fetchDeliveryMen()
  }, [])

  return (
    <>
      <Header />

      <Summary content={summaryContent} />

      <DeliveryManContainer>
        <SearchForm />
        {deliveryMen.deliveryMen.length === 0 && (
          <EmptyTable message="Nenhum entregador localizado" />
        )}
        {deliveryMen.deliveryMen.length > 0 && (
          <>
            <DeliveryManTable>
              <thead>
                <tr>
                  <td>Nome</td>
                  <td>Cpf</td>
                  <td>Capacidade do Veículo</td>
                  <td>Qtd. Pacotes</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {deliveryMen.deliveryMen.map((deliveryMan) => {
                  return (
                    <tr key={deliveryMan.id}>
                      <td>{deliveryMan.name}</td>
                      <td>{deliveryMan.cpf}</td>
                      <td>{deliveryMan.vehicleCapacity}</td>
                      <td>
                        {deliveryMan.packages
                          ? deliveryMan.packages.length.toString()
                          : '0'}
                      </td>

                      <td>
                        <ActionContainer>
                          <ButtonIcons
                            icon={<Pencil />}
                            onClick={() =>
                              handleUpdateDeliveryMan(deliveryMan.id)
                            }
                          />
                          <ButtonIcons
                            icon={<Trash />}
                            variant="WARNING"
                            onClick={() =>
                              handleRemoveDeliveryMan(deliveryMan.id)
                            }
                          />
                        </ActionContainer>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </DeliveryManTable>
          </>
        )}
      </DeliveryManContainer>
      <Toast />
    </>
  )
}
