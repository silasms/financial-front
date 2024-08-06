import { ToastContainer } from 'react-toastify'
import './App.css'
import { Router } from './routes'
import { AuthProvider } from './contexts/auth.context'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <AuthProvider>
        <Router />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
    </>
  )
}

export default App
