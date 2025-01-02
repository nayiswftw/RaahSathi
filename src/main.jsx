import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Footer from './components/custom/Footer'
import CreateTrip from './pages/CreateTrip'
import { Toaster } from './components/ui/toaster'
import Auth from './pages/Auth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create-trip',
    element: <CreateTrip />,
  },
  {
    path: '/auth',
    element: <Auth />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster />
    <RouterProvider router={router} />
    <Footer />
  </StrictMode>,
)
