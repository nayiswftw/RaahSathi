import React from 'react'

function InfoSection({ trip }) {
    return (
        <div>
            <img src="/logo.svg" className='h-80 w-full object-cover rounded-xl' />
            <div className='flex justify-between items-center'>

                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.destination}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-black text-white rounded-full text-lg md:text-md'>{trip?.userSelection?.days} Days</h2>
                        <h2 className='p-1 px-3 bg-black text-white rounded-full text-lg md:text-md'>{trip?.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-black text-white rounded-full text-lg md:text-md'>{trip?.userSelection?.companions} People</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoSection