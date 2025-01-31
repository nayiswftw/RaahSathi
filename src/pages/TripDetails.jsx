// import TripData from "@/components/TripData"
// import { getTrips } from "@/lib/supabaseRequests"
// import { useAuth } from "@clerk/clerk-react"
// import { useEffect, useState } from "react"
// import { useParams } from "react-router"

// const TripDetails = () => {
//   const { tripId } = useParams()
//   const { userId, getToken } = useAuth()
//   const [trip, setTrip] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const loadTripData = async () => {
//       try {
//         const token = await getToken({ template: 'supabase' })
//         const trips = await getTrips({ userId, token })
//         const selectedTrip = trips.find(t => String(t.id) === String(tripId))
//         setTrip(selectedTrip)
//       } catch (error) {
//         console.error('Error loading trip:', error)
//         setError(error.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (userId && tripId) {
//       loadTripData()
//     }
//   }, [tripId, userId, getToken])

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2 className="animate-spin h-6 w-6 mr-2" />
//         <span>Loading trip details...</span>
//       </div>
//     )
//   }

//   if (error) {
//     return <div className="text-red-500 text-center">{error}</div>
//   }

//   if (!trip) {
//     return <div className="text-center p-4">Trip not found</div>
//   }

//   return <TripData trip={trip.trip_data} />
// }

// export default TripDetails      


// TODO