import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import HomePage from './pages/HomePage'
import AuthModal from './components/AuthModal'
import { ClerkProvider } from '@clerk/clerk-react'
import Dashboard from './pages/Dashboard'
import ExplorePage from './pages/ExplorePage'
import TripPlanner from './pages/dashboard/TripPlanner'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/auth',
    element: <AuthModal />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/explore',
    element: <ExplorePage />,
  },
  {
    path: 'trip',
    element: <TripPlanner />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <RouterProvider router={routes} >
        <App />
      </RouterProvider>
    </ClerkProvider>
  </StrictMode>,
)

