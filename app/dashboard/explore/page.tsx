'use client'

import React from 'react'
import { Search, MapPin, Hotel, Utensils, Landmark, Star, StarIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'

const categories = [
  { icon: Hotel, label: 'Hotels', color: 'bg-blue-100 text-blue-500' },
  { icon: Utensils, label: 'Restaurants', color: 'bg-green-100 text-green-500' },
  { icon: Landmark, label: 'Tourist Spots', color: 'bg-purple-100 text-purple-500' },
]

const featuredPlaces = [
  {
    title: 'Luxury Resort & Spa',
    location: 'Beach Road',
    rating: 4.8,
    reviews: 342,
    image: '/placeholder-resort.jpg',
    category: 'Hotel'
  },
  {
    title: 'Garden Restaurant',
    location: 'City Center',
    rating: 4.5,
    reviews: 567,
    image: '/placeholder-restaurant.jpg',
    category: 'Restaurant'
  },
  {
    title: 'Historic Monument',
    location: 'Old Town',
    rating: 4.7,
    reviews: 289,
    image: '/placeholder-monument.jpg',
    category: 'Tourist Spot'
  },
  {
    title: 'Seaside Hotel',
    location: 'Coastal Drive',
    rating: 4.6,
    reviews: 423,
    image: '/placeholder-hotel2.jpg',
    category: 'Hotel'
  },
  {
    title: 'Mountain View Resort',
    location: 'Highland Road',
    rating: 4.9,
    reviews: 678,
    image: '/placeholder-resort2.jpg',
    category: 'Hotel'
  },
  {
    title: 'Traditional Cuisine',
    location: 'Market Street',
    rating: 4.4,
    reviews: 445,
    image: '/placeholder-restaurant2.jpg',
    category: 'Restaurant'
  },
  {
    title: 'Ancient Temple',
    location: 'Heritage Park',
    rating: 4.8,
    reviews: 892,
    image: '/placeholder-monument2.jpg',
    category: 'Tourist Spot'
  },
  {
    title: 'Rooftop Dining',
    location: 'Downtown',
    rating: 4.7,
    reviews: 334,
    image: '/placeholder-restaurant3.jpg',
    category: 'Restaurant'
  },
  {
    title: 'Natural Park',
    location: 'Valley Road',
    rating: 4.6,
    reviews: 567,
    image: '/placeholder-park.jpg',
    category: 'Tourist Spot'
  },
  {
    title: 'Sunset Beach Resort',
    location: 'Coastal Bay',
    rating: 4.9,
    reviews: 721,
    image: '/placeholder-beach.jpg',
    category: 'Hotel'
  },
  {
    title: 'Cultural Museum',
    location: 'Arts District',
    rating: 4.5,
    reviews: 432,
    image: '/placeholder-museum.jpg',
    category: 'Tourist Spot'
  },
  {
    title: 'Fusion Kitchen',
    location: 'Central Square',
    rating: 4.7,
    reviews: 556,
    image: '/placeholder-kitchen.jpg',
    category: 'Restaurant'
  }
]

export default function ExplorePage() {
  return (
    <div className="container mx-auto p-6 space-y-12">
      {/* Hero Section */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-fade-in">
            Explore Amazing Places
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Discover the best hotels, restaurants, and tourist spots around you
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              className="pl-10 w-full h-12 text-lg"
              placeholder="Search places..."
              type="search"
            />
          </div>
          <InteractiveHoverButton className="h-12 flex items-center justify-center gap-2 text-lg">
            <span className="flex items-center gap-2">
              Create with AI <StarIcon className="h-5 w-5" />
            </span>
          </InteractiveHoverButton>
        </div>
      </section>

      {/* Categories */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card
            key={category.label}
            className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-full ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                <category.icon className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {category.label}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Explore {category.label.toLowerCase()} near you
                </p>
              </div>
            </div>
          </Card>
        ))}
      </section>

      {/* Featured Places */}
      <section className="space-y-8">
        <h2 className="text-3xl font-semibold">Featured Places</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPlaces.map((place, index) => (
            <Card key={index} className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
              <div className="aspect-video bg-gray-100 relative">
                {/* Add proper image component here */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="px-2 py-1 bg-primary/80 rounded-full text-sm">
                    {place.category}
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {place.title}
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{place.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{place.rating}</span>
                  <span className="text-muted-foreground text-sm">
                    ({place.reviews} reviews)
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}