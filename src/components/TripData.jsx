import { useEffect, useState, memo } from 'react';
import { MapPin, Star, DollarSign, Calendar, Users, Wallet, TrendingUp, Heart, HeartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addTrips } from '@/lib/supabaseRequests';
import { Link } from 'react-router';
import { useAuth } from '@clerk/clerk-react';
import { fetchHotels, fetchRestaurants, fetchSpots } from '@/hooks/getDummyImages';



const NavButton = memo(({ section, label, isActive, setActiveSection }) => (
    <Button
        onClick={() => setActiveSection(section)}
        className={`
            px-4 py-2 transition-all duration-300 
            ${isActive
                ? 'text-white shadow-lg scale-105 dark:bg-black'
                : 'bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 hover:scale-105 text-gray-700 dark:text-gray-200'}
        `}
    >
        {label}
    </Button>
));

const CardWrapper = memo(({ children }) => (
    <div
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
    >
        {children}
    </div>
));

const ItinerarySection = memo(({ itineraryPlanner }) => (
    <>
        {itineraryPlanner?.map((day, i) => (
            <CardWrapper key={i}>
                <div className=" p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold mb-2">{day?.day}</h3>
                    <ul className="list-disc list-inside space-y-1 md:space-y-2">
                        {day?.activities?.map((activity, idx) => (
                            <li key={idx} className="text-sm md:text-base text-muted-foreground">
                                {activity}
                            </li>
                        ))}
                    </ul>
                </div>
            </CardWrapper>
        ))}
    </>
));

const HotelsSection = memo(({ hotelOptions }) => {
    const [hotelImages, setHotelImages] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const loadImages = async () => {
            if (!hotelOptions) return;
            
            const images = await Promise.all(
                Array(hotelOptions.length).fill().map(() => fetchHotels())
            );
            
            if (isMounted) {
                setHotelImages(images);
            }
        };

        loadImages();
        return () => { isMounted = false; };
    }, [hotelOptions]);

    if (!hotelOptions?.length) return null;

    return (
        <>
            {hotelOptions.map((hotel, i) => (
                <CardWrapper key={i}>
                    <Link to={`https://www.google.com/maps/search/${encodeURIComponent(`${hotel?.hotelName},${hotel?.hotelAddress}`)}`} target="_blank">
                        <img
                            src={hotelImages[i] || ''}
                            className="w-full h-40 md:h-48 object-cover rounded-t-xl"
                            alt={`${hotel?.hotelName || 'Hotel'}`}
                            loading='lazy'
                        />
                        <div className="p-4 md:p-6">
                            <h3 className="text-lg md:text-xl font-bold mb-2">{hotel?.hotelName}</h3>
                            <p className="flex items-center gap-2 text-sm md:text-base text-muted-foreground mb-2">
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
        </>
    );
});

const WeatherSection = memo(({ weatherForecast }) => (
    <>
        {weatherForecast?.map((day, i) => (
            <CardWrapper key={i}>
                <div className="p-4 md:p-6 text-center">
                    <h3 className="text-lg md:text-xl font-bold mb-2">{day?.day}</h3>
                    <div className="text-4xl md:text-6xl mb-4">
                        {day?.condition === 'Sunny' ? '☀️' : day?.condition === 'Rainy' ? '🌧️' : '⛅'}
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground">{day?.condition}</p>
                    <p className="text-xl md:text-2xl font-bold mt-2">{day?.temperature}</p>
                </div>
            </CardWrapper>
        ))}
    </>
));

const SpotsSection = memo(({ touristSpots }) => {
    const [spotImages, setSpotImages] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const loadImages = async () => {
            if (!touristSpots) return;
            
            const totalSpots = touristSpots.reduce((acc, day) => 
                acc + (day?.attractions?.length || 0), 0);
            
            const images = await Promise.all(
                Array(totalSpots).fill().map(() => fetchSpots())
            );
            
            if (isMounted) {
                setSpotImages(images);
            }
        };

        loadImages();
        return () => { isMounted = false; };
    }, [touristSpots]);

    if (!touristSpots?.length) return null;

    return (
        <>
            {touristSpots.flatMap((day, i) =>
                (day?.attractions || []).map((attraction, idx) => {
                    const imageIndex = i * (day?.attractions?.length || 0) + idx;
                    if (!attraction) return null;

                    return (
                        <CardWrapper key={`${i}-${idx}`}>
                            <Link to={`https://www.google.com/maps/search/${encodeURIComponent(attraction.name)}`} target="_blank">
                                <img 
                                    src={spotImages[imageIndex] || ''} 
                                    className="w-full h-40 md:h-48 object-cover rounded-t-xl" 
                                    alt={`${attraction.name} attraction`} 
                                    loading='lazy' 
                                />
                                <div className="p-4 md:p-6">
                                    <h3 className="text-lg md:text-xl font-bold mb-2">{attraction.name}</h3>
                                    <p className="text-sm md:text-base text-muted-foreground mb-4">{attraction.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-1 text-sm md:text-base">
                                            <DollarSign className="w-4 h-4" />
                                            {attraction.estimatedCost}
                                        </span>
                                        <span className="flex items-center gap-1 text-yellow-500">
                                            <Star className="w-4 h-4 fill-current" />
                                            {attraction.rating}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </CardWrapper>
                    );
                })
            )}
        </>
    );
});

const RestaurantsSection = memo(({ restaurantRecommendations }) => {
    const [restaurantImages, setRestaurantImages] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const loadImages = async () => {
            if (!restaurantRecommendations) return;
            
            const totalRestaurants = restaurantRecommendations.reduce((acc, day) => 
                acc + (day?.restaurants?.length || 0), 0);
            
            const images = await Promise.all(
                Array(totalRestaurants).fill().map(() => fetchRestaurants())
            );
            
            if (isMounted) {
                setRestaurantImages(images);
            }
        };

        loadImages();
        return () => { isMounted = false; };
    }, [restaurantRecommendations]);

    if (!restaurantRecommendations?.length) return null;

    return (
        <>
            {restaurantRecommendations.flatMap((day, i) =>
                (day?.restaurants || []).map((restaurant, idx) => {
                    const imageIndex = i * (day?.restaurants?.length || 0) + idx;
                    if (!restaurant) return null;

                    return (
                        <CardWrapper key={`${i}-${idx}`}>
                            <Link to={`https://www.google.com/maps/search/${encodeURIComponent(restaurant.name)}`} target="_blank">
                                <img 
                                    src={restaurantImages[imageIndex] || ''} 
                                    className="w-full h-40 md:h-48 object-cover rounded-t-xl" 
                                    alt={`${restaurant.name} restaurant`}
                                    loading='lazy'
                                />
                                <div className="p-4 md:p-6">
                                    <h3 className="text-lg md:text-xl font-bold mb-2">{restaurant.name}</h3>
                                    <p className="text-sm md:text-base text-muted-foreground mb-2">
                                        Cuisine: {restaurant.cuisine}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-1 text-sm md:text-base">
                                            <DollarSign className="w-4 h-4" />
                                            {restaurant.cost}
                                        </span>
                                        <span className="flex items-center gap-1 text-yellow-500">
                                            <Star className="w-4 h-4 fill-current" />
                                            {restaurant.rating}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </CardWrapper>
                    );
                })
            )}
        </>
    );
});

const BudgetSection = memo(({ budgetOverview }) => (
    <CardWrapper>
        <div className="p-4 md:p-8">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                <h3 className="text-xl md:text-2xl font-bold">Budget Overview</h3>
            </div>
            <div className="space-y-3 md:space-y-4">
                {[
                    { label: 'Estimated Food Cost', value: budgetOverview?.estimatedFoodCost },
                    { label: 'Miscellaneous Expenses', value: budgetOverview?.miscellaneousExpenses },
                    { label: 'Total Attraction Cost', value: budgetOverview?.totalAttractionCost },
                    { label: 'Total Hotel Cost', value: budgetOverview?.totalHotelCost }
                ].map(item => (
                    <div key={item.label} className="flex items-center justify-between p-2 md:p-3 rounded-lg hover:bg-gray-50">
                        <span className="text-sm md:text-base text-muted-foreground">{item.label}</span>
                        <div className="flex items-center gap-1 text-base md:text-lg font-semibold text-muted-foreground">
                            <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                            {isNaN(Number(item.value)) ? 'N/A' : item.value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </CardWrapper>
));

export const HeaderSection = memo(({ config, onSave }) => {
    const [isSaved, setIsSaved] = useState(false);
    useEffect(() => {
        setIsSaved(false);
    }, [config]);

    const handleSave = async () => {
        if (onSave) {
            await onSave();
            setIsSaved(true);
        }
    };

    return (
        <div className="relative mb-8 md:mb-12 rounded-2xl overflow-hidden m-4">
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
            <div className="absolute top-4 md:top-8 right-4 md:right-8 flex gap-2">
                {onSave && (
                    <Button onClick={handleSave} className="px-4 py-2 flex items-center gap-2">
                        {isSaved ? (
                            <HeartIcon className="w-4 h-4 text-red-500" />
                        ) : (
                            <Heart className="w-4 h-4" />
                        )}
                        {isSaved ? 'Trip Saved' : 'Save Trip'}
                    </Button>
                )}

                {/* TODO */}
                {/* <Link to={`/dashboard/trip/${config.userID}`}>
                    <Button variant="secondary">View Details</Button>
                </Link> */}
            </div>
        </div>
    );
});

// Main component
const TripData = ({ trip }) => {

    const { userId, getToken } = useAuth();
    const saveTrips = async () => {
        try {
            const token = await getToken({ template: "supabase" });
            await addTrips({ userId, token, data: trip });
        } catch (error) {
            console.error("Error saving trip:", error);
        }
    };

    const [activeSection, setActiveSection] = useState('itinerary');
    const {
        hotelOptions,
        weatherForecast,
        touristSpots,
        restaurantRecommendations,
        itineraryPlanner,
        budgetOverview
    } = trip.data;
    const { config } = trip;


    return (
        <div className="p-6 md:p-10">
            <HeaderSection config={config} onSave={saveTrips} />

            <div className="flex flex-wrap gap-3 md:gap-4 mb-8 pb-6 overflow-x-auto sticky top-0 z-10 pt-4">
                {['itinerary', 'hotels', 'weather', 'spots', 'restaurants', 'budget'].map((section) => (
                    <NavButton
                        key={section}
                        section={section}
                        label={section.charAt(0).toUpperCase() + section.slice(1)}
                        isActive={activeSection === section}
                        setActiveSection={setActiveSection}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {activeSection === 'itinerary' && <ItinerarySection itineraryPlanner={itineraryPlanner} />}
                {activeSection === 'hotels' && <HotelsSection hotelOptions={hotelOptions} />}
                {activeSection === 'weather' && <WeatherSection weatherForecast={weatherForecast} />}
                {activeSection === 'spots' && <SpotsSection touristSpots={touristSpots} />}
                {activeSection === 'restaurants' && <RestaurantsSection restaurantRecommendations={restaurantRecommendations} />}
                {activeSection === 'budget' && <BudgetSection budgetOverview={budgetOverview} />}
            </div>
        </div>
    );
};

export default TripData;
