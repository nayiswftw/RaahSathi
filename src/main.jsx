import { createRoot } from 'react-dom/client'
import { StrictMode, Suspense } from 'react'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Skeleton } from "@/components/ui/skeleton"
import AuthModal from './auth/AuthModal'
import CreateTrip from './pages/CreateTrip'
import ExplorePage from './pages/ExplorePage'
import SavedTripPage from './pages/SavedTripPage'
import Dashboard from './pages/Dashboard'

const LoadingSkeleton = () => (
  <div className="flex h-screen w-full flex-col md:flex-row">
    <div className="w-full md:w-64 border-r p-4 flex flex-col gap-4">
      <Skeleton className="h-8 w-32" />
      <div className="space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-10 w-full rounded" />
        ))}
      </div>
      <div className="mt-auto">
        <Skeleton className="h-12 w-full rounded" />
      </div>
    </div>

    <div className="flex-1 p-6">
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-24 w-full rounded" />
          <Skeleton className="h-24 w-full rounded" />
        </div>
      </div>
    </div>
  </div>
)

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthModal />} />
            <Route path="/" element={<App />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="trip" element={<CreateTrip />} />
              <Route path="explore" element={<Suspense fallback={<LoadingSkeleton />}><ExplorePage /></Suspense>} />
              <Route path="saves" element={<Suspense fallback={<LoadingSkeleton />}><SavedTripPage /></Suspense>} />
            </Route>
          </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
)
