import { ReactNode, useCallback, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'
import { toast } from 'react-toastify'

export interface Package {
  id: string
  itemName: string
  receivedDateTime: Date
  deliveredDateTime: Date | null
  deliveryManId: string
  status: 'Entregue' | 'Aguardando distribuição'
  packageCode: string
  deliveryMan: {
    id: string
    name: string
  }
  createdAt: Date
}

interface CreatePackageInput {
  itemName: string
  receivedDateTime: Date
}

interface UpdatePackageInput {
  itemName: string
  receivedDateTime: Date
  deliveredDateTime: Date | null
  deliveryManId: string | null
}

interface PackageContextType {
  packages: Package[]
  fetchPackages: (query?: string) => Promise<void>
  getPackage: (packageId: string) => Promise<Package>
  createPackage: (data: CreatePackageInput) => Promise<Package>
  updatePackage: (id: string, data: UpdatePackageInput) => Promise<void>
  removePackage: (packageId: string) => Promise<void>
  totalPackages: number
}

export const PackageContext = createContext({} as PackageContextType)

interface PackageProviderProps {
  children: ReactNode
}

export function PackageProvider({ children }: PackageProviderProps) {
  const [packages, setPackages] = useState<Package[]>([])
  const [totalPackages, setTotalPackages] = useState(0)

  const fetchPackages = useCallback(async (queryParam?: string) => {
    let query = queryParam
    if (!queryParam) {
      query = undefined
    }
    const response = await api.get('/packages/', {
      params: {
        query,
      },
    })

    setPackages(response.data)
  }, [])

  const getPackage = useCallback(async (packageId: string) => {
    const response = await api.get(`/packages/${packageId}`)

    return response.data
  }, [])

  const createPackage = useCallback(async (data: CreatePackageInput) => {
    const { itemName, receivedDateTime } = data

    const response = await api.post('/packages/', {
      itemName,
      receivedDateTime,
    })

    setPackages((state) => [response.data, ...state])
    return response.data
  }, [])

  const updatePackage = useCallback(
    async (id: string, data: UpdatePackageInput) => {
      const { itemName, receivedDateTime, deliveredDateTime, deliveryManId } =
        data
      console.log(data)
      await api.put(`/packages/${id}`, {
        itemName,
        receivedDateTime,
        deliveredDateTime,
        deliveryMan: {
          id: deliveryManId,
        },
      })

      fetchPackages()
    },
    [fetchPackages],
  )

  const removePackage = async (packageId: String) => {
    await api.delete(`/packages/${packageId}`)

    const newPackageList = packages.filter(
      (packageItem) => packageItem.id !== packageId,
    )

    setPackages(() => [...newPackageList])
    toast.success('Pacote removido com sucesso')
  }

  useEffect(() => {
    fetchPackages()
  }, [fetchPackages])

  useEffect(() => {
    setTotalPackages(packages.length)
  }, [packages])
  return (
    <PackageContext.Provider
      value={{
        packages,
        fetchPackages,
        getPackage,
        createPackage,
        updatePackage,
        removePackage,
        totalPackages,
      }}
    >
      {children}
    </PackageContext.Provider>
  )
}
