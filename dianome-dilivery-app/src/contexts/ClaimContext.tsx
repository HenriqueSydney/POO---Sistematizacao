import { ReactNode, useCallback, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'
import { toast } from 'react-toastify'

export interface Claim {
  id: string
  claimantName: string
  phoneNumber: string
  claimDescription: string
  claimSolutionDescription: string
  packageItem: {
    id: string
    itemName: string
    packageCode: string
    deliveryMan: {
      name: string
      cpf: string
      vehicleCapacity: string
    }
  }
  createdAt: Date
}

interface CreateClaimInput {
  claimantName: string
  phoneNumber: string
  claimDescription: string
  packageCode: string
}

interface UpdateClaimInput {
  claimSolutionDescription: string
}

interface ClaimContextType {
  claims: Claim[]
  fetchClaims: (query?: string) => Promise<Claim[]>
  getClaim: (claimId: string) => Promise<Claim>
  createClaim: (data: CreateClaimInput) => Promise<Claim>
  updateClaim: (id: string, data: UpdateClaimInput) => Promise<void>
  removeClaim: (claimId: string) => Promise<void>
  totalClaims: number
}

export const ClaimContext = createContext({} as ClaimContextType)

interface ClaimProviderProps {
  children: ReactNode
}

export function ClaimProvider({ children }: ClaimProviderProps) {
  const [claims, setClaims] = useState<Claim[]>([])
  const [totalClaims, setTotalClaims] = useState(0)

  const fetchClaims = useCallback(async (queryParam?: string) => {
    let query = queryParam
    if (!queryParam) {
      query = undefined
    }
    const response = await api.get('/claims/', {
      params: {
        query,
      },
    })

    setClaims(response.data)
    return response.data
  }, [])

  const getClaim = useCallback(async (claimId: string) => {
    const response = await api.get(`/claims/${claimId}`)

    return response.data
  }, [])

  const createClaim = useCallback(async (data: CreateClaimInput) => {
    const { claimantName, phoneNumber, claimDescription, packageCode } = data

    const responsePackage = await api.get(`/packages/byCode/${packageCode}`)

    const response = await api.post('/claims/', {
      claimantName,
      phoneNumber,
      claimDescription,
      packageModel: {
        id: responsePackage.data.id,
      },
    })

    setClaims((state) => [response.data, ...state])
    return response.data
  }, [])

  const updateClaim = useCallback(
    async (id: string, data: UpdateClaimInput) => {
      const { claimSolutionDescription } = data

      await api.patch(`/claims/${id}`, {
        claimSolutionDescription,
      })

      fetchClaims()
    },
    [fetchClaims],
  )

  const removeClaim = async (claimId: String) => {
    await api.delete(`/claims/${claimId}`)

    const newClaimList = claims.filter((claim) => claim.id !== claimId)

    setClaims(() => [...newClaimList])
    toast.success('Reclamação removido com sucesso')
  }

  useEffect(() => {
    fetchClaims()
  }, [fetchClaims])

  useEffect(() => {
    setTotalClaims(claims.length)
  }, [claims])
  return (
    <ClaimContext.Provider
      value={{
        claims,
        fetchClaims,
        getClaim,
        createClaim,
        updateClaim,
        removeClaim,
        totalClaims,
      }}
    >
      {children}
    </ClaimContext.Provider>
  )
}
