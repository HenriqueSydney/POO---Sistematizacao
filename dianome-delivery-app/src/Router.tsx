import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Package } from './pages/Packages'
import { DeliveryMen } from './pages/DeliveryMen'
import { Claims } from './pages/Claims'
import { PackageCreateForm } from './pages/Packages/PackageCreateForm'
import { DeliveryManCreateForm } from './pages/DeliveryMen/DeliveryManCreateForm'
import { ClaimCreateForm } from './pages/Claims/ClaimCreateForm'
import { ClaimUpdateForm } from './pages/Claims/ClaimUpdateForm'

export function Router() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Package />} />
        <Route path="/packages/update" element={<PackageCreateForm />} />
        <Route path="/delivery-men" element={<DeliveryMen />} />
        <Route
          path="/delivery-men/update"
          element={<DeliveryManCreateForm />}
        />
        <Route path="/claims" element={<Claims />} />
        <Route path="/claims/create" element={<ClaimCreateForm />} />
        <Route path="/claims/update" element={<ClaimUpdateForm />} />
      </Route>
    </Routes>
  )
}
