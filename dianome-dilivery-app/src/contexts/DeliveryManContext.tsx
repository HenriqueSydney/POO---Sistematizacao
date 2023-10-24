import { ReactNode, useCallback, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'
import { Package } from './PackageContext'
import { toast } from 'react-toastify'

type VehicleCapacity = 'Pequenos Volumes' | 'Médio Volumes' | 'Grandes Volumes'

export type VehicleCapacityPossibilities = 'BIG' | 'MEDIUM' | 'SMALL'

export interface DeliveryMan {
  id: string
  cpf: string
  name: string
  vehicleCapacity: VehicleCapacity
  packages: Package[]
  createdAt: Date
}

interface CreateDeliveryManInput {
  cpf: string
  name: string
  vehicleCapacity: VehicleCapacityPossibilities
}

interface UpdateDeliveryManInput {
  cpf: string
  name: string
  vehicleCapacity: VehicleCapacityPossibilities
}

interface DeliveryManContextType {
  deliveryMen: DeliveryMan[]
  fetchDeliveryMen: (query?: string) => Promise<DeliveryMan[]>
  getDeliveryMan: (deliveryManId: string) => Promise<DeliveryMan>
  createDeliveryMan: (data: CreateDeliveryManInput) => Promise<DeliveryMan>
  updateDeliveryMan: (id: string, data: UpdateDeliveryManInput) => Promise<void>
  removeDeliveryMan: (deliveryManId: string) => Promise<void>
  totalDeliveryMen: number
}

export const DeliveryManContext = createContext({} as DeliveryManContextType)

interface DeliveryManProviderProps {
  children: ReactNode
}

export function DeliveryManProvider({ children }: DeliveryManProviderProps) {
  const [deliveryMen, setDeliveryMen] = useState<DeliveryMan[]>([])
  const [totalDeliveryMen, setTotalDeliveryMen] = useState(0)

  const fetchDeliveryMen = useCallback(async (queryParam?: string) => {
    let query = queryParam
    if (!queryParam) {
      query = undefined
    }
    const response = await api.get('/deliverymen/', {
      params: {
        query,
      },
    })

    setDeliveryMen(response.data)
    return response.data
  }, [])

  const getDeliveryMan = useCallback(async (deliveryManId: string) => {
    const response = await api.get(`/deliverymen/${deliveryManId}`)

    return response.data
  }, [])

  const createDeliveryMan = useCallback(
    async (data: CreateDeliveryManInput) => {
      const { cpf, name, vehicleCapacity } = data

      const response = await api.post('/deliverymen/', {
        cpf,
        name,
        vehicleCapacity,
      })

      setDeliveryMen((state) => [response.data, ...state])
      return response.data
    },
    [],
  )

  const updateDeliveryMan = useCallback(
    async (id: string, data: UpdateDeliveryManInput) => {
      const { cpf, name, vehicleCapacity } = data

      await api.put(`/deliverymen/${id}`, {
        cpf,
        name,
        vehicleCapacity,
      })

      fetchDeliveryMen()
    },
    [fetchDeliveryMen],
  )

  const removeDeliveryMan = async (deliveryManId: String) => {
    await api.delete(`/deliverymen/${deliveryManId}`)

    const newDeliveryManList = deliveryMen.filter(
      (deliveryMan) => deliveryMan.id !== deliveryManId,
    )

    setDeliveryMen(() => [...newDeliveryManList])
    toast.success('Entregador removido com sucesso')
  }

  useEffect(() => {
    fetchDeliveryMen()
  }, [fetchDeliveryMen])

  useEffect(() => {
    setTotalDeliveryMen(deliveryMen.length)
  }, [deliveryMen])
  return (
    <DeliveryManContext.Provider
      value={{
        deliveryMen,
        fetchDeliveryMen,
        getDeliveryMan,
        createDeliveryMan,
        updateDeliveryMan,
        removeDeliveryMan,
        totalDeliveryMen,
      }}
    >
      {children}
    </DeliveryManContext.Provider>
  )
}
