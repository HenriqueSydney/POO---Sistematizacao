import { Button } from '../Button'

import { HeaderContainer, HeaderContent, LogoContainer } from './styles'

import { api } from '../../lib/axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Truck } from 'phosphor-react'

interface IHeader {
  isHome?: boolean
}

export function Header({ isHome }: IHeader) {
  async function handleOnClick() {
    try {
      const response = await api.post('/start-application/')

      toast.success(response.data.message)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <Link to="/">
          <LogoContainer>
            <Truck size={64} />
            <strong>Dianome</strong>
          </LogoContainer>
        </Link>
        {isHome && (
          <Button
            title="Inicializar aplicação"
            onClick={() => handleOnClick()}
          />
        )}
      </HeaderContent>
    </HeaderContainer>
  )
}
