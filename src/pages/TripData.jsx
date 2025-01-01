import { useState } from 'react';
import { Link } from 'react-router';
import { MapPin, Star, DollarSign, Calendar, Users, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TripData = ({ trip }) => {
  const [activeSection, setActiveSection] = useState('itinerary');
  const hotelData = trip?.data?.hotelOptions;
  const config = trip?.config;
  const weather = trip?.data?.weatherForecast;
  const touristSpots = trip?.data?.touristSpots;
  const restaurantRecommendations = trip?.data?.restaurantRecommendations;
  const itinerary = trip?.data?.itineraryPlanner;

  const NavButton = ({ section, label, isActive }) => (
    <Button
      onClick={() => setActiveSection(section)}
      className={`px-4 py-2 rounded-lg transition-all duration-300 ${isActive
        ? ''
        : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
    >
      {label}
    </Button>
  );

  const CardWrapper = ({ children }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      {/* Hero Section */}
      <div className="relative mb-12 rounded-2xl overflow-hidden">
        <img
          src="https://picsum.photos/1920/1080"
          className="w-full h-96 object-cover"
          alt="Destination"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="absolute bottom-8 left-8 right-8">
            <h1 className="text-5xl font-bold text-white mb-4">
              {config?.destination || 'Your Dream Destination'}
            </h1>
            <div className="flex flex-wrap gap-4">
              <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                <Calendar className="w-4 h-4" />
                {config?.duration} Days
              </span>
              <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                <Wallet className="w-4 h-4" />
                {config?.budget} Budget
              </span>
              <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                <Users className="w-4 h-4" />
                {config?.companion} People
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 mb-8 pb-6">
        <NavButton section="itinerary" label="Itinerary" isActive={activeSection === 'itinerary'} />
        <NavButton section="hotels" label="Hotels" isActive={activeSection === 'hotels'} />
        <NavButton section="weather" label="Weather" isActive={activeSection === 'weather'} />
        <NavButton section="spots" label="Tourist Spots" isActive={activeSection === 'spots'} />
        <NavButton section="restaurants" label="Restaurants" isActive={activeSection === 'restaurants'} />
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeSection === 'itinerary' && itinerary?.map((day, index) => (
          <CardWrapper key={index}>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{day?.day}</h3>
              <ul className="list-disc list-inside">
                {day?.activities?.map((activity, idx) => (
                  <li key={idx} className="text-gray-600 mb-2">
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          </CardWrapper>
        ))}

        {activeSection === 'hotels' && hotelData?.map((hotel, index) => (
          <CardWrapper key={index}>
            <Link to={`https://www.google.com/maps/search/${hotel?.hotelName},${hotel?.address}`} target="_blank">
              <img src="https://picsum.photos/1080/1080" className="w-full h-48 object-cover rounded-t-xl " alt="Hotel" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{hotel?.hotelName}</h3>
                <p className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  {hotel?.hotelAddress}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {hotel?.pricePerNight}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    {hotel?.rating}
                  </span>
                </div>
              </div>
            </Link>
          </CardWrapper>
        ))}

        {activeSection === 'weather' && weather?.map((day, index) => (
          <CardWrapper key={index}>

            <div className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">{day?.day}</h3>
              <div className="text-6xl mb-4">
                {day?.condition === 'Sunny' ? '☀️' : day?.condition === 'Rainy' ? '🌧️' : '⛅'}
              </div>
              <p className="text-gray-600">{day?.condition}</p>
              <p className="text-2xl font-bold mt-2">{day?.temperature}</p>
            </div>
          </CardWrapper>
        ))}

        {activeSection === 'spots' && touristSpots?.flatMap((day, index) =>
          day?.attractions?.map((attraction, idx) => (
            <CardWrapper key={`${index}-${idx}`}>
              <Link to={`https://www.google.com/maps/search/${attraction?.name}`} target="_blank">

                <img src="https://picsum.photos/1080/1080" className="w-full h-48 object-cover rounded-t-xl" alt="Hotel" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{attraction?.name}</h3>
                  <p className="text-gray-600 mb-4">{attraction?.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {attraction?.estimatedCost}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      {attraction?.rating}
                    </span>
                  </div>
                </div>
              </Link>
            </CardWrapper>
          ))
        )}

        {activeSection === 'restaurants' && restaurantRecommendations?.flatMap((day, index) =>
          day?.restaurants?.map((restaurant, idx) => (
            <CardWrapper key={`${index}-${idx}`}>
              <Link to={`https://www.google.com/maps/search/${restaurant?.name}`} target="_blank">

                <img src="https://picsum.photos/1080/1080" className="w-full h-48 object-cover rounded-t-xl" alt="Hotel" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{restaurant?.name}</h3>
                  <p className="text-gray-600 mb-2">Cuisine: {restaurant?.cuisine}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {restaurant?.cost}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      {restaurant?.rating}
                    </span>
                  </div>

                </div>
              </Link>
            </CardWrapper>
          ))
        )}


      </div>
    </div>
  );
};

export default TripData;