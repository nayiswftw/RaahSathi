'use client'

import React, { useState } from 'react'
import { Search, MapPin, Star, DollarSign } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { SparklesText } from '@/components/ui/sparkles-text'

// Mock data for hotels - in a real app, this would come from an API
const hotels = [
    {
        id: 1,
        name: 'Luxury Resort & Spa',
        location: 'Beach Road, Miami',
        rating: 4.8,
        price: 299,
        image: 'https://picsum.photos/800/500?hotel=1',
        amenities: ['Pool', 'Spa', 'Restaurant', 'Gym']
    },
    {
        id: 2,
        name: 'City Center Hotel',
        location: 'Downtown Avenue, New York',
        rating: 4.5,
        price: 199,
        image: 'https://picsum.photos/800/500?hotel=2',
        amenities: ['WiFi', 'Restaurant', 'Business Center']
    },
    // Add more hotels as needed
]

export default function HotelsPage() {
    const [searchQuery, setSearchQuery] = useState('')

    const filteredHotels = hotels.filter(hotel =>
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">
                    <SparklesText text='Find Perfect Hotels' />
                </h1>
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search hotels by name or location..."
                        className="pl-10 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Hotels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHotels.map((hotel) => (
                    <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <img
                            src={hotel.image}
                            alt={hotel.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                            <div className="flex items-center text-gray-600 mb-2">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span className="text-sm">{hotel.location}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="ml-1 text-sm">{hotel.rating}</span>
                                </div>
                                <div className="flex items-center text-green-600">
                                    <DollarSign className="w-4 h-4" />
                                    <span className="font-semibold">{hotel.price}</span>
                                    <span className="text-sm text-gray-500">/night</span>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="flex flex-wrap gap-2">
                                    {hotel.amenities.map((amenity, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-600"
                                        >
                                            {amenity}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}