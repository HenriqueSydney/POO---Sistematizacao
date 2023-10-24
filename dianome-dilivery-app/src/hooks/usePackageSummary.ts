import { useMemo } from 'react'

import { useContextSelector } from 'use-context-selector'
import { PackageContext } from '../contexts/PackageContext'

export function usePackageSummary() {
  const packages = useContextSelector(PackageContext, (context) => {
    return context.packages
  })

  const summary = useMemo(() => {
    return packages.reduce(
      (acc, packageItem) => {
        if (packageItem.status === 'Entregue') {
          acc.delivered += 1
          acc.total += 1
        } else {
          acc.pending += 1
          acc.total += 1
        }

        return acc
      },
      {
        total: 0,
        delivered: 0,
        pending: 0,
      },
    )
  }, [packages])

  return summary
}
