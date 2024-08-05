import { ToastContainer } from 'react-toastify'
import './App.css'
import { Router } from './routes'
import { AuthProvider } from './contexts/auth.context'

function App() {
  return (
    <>
      <AuthProvider>
        <Router />
        <ToastContainer />
      </AuthProvider>
    </>
  )
}

export default App
