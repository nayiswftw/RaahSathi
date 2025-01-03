import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { auth, db } from '@/lib/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Loader2 } from 'lucide-react';

function MyTrips() {
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const docSnaps = await getDocs(collection(db, 'TripData'));
                const userTrips = docSnaps.docs
                    .filter(doc => doc.data().userID === auth.currentUser.uid)
                    .map(doc => doc.data());

                setTrips(userTrips);
                console.log('Trips:', userTrips);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
                console.error('Error fetching trips:', err);
            } finally {
                setIsLoading(false);
            }
        };

        if (auth.currentUser) {
            fetchTrips();
        }
    }, []);

    if (error) {
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    const generatePDF = (trip) => {
        // Create a new document string
        let docContent = `
          ${trip?.config?.destination || 'Your Dream Destination'}
          Duration: ${trip?.config?.duration} Days
          Budget: ${trip?.config?.budget}
          People: ${trip?.config?.companion}
    
          ---- Itinerary ----
          ${trip?.data?.itineraryPlanner?.map(day => `
            ${day.day}
            ${day.activities?.map(activity => `- ${activity}`).join('\n')}
          `).join('\n\n')}
    
          ---- Hotels ----
          ${trip?.data?.hotelOptions?.map(hotel => `
            ${hotel.hotelName}
            Address: ${hotel.hotelAddress}
            Price per night: ${hotel.pricePerNight}
            Rating: ${hotel.rating}
          `).join('\n\n')}
    
          ---- Weather Forecast ----
          ${trip?.data?.weatherForecast?.map(day => `
            ${day.day}
            Condition: ${day.condition}
            Temperature: ${day.temperature}
          `).join('\n\n')}
    
          ---- Tourist Spots ----
          ${trip?.data?.touristSpots?.flatMap(day =>
            day.attractions?.map(attraction => `
              ${attraction.name}
              ${attraction.description}
              Cost: ${attraction.estimatedCost}
              Rating: ${attraction.rating}
            `).join('\n\n')
        ).join('\n\n')}
    
          ---- Restaurants ----
          ${trip?.data?.restaurantRecommendations?.flatMap(day =>
            day.restaurants?.map(restaurant => `
              ${restaurant.name}
              Cuisine: ${restaurant.cuisine}
              Cost: ${restaurant.cost}
              Rating: ${restaurant.rating}
            `).join('\n\n')
        ).join('\n\n')}
    
          ---- Budget Overview ----
          Estimated Food Cost: ${trip?.data?.budgetOverview?.estimatedFoodCost}
          Miscellaneous Expenses: ${trip?.data?.budgetOverview?.miscellaneousExpenses}
          Total Attraction Cost: ${trip?.data?.budgetOverview?.totalAttractionCost}
          Total Hotel Cost: ${trip?.data?.budgetOverview?.totalHotelCost}
        `;

        // Create a Blob from the content
        const blob = new Blob([docContent], { type: 'text/plain' });

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${trips?.config?.destination || 'trip'}-itinerary.pdf`);

        // Trigger download
        document.body.appendChild(link);
        link.click();

        // Cleanup
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
    };
    return (
        <div className="p-4 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">My Trips</h1>
                    <Link to={'/create-trip'}>
                        <Button variant="outline">Create New Trip</Button>
                    </Link>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                ) : trips.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No trips found. Create your first trip!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trips.map((trip, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle>{trip?.config?.destination || 'Unnamed Trip'}</CardTitle>
                                    <CardDescription>
                                        {trip?.config?.duration} days • {trip?.config?.companion}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button onClick={() => generatePDF(trip)} className="w-full">
                                        Download Trip
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyTrips;
