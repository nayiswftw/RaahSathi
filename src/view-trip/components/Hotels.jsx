import React from 'react'
import { Link } from 'react-router'

function Hotels({ trip }) {
    return (
        <div>
            <h2 className='font-bold text-2xl mt-8'>Hotel Recommendation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {trip?.tripdata?.hotels?.map((hotel, index) => (
                    <Link key={index} to={'https://www.google.com/maps/search/' + hotel?.name + "," + hotel?.address} target='_blank'>
                        <div className='hover:scale-105 transition-transform duration-300 cursor-pointer'>
                            <img src="/logo.svg" className='rounded-xl w-full h-48 object-cover' />
                            <div className='mt-4 flex flex-col gap-1'>
                                <h2 className='font-semibold text-lg'>{hotel?.name}</h2>
                                <h2 className='text-sm text-gray-500'>📍{hotel?.address}</h2>
                                <h2 className='text-sm'>💵{hotel?.price}</h2>
                                <h2 className='text-sm'>⭐{hotel?.rating}</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Hotels
