import { Header } from '../../components/Header'
import { Summary, SummaryContent } from '../../components/Summary'

import { Container } from './styles'
import { MainButtonIcons } from '../../components/MainButtonIcons'
import { Megaphone, Package, UserList } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import { useSummary } from '../../hooks/useSummary'
import { useEffect, useState } from 'react'
import { Toast } from '../../components/Toast'

export function Home() {
  const [summaryContent, setSummaryContent] = useState<SummaryContent[]>([])
  const navigate = useNavigate()

  const summary = useSummary()

  function handleGoToDeliveryMen() {
    navigate('/delivery-men')
  }

  function handleGoToPackages() {
    navigate('/packages')
  }

  function handleGoToClaims() {
    navigate('/claims')
  }

  useEffect(() => {
    setSummaryContent([
      {
        title: 'Entregadores',
        icon: <UserList size={32} color="#fff" />,
        value: summary.deliveryMen,
      },
      {
        title: 'Pacotes',
        icon: <Package size={32} color="#00B37E" />,
        value: summary.packages,
      },
      {
        title: 'Reclamações',
        icon: <Megaphone size={32} color="#F75A68" />,
        value: summary.claims,
      },
    ])
  }, [summary])

  return (
    <>
      <Header isHome />

      <Summary content={summaryContent} />

      <Container>
        <MainButtonIcons
          icon={<UserList size={100} />}
          title="Entregadores"
          onClick={() => handleGoToDeliveryMen()}
        />
        <MainButtonIcons
          icon={<Package size={100} />}
          title="Pacotes"
          onClick={() => handleGoToPackages()}
        />
        <MainButtonIcons
          icon={<Megaphone size={100} />}
          title="Reclamações"
          onClick={() => handleGoToClaims()}
        />
      </Container>
      <Toast />
    </>
  )
}
