import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import CreateTrip from './create-trip'
import Header from './components/ui/custom/header'
import Preloader from './components/ui/custom/Preloader'
import { Toaster } from './components/ui/toaster'
import Viewtrip from './view-trip/[tripId]'

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
    path: '/view-trip/:tripId',
    element: <Viewtrip />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Preloader /> */}
    <Toaster />
    {/* <Header /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
