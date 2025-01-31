import { HeaderSection } from '@/components/TripData';
import { Button } from '@/components/ui/button';
import { useDownloadTrip } from '@/hooks/useDownloadTrip';
import { getTrips, removeTrip } from '@/lib/supabaseRequests';
import { useAuth } from '@clerk/clerk-react';
import { Download, Loader2 } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';

export default function SavedTripsPage() {
    const { userId, getToken } = useAuth();
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const downloadTrip = useDownloadTrip();
    const loadSavedTrips = useCallback(async () => {
        if (!userId) return;

        try {
            setIsLoading(true);
            const token = await getToken({ template: 'supabase' });
            const data = await getTrips({ userId, token });
            setTrips(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load trips');
        } finally {
            setIsLoading(false);
        }
    }, [userId, getToken]);

    const deleteTrip = useCallback(async (tripId) => {
        try {
            const token = await getToken({ template: 'supabase' });
            await removeTrip({ userId, token, tripId });
            await loadSavedTrips();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete trip');
        }
    }, [userId, getToken, loadSavedTrips]);

    useEffect(() => {
        loadSavedTrips();
    }, [loadSavedTrips]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-8">
                <Loader2 className="animate-spin mr-2" />
                Loading your trips
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 p-4">{error}</div>;
    }

    return (
        <div>
            {trips.length === 0 ? (
                <div className="text-center text-gray-500 p-8">No saved trips found.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {trips.map((trip) => (
                        <div key={trip.id} className="bg-white/70 rounded-lg shadow-sm overflow-hidden">
                            <Link to={`/dashboard/trip/${trip.id}`}>
                                <HeaderSection config={trip.trip_data.config} />
                            </Link>
                            <div className="border-t p-4 sm:p-6">
                                <Button
                                    onClick={() => downloadTrip(trip.trip_data)}
                                    variant="secondary"
                                    className="w-full flex items-center justify-center gap-2 mb-2"
                                >
                                    <Download className="w-4 h-4" />
                                    Download PDF
                                </Button>
                                <Button
                                    onClick={() => deleteTrip(trip.id)}
                                    variant="destructive"
                                    className="w-full flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
                                >
                                    Delete Trip
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
