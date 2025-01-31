import { useState, useMemo, useCallback, memo } from 'react';
import { 
  Search, Star, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { AuroraText } from '@/components/ui/aurora-text';

const popularDestinations = [
  {
    id: 1,
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a',
    rating: 4.8,
    topAttractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame'],
    averageBudget: '$150/day'
  },
  {
    id: 2,
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
    rating: 4.9,
    topAttractions: ['Shibuya Crossing', 'Tokyo Tower', 'Senso-ji Temple'],
    averageBudget: '$200/day'
  },
  {
    id: 3,
    name: 'New York',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
    rating: 4.7,
    topAttractions: ['Times Square', 'Central Park', 'Statue of Liberty'],
    averageBudget: '$250/day'
  },
  {
    id: 4,
    name: 'Barcelona',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
    rating: 4.6,
    topAttractions: ['Sagrada Familia', 'Park Güell', 'La Rambla'],
    averageBudget: '$120/day'
  },
  {
    id: 5,
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    rating: 4.8,
    topAttractions: ['Burj Khalifa', 'Dubai Mall', 'Palm Jumeirah'],
    averageBudget: '$300/day'
  },
  {
    id: 6,
    name: 'Rome',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
    rating: 4.7,
    topAttractions: ['Colosseum', 'Vatican City', 'Trevi Fountain'],
    averageBudget: '$140/day'
  }
];
// Constants
const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'trending', label: 'Trending' },
  { id: 'budget', label: 'Budget-Friendly' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'adventure', label: 'Adventure' }
];

const DestinationCard = memo(({ destination }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative aspect-[4/3]">
        <img
          src={destination.image}
          alt={destination.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">{destination.name}</h3>
          <div className="flex items-center gap-2 text-sm">
            <Globe className="h-4 w-4" />
            <span>{destination.country}</span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{destination.rating}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {destination.averageBudget}
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-muted-foreground">Top Attractions</h4>
          <div className="flex flex-wrap gap-2">
            {destination.topAttractions.map((attraction, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-muted rounded-full"
              >
                {attraction}
              </span>
            ))}
          </div>
        </div>
        <Button className="w-full">
          Plan Trip
        </Button>
      </div>
    </Card>
  </motion.div>
));

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [destinations, setDestinations] = useState(popularDestinations);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredDestinations = useMemo(() => {
    return destinations
      .filter(destination => {
        if (selectedFilter === 'all') return true;
        return destination.category === selectedFilter;
      })
      .filter(destination => 
        destination.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [destinations, selectedFilter, searchQuery]);

  return (
    <div className="min-h-screen p-6 md:p-8 space-y-8">
      <section className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          <AuroraText>Explore</AuroraText> Amazing Destinations
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover your next adventure from our curated collection of world-class destinations
        </p>
      </section>

      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search destinations..."
              className="pl-10 w-full"
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {FILTERS.map(filter => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? 'default' : 'outline'}
                onClick={() => setSelectedFilter(filter.id)}
                className="whitespace-nowrap"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
