import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Star, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const places = [
    {
      id: '1',
      type: 'hotel',
      name: 'Grand Plaza Hotel',
      rating: 4.8,
      price: '$$$$',
      image: 'https://source.unsplash.com/featured/?hotel',
      location: 'Downtown, New York'
    },
    {
      id: '2',
      type: 'restaurant',
      name: 'La Piazza',
      rating: 4.5,
      price: '$$$',
      image: 'https://source.unsplash.com/featured/?restaurant',
      location: 'Little Italy, New York'
    },
    {
      id: '3',
      type: 'attraction',
      name: 'City Museum',
      rating: 4.6,
      price: '$$',
      image: 'https://source.unsplash.com/featured/?museum',
      location: 'Central Park, New York'
    }
  ];

  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || place.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="h-screen ">
      <Navbar />
      
      <main className="container max-w-7xl mx-auto px-6 py-24">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Explore Amazing Places</h1>
          <p className="text-xl text-muted-foreground">
            Discover the best hotels, restaurants, and attractions
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search places..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border rounded-lg bg-white"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="hotel">Hotels</option>
            <option value="restaurant">Restaurants</option>
            <option value="attraction">Attractions</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <Card key={place.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{place.rating}</span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{place.name}</h3>
                  <span className="text-muted-foreground">{place.price}</span>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{place.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600 capitalize">
                    {place.type}
                  </span>
                  <Button variant="outline">View Details</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}