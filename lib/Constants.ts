import { CalculatorIcon, Calendar1Icon, CarIcon, CloudAlert, DollarSign, FileTextIcon, ForkKnife, GlobeIcon, HotelIcon, HouseIcon, MapPinIcon, UtensilsIcon } from "lucide-react";


export const features = [
    {
        title: "Smart Destination Guide",
        description: "AI-powered recommendations for tourist spots tailored to your interests",
        icon: MapPinIcon,
    },
    {
        title: "Hotel Finder",
        description: "Find and book the perfect accommodation within your budget",
        icon: HotelIcon,
    },
    {
        title: "Restaurant Discovery",
        description: "Explore local cuisine and find top-rated restaurants",
        icon: UtensilsIcon,
    },
    {
        title: "Transportation Planning",
        description: "Seamless transportation options and booking",
        icon: CarIcon,
    },
    {
        title: "Budget Overview",
        description: "Keep track of your expenses and plan within your budget",
        icon: CalculatorIcon,
    },
    {
        title: "Trip Export",
        description: "Download your entire itinerary as a PDF",
        icon: FileTextIcon,
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