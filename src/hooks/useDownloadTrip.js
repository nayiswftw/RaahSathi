import { useCallback } from 'react';
import { jsPDF } from 'jspdf';

export function useDownloadTrip() {
  const downloadTrip = useCallback((tripData) => {
    const doc = new jsPDF();
    const margin = 20;
    let yPos = margin;
    
    // Title
    doc.setFontSize(20);
    doc.text(`Trip to ${tripData.config.destination}`, margin, yPos);
    yPos += 10;

    // Trip details
    doc.setFontSize(12);
    doc.text(`Duration: ${tripData.config.duration} days`, margin, yPos += 10);
    doc.text(`Budget: ${tripData.config.budget}`, margin, yPos += 7);
    doc.text(`Travelers: ${tripData.config.companion}`, margin, yPos += 7);
    yPos += 10;

    // Weather Forecast
    doc.setFontSize(16);
    doc.text("Weather Forecast", margin, yPos += 10);
    doc.setFontSize(12);
    tripData.data.weatherForecast?.forEach((day) => {
      doc.text(`${day.day}: ${day.condition}, ${day.temperature}`, margin, yPos += 7);
    });
    yPos += 10;

    // Tourist Spots
    doc.setFontSize(16);
    doc.text("Tourist Spots", margin, yPos += 10);
    doc.setFontSize(12);
    tripData.data.touristSpots?.forEach((day) => {
      doc.text(`${day.day}:`, margin, yPos += 10);
      day.attractions?.forEach((spot) => {
        if (yPos > 250) {
          doc.addPage();
          yPos = margin;
        }
        doc.text(`• ${spot.name}`, margin, yPos += 7);
        doc.text(`  Description: ${spot.description}`, margin, yPos += 7);
        doc.text(`  Cost: $${spot.estimatedCost}, Rating: ${spot.rating}`, margin, yPos += 7);
      });
      yPos += 5;
    });

    // Restaurants
    if (yPos > 250) {
      doc.addPage();
      yPos = margin;
    }
    doc.setFontSize(16);
    doc.text("Restaurant Recommendations", margin, yPos += 10);
    doc.setFontSize(12);
    tripData.data.restaurantRecommendations?.forEach((day) => {
      doc.text(`${day.day}:`, margin, yPos += 10);
      day.restaurants?.forEach((restaurant) => {
        if (yPos > 250) {
          doc.addPage();
          yPos = margin;
        }
        doc.text(`• ${restaurant.name}`, margin, yPos += 7);
        doc.text(`  Cuisine: ${restaurant.cuisine}`, margin, yPos += 7);
        doc.text(`  Cost: $${restaurant.cost}, Rating: ${restaurant.rating}`, margin, yPos += 7);
      });
      yPos += 5;
    });

    // Itinerary
    if (yPos > 250) {
      doc.addPage();
      yPos = margin;
    }
    doc.setFontSize(16);
    doc.text("Itinerary", margin, yPos += 10);
    doc.setFontSize(12);
    tripData.data.itineraryPlanner?.forEach((day) => {
      doc.text(`${day.day}:`, margin, yPos += 10);
      day.activities?.forEach((activity) => {
        if (yPos > 250) {
          doc.addPage();
          yPos = margin;
        }
        doc.text(`• ${activity}`, margin + 5, yPos += 7);
      });
      yPos += 5;
    });

    // Hotels
    if (yPos > 250) {
      doc.addPage();
      yPos = margin;
    }
    doc.setFontSize(16);
    doc.text("Hotels", margin, yPos += 10);
    doc.setFontSize(12);
    tripData.data.hotelOptions?.forEach((hotel) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = margin;
      }
      doc.text(`• ${hotel.hotelName}`, margin, yPos += 7);
      doc.text(`  Address: ${hotel.hotelAddress}`, margin, yPos += 7);
      doc.text(`  Price: $${hotel.pricePerNight}/night, Rating: ${hotel.rating}`, margin, yPos += 7);
    });

    // Budget Overview
    if (yPos > 250) {
      doc.addPage();
      yPos = margin;
    }
    doc.setFontSize(16);
    doc.text("Budget Overview", margin, yPos += 15);
    doc.setFontSize(12);
    const budget = tripData.data.budgetOverview;
    doc.text(`Hotel Costs: $${budget.totalHotelCost}`, margin, yPos += 7);
    doc.text(`Food Costs: $${budget.estimatedFoodCost}`, margin, yPos += 7);
    doc.text(`Attraction Costs: $${budget.totalAttractionCost}`, margin, yPos += 7);
    doc.text(`Miscellaneous: $${budget.miscellaneousExpenses}`, margin, yPos += 7);
    doc.text(`Total Estimated Cost: $${budget.totalEstimatedCost}`, margin, yPos += 7);

    // Save PDF
    doc.save(`trip-to-${tripData.config.destination}.pdf`);
  }, []);

  return downloadTrip;
}

