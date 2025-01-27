'use client'

import React, { useState } from 'react'
import { Search, MapPin, Star, DollarSign, Utensils } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { SparklesText } from '@/components/ui/sparkles-text'

// Mock data for restaurants - in a real app, this would come from an API
const restaurants = [
    {
        id: 1,
        name: 'Garden Restaurant',
        location: 'City Center',
        cuisine: 'International',
        rating: 4.5,
        priceRange: '$$',
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/a0/3b/a6/table-d-hote.jpg?w=1200&h=-1&s=1',
        specialties: ['Farm-to-table', 'Organic', 'Vegan options']
    },
    {
        id: 2,
        name: 'Traditional Cuisine',
        location: 'Market Street',
        cuisine: 'Local',
        rating: 4.4,
        priceRange: '$$$',
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/6f/63/95/etablissement.jpg?w=1200&h=-1&s=1',
        specialties: ['Local delicacies', 'Fresh seafood', 'Wine selection']
    },
    {
        id: 3,
        name: 'Fusion Kitchen',
        location: 'Central Square',
        cuisine: 'Asian Fusion',
        rating: 4.7,
        priceRange: '$$$',
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/7d/85/87/lazare.jpg?w=1200&h=-1&s=1',
        specialties: ['Innovative dishes', 'Craft cocktails', 'Weekend brunch']
    }
]

export default function RestaurantsPage() {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredRestaurants = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">
                    <SparklesText text='Discover Restaurants'/>
                </h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search restaurants by name, cuisine, or location..."
                        className="pl-10 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map((restaurant) => (
                    <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-48">
                            <img
                                src={restaurant.image}
                                alt={restaurant.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
                            <div className="flex items-center mb-2">
                                <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                                <span className="text-gray-600">{restaurant.location}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <Utensils className="w-4 h-4 mr-1 text-gray-500" />
                                <span className="text-gray-600">{restaurant.cuisine}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                    <span>{restaurant.rating}</span>
                                </div>
                                <div className="flex items-center">
                                    <DollarSign className="w-4 h-4 text-green-600" />
                                    <span>{restaurant.priceRange}</span>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="flex flex-wrap gap-2">
                                    {restaurant.specialties.map((specialty, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full"
                                        >
                                            {specialty}
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