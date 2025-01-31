import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter, Route, Routes } from 'react-router'
import AuthModal from './auth/AuthModal'
import CreateTrip from './pages/CreateTrip'
import ExplorePage from './pages/ExplorePage'
import SavedTripPage from './pages/SavedTripPage'
import Dashboard from './pages/Dashboard'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthModal />} />
            <Route path="/" element={<App />} />
            <Route  path="/dashboard" element={<Dashboard />} >
              <Route path="/dashboard/trip" element={<CreateTrip />} />
              <Route path="/dashboard/explore" element={<ExplorePage />} />
              <Route path="/dashboard/saves" element={<SavedTripPage />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
)
