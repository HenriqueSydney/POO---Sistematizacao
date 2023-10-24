import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface IToastProps {
  autoCloseDelay?: number
}

export function Toast({ autoCloseDelay = 5000 }: IToastProps) {
  return (
    <ToastContainer
      position="top-center"
      autoClose={autoCloseDelay}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  )
}
