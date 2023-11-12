import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { PackageProvider } from './contexts/PackageContext'
import { DeliveryManProvider } from './contexts/DeliveryManContext'
import { ClaimProvider } from './contexts/ClaimContext'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <PackageProvider>
          <ClaimProvider>
            <DeliveryManProvider>
              <Router />
            </DeliveryManProvider>
          </ClaimProvider>
        </PackageProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
