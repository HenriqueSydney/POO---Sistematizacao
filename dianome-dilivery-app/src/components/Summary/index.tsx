import { SummaryCard, SummaryContainer } from './styles'
import { ReactNode } from 'react'

export type SummaryContent = {
  title: string
  icon: ReactNode
  value: Number
}

interface ISummaryProps {
  content: SummaryContent[]
}

export function Summary({ content }: ISummaryProps) {
  return (
    <SummaryContainer>
      {content.map((summaryCardInfo) => {
        return (
          <SummaryCard key={summaryCardInfo.title}>
            <header>
              <span>{summaryCardInfo.title}</span>
              {summaryCardInfo.icon}
            </header>

            <strong>{summaryCardInfo.value.toString()}</strong>
          </SummaryCard>
        )
      })}
    </SummaryContainer>
  )
}
