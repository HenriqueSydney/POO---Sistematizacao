import { useMemo } from 'react'

import { useContextSelector } from 'use-context-selector'
import { DeliveryManContext } from '../contexts/DeliveryManContext'

export function useDeliveryManSummary() {
  const deliveryMen = useContextSelector(DeliveryManContext, (context) => {
    return context.deliveryMen
  })

  const summary = useMemo(() => {
    return deliveryMen.reduce(
      (acc, deliveryMan) => {
        if (deliveryMan.vehicleCapacity === 'Pequenos Volumes') {
          acc.small += 1
        } else if (deliveryMan.vehicleCapacity === 'Médio Volumes') {
          acc.medium += 1
        } else {
          acc.big += 1
        }

        return acc
      },
      {
        small: 0,
        medium: 0,
        big: 0,
      },
    )
  }, [deliveryMen])

  return summary
}
