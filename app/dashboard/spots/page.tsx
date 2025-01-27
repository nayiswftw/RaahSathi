'use client'

import React from 'react'
import { Search, MapPin, Star, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SparklesText } from '@/components/ui/sparkles-text'

const touristSpots = [
    {
        title: 'Ancient Temple',
        location: 'Heritage Park',
        rating: 4.8,
        reviews: 892,
        image: '/placeholder-monument2.jpg',
        description: 'A historic temple known for its intricate architecture and peaceful atmosphere',
        price: '$$'
    },
    {
        title: 'Natural Park',
        location: 'Valley Road',
        rating: 4.6,
        reviews: 567,
        image: '/placeholder-park.jpg',
        description: 'Sprawling park featuring hiking trails and diverse wildlife',
        price: '$'
    },
    {
        title: 'Cultural Museum',
        location: 'Arts District',
        rating: 4.5,
        reviews: 432,
        image: '/placeholder-museum.jpg',
        description: 'Museum showcasing local history and cultural artifacts',
        price: '$$'
    },
    {
        title: 'Historic Monument',
        location: 'Old Town',
        rating: 4.7,
        reviews: 289,
        image: '/placeholder-monument.jpg',
        description: 'Iconic landmark with guided tours available',
        price: '$'
    }
]

export default function SpotsPage() {
    return (
        <div className="container mx-auto p-6 space-y-8">
            {/* Header Section */}
            <section className="space-y-4">
                <SparklesText text="Tourist Spots" />
                <p className="text-muted-foreground text-lg">
                    Discover amazing attractions and landmarks
                </p>
            </section>

            {/* Search and Filter Section */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                        className="pl-10 w-full"
                        placeholder="Search tourist spots..."
                        type="search"
                    />
                </div>
                <Button variant={'outline' as const} className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                </Button>
            </div>

            {/* Tourist Spots Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {touristSpots.map((spot, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <img
                            src={spot.image}
                            alt={spot.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4 space-y-3">
                            <div className="flex items-start justify-between">
                                <h3 className="font-semibold text-lg">{spot.title}</h3>
                                <span className="text-sm font-medium">{spot.price}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 mr-1" />
                                {spot.location}
                            </div>
                            <p className="text-sm text-muted-foreground">{spot.description}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                    <span className="ml-1 text-sm font-medium">{spot.rating}</span>
                                    <span className="ml-1 text-sm text-muted-foreground">
                                        ({spot.reviews} reviews)
                                    </span>
                                </div>
                                <Button size={'sm' as const}>View Details</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}