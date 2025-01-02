import { useState } from 'react';
import { Link } from 'react-router';
import { MapPin, Star, DollarSign, Calendar, Users, Wallet, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TripData = ({ trip }) => {
  const [activeSection, setActiveSection] = useState('itinerary');
  const { data: { hotelOptions, weatherForecast, touristSpots, restaurantRecommendations, itineraryPlanner, budgetOverview } = {}, config } = trip || {};

  const NavButton = ({ section, label, isActive }) => (
    <Button
      onClick={() => setActiveSection(section)}
      className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-all duration-300 text-sm md:text-base ${
        isActive ? '' : 'bg-white text-gray-600 hover:bg-gray-50'
      }`}
    >
      {label}
    </Button>
  );

  const CardWrapper = ({ children }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full">
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="relative mb-8 md:mb-12 rounded-2xl overflow-hidden">
        <img
          src="https://picsum.photos/1920/1080"
          className="w-full h-48 md:h-96 object-cover"
          alt="Destination"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">
              {config?.destination || 'Your Dream Destination'}
            </h1>
            <div className="flex flex-wrap gap-2 md:gap-4">
              {[
                { icon: Calendar, text: `${config?.duration} Days` },
                { icon: Wallet, text: config?.budget },
                { icon: Users, text: `${config?.companion} People` }
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1 md:gap-2 bg-white/20 backdrop-blur-sm text-white px-2 md:px-4 py-1 md:py-2 rounded-full text-sm md:text-base">
                  <Icon className="w-3 h-3 md:w-4 md:h-4" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8 pb-4 md:pb-6 overflow-x-auto">
        {['itinerary', 'hotels', 'weather', 'spots', 'restaurants', 'budget'].map((section) => (
          <NavButton
            key={section}
            section={section}
            label={section.charAt(0).toUpperCase() + section.slice(1)}
            isActive={activeSection === section}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {activeSection === 'itinerary' && itineraryPlanner?.map((day, index) => (
          <CardWrapper key={index}>
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold mb-2">{day?.day}</h3>
              <ul className="list-disc list-inside space-y-1 md:space-y-2">
                {day?.activities?.map((activity, idx) => (
                  <li key={idx} className="text-sm md:text-base text-gray-600">
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          </CardWrapper>
        ))}

        {activeSection === 'hotels' && hotelOptions?.map((hotel, index) => (
          <CardWrapper key={index}>
            <Link to={`https://www.google.com/maps/search/${hotel?.hotelName},${hotel?.address}`} target="_blank">
              <img src="https://picsum.photos/600/600" className="w-full h-40 md:h-48 object-cover rounded-t-xl" alt="Hotel" />
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold mb-2">{hotel?.hotelName}</h3>
                <p className="flex items-center gap-2 text-sm md:text-base text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  {hotel?.hotelAddress}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="flex items-center gap-1 text-sm md:text-base">
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

        {activeSection === 'weather' && weatherForecast?.map((day, index) => (
          <CardWrapper key={index}>
            <div className="p-4 md:p-6 text-center">
              <h3 className="text-lg md:text-xl font-bold mb-2">{day?.day}</h3>
              <div className="text-4xl md:text-6xl mb-4">
                {day?.condition === 'Sunny' ? '☀️' : day?.condition === 'Rainy' ? '🌧️' : '⛅'}
              </div>
              <p className="text-sm md:text-base text-gray-600">{day?.condition}</p>
              <p className="text-xl md:text-2xl font-bold mt-2">{day?.temperature}</p>
            </div>
          </CardWrapper>
        ))}

        {activeSection === 'spots' && touristSpots?.flatMap((day, index) =>
          day?.attractions?.map((attraction, idx) => (
            <CardWrapper key={`${index}-${idx}`}>
              <Link to={`https://www.google.com/maps/search/${attraction?.name}`} target="_blank">
                <img src="https://picsum.photos/600/600" className="w-full h-40 md:h-48 object-cover rounded-t-xl" alt="Attraction" />
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold mb-2">{attraction?.name}</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4">{attraction?.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm md:text-base">
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
                <img src="https://picsum.photos/600/600" className="w-full h-40 md:h-48 object-cover rounded-t-xl" alt="Restaurant" />
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold mb-2">{restaurant?.name}</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-2">Cuisine: {restaurant?.cuisine}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm md:text-base">
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

        {activeSection === 'budget' && (
          <CardWrapper>
            <div className="p-4 md:p-8">
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-blue-600"/>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">Budget Overview</h3>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                {[
                  { label: 'Estimated Food Cost', value: budgetOverview?.estimatedFoodCost },
                  { label: 'Miscellaneous Expenses', value: budgetOverview?.miscellaneousExpenses },
                  { label: 'Total Attraction Cost', value: budgetOverview?.totalAttractionCost },
                  { label: 'Total Hotel Cost', value: budgetOverview?.totalHotelCost }
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between p-2 md:p-3 rounded-lg hover:bg-gray-50">
                    <span className="text-sm md:text-base text-gray-600">{item.label}</span>
                    <div className="flex items-center gap-1 text-base md:text-lg font-semibold text-gray-900">
                      <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-green-600"/>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardWrapper>
        )}
      </div>
    </div>
  );
};

export default TripData;