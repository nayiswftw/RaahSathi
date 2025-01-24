
import { useState } from 'react';

function TripPlanner() {
  const [trips, setTrips] = useState([]);
  const [newTrip, setNewTrip] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTrips([...trips, newTrip]);
    setNewTrip({ destination: '', startDate: '', endDate: '', notes: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Trip Planner</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Destination"
              value={newTrip.destination}
              onChange={(e) => setNewTrip({...newTrip, destination: e.target.value})}
              className="p-2 border rounded"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={newTrip.startDate}
                onChange={(e) => setNewTrip({...newTrip, startDate: e.target.value})}
                className="p-2 border rounded"
              />
              <input
                type="date"
                value={newTrip.endDate}
                onChange={(e) => setNewTrip({...newTrip, endDate: e.target.value})}
                className="p-2 border rounded"
              />
            </div>
            <textarea
              placeholder="Notes"
              value={newTrip.notes}
              onChange={(e) => setNewTrip({...newTrip, notes: e.target.value})}
              className="p-2 border rounded"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Add Trip
            </button>
          </div>
        </form>

        <div className="grid gap-4">
          {trips.map((trip, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold">{trip.destination}</h2>
              <p className="text-gray-600">{trip.startDate} - {trip.endDate}</p>
              <p className="mt-2">{trip.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TripPlanner;