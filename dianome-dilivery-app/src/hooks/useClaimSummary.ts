import { useMemo } from 'react'

import { useContextSelector } from 'use-context-selector'
import { ClaimContext } from '../contexts/ClaimContext'

export function useClaimSummary() {
  const claims = useContextSelector(ClaimContext, (context) => {
    return context.claims
  })

  const summary = useMemo(() => {
    return claims.reduce(
      (acc, deliveryMan) => {
        if (!deliveryMan.claimSolutionDescription) {
          acc.pending += 1
        } else if (deliveryMan.claimSolutionDescription) {
          acc.answered += 1
        }
        acc.total += 1

        return acc
      },
      {
        pending: 0,
        answered: 0,
        total: 0,
      },
    )
  }, [claims])

  return summary
}
