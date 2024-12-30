import { db } from '@/service/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import InfoSection from '../components/InfoSection'
import Hotels from '../components/Hotels'
import Iterenary from '../components/Iterenary'
import Footer from '@/components/ui/custom/Footer'

function Viewtrip() {
    const { tripId } = useParams()
    const [trip, setTrip] = useState([]);
    useEffect(() => {
        tripId && GetTripData()
    }, [tripId])
    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            console.log("Document:", docSnap.data())
            setTrip(docSnap.data());
        }
        else {
            console.log('No such document')
        }
    }
    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            
            {/* Information Section */}
            <InfoSection trip={trip} />
            {/* Recommended Hotels */}
            <Hotels trip={trip} />
            {/* Iterenary */}
            <Iterenary trip={trip} />
            {/* Footer */}

            <Footer />
        </div>
    )
}

export default Viewtrip