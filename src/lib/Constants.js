export const features = [
    {   
        title: "Hotels",
        text: "Stay at the best hotels around the world for the best prices.",
    },
    {
        title: "Itineraries",
        text: "Plan your trip with detailed itineraries and travel guides.",
    },
    {
        title: "Weather",
        text: "Get accurate weather forecasts for your travel dates.",
    },
    {
        title: "Restaurants",
        text: "Snag a coveted table at the hottest restaurants.",
    },
    {
        title: "Budget",
        text: "Manage your travel budget with detailed cost breakdowns.",
    },
    {
        title: "Tours",
        text: "Get an insider’s perspective on any location or attraction.",
    },
];


export const AI_PROMPT=`
Please generate a strict JSON response for a trip to the {destination} for {days} days with a {companions} and a budget of {budget} USD. The output should include the following sections: 
1. Hotel Options: Provide 3-5 hotels with 'hotelName', 'hotelAddress', 'pricePerNight', and 'rating'.
2. Weather Forecast: Provide a day-by-day forecast for 'duration' with 'day', 'condition', and 'temperature'. 
3. Tourist Spots: Provide 3-5 popular attractions or activities per day, including 'name', 'description', 'estimatedCost', and 'rating'. 
4. Restaurant Recommendations: Provide 3 restaurants per day with 'name', 'cuisine', 'cost', and 'rating'. 
5. Itinerary Planner: Provide a detailed day-by-day plan with 'day' and 'activities'. 
6. Budget Overview: Summarize the costs with 'totalHotelCost', 'totalAttractionCost', 'estimatedFoodCost', 'miscellaneousExpenses', and 'totalEstimatedCost'.
`