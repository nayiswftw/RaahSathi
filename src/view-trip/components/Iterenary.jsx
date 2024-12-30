import React from 'react'
import { Link } from 'react-router'

function Iterenary({ trip }) {
    return (
        <div className="p-4">
            <h2 className='font-bold text-xl mt-5'>Iterenary Planner</h2>
            {trip?.tripdata?.itinerary?.map((day, index) => (
                <div key={index} className="mb-6">
                    <div className="text-xl font-bold mb-2">Day {day?.day}</div>
                    {day?.places?.map((place, index) => (
                    <Link key={index} to={'https://www.google.com/maps/search/' + place?.name} target='_blank'>
                        
                        <div key={index} className="mb-4 p-4 border rounded shadow-sm">
                            
                            <h2 className="text-lg font-semibold">{place?.name}</h2>
                            <p className="text-gray-700">{place?.details}</p>
                            <div className="flex gap-4">
                                <h4>⭐{place?.rating}</h4>
                                <h4>💵{place?.ticketPrice}</h4>
                            </div>
                            <div className="text-gray-500">{place?.travelTime}</div>

                        </div>
                    </Link>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Iterenary