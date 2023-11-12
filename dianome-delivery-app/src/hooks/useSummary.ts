import { useMemo } from 'react'

import { useContextSelector } from 'use-context-selector'
import { PackageContext } from '../contexts/PackageContext'
import { ClaimContext } from '../contexts/ClaimContext'
import { DeliveryManContext } from '../contexts/DeliveryManContext'

export function useSummary() {
  const totalPackages = useContextSelector(PackageContext, (context) => {
    return context.totalPackages
  })

  const totalDeliveryMen = useContextSelector(DeliveryManContext, (context) => {
    return context.totalDeliveryMen
  })

  const totalClaims = useContextSelector(ClaimContext, (context) => {
    return context.totalClaims
  })

  const summary = useMemo(() => {
    return {
      deliveryMen: totalDeliveryMen,
      packages: totalPackages,
      claims: totalClaims,
    }
  }, [totalPackages, totalDeliveryMen, totalClaims])

  return summary
}
