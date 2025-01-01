import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: "You are a professional and detail-oriented AI Travel Assistant. Your task is to create a personalized trip plan based on the provided input variables. Your response must adhere strictly to JSON format and should include the following details:",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Please generate a strict JSON response for a trip to the `New Delhi` for `3` days with a `Family` and a budget of `300` USD. The output should include the following sections: \n1. Hotel Options: Provide 3-5 hotels with `hotelName`, `hotelAddress`, `pricePerNight`, and `rating`.\n2. Weather Forecast: Provide a day-by-day forecast for `duration` with `day`, `condition`, and `temperature`. \n3. Tourist Spots: Provide 3-5 popular attractions or activities per day, including `name`, `description`, `estimatedCost`, and `rating`. \n4. Restaurant Recommendations: Provide 3 restaurants per day with `name`, `cuisine`, `cost`, and `rating`. \n5. Itinerary Planner: Provide a detailed day-by-day plan with `day` and `activities`. \n6. Budget Overview: Summarize the costs with `totalHotelCost`, `totalAttractionCost`, `estimatedFoodCost`, `miscellaneousExpenses`, and `totalEstimatedCost`." },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"tripDetails\": {\n    \"destination\": \"New Delhi\",\n    \"duration\": 3,\n    \"travelers\": \"Family\",\n    \"budget\": 300\n  },\n  \"hotelOptions\": [\n    {\n      \"hotelName\": \"Bloomrooms @ New Delhi Railway Station\",\n      \"hotelAddress\": \"Near New Delhi Railway Station, Paharganj\",\n      \"pricePerNight\": 25,\n      \"rating\": 4.0\n    },\n    {\n      \"hotelName\": \"Hotel City Star\",\n      \"hotelAddress\": \"Main Bazar, Paharganj\",\n      \"pricePerNight\": 20,\n      \"rating\": 3.8\n    },\n    {\n      \"hotelName\": \"Zostel Delhi\",\n      \"hotelAddress\": \"Near New Delhi Railway Station, Paharganj\",\n      \"pricePerNight\": 15,\n      \"rating\": 4.2\n    }\n  ],\n  \"weatherForecast\": [\n    {\n      \"day\": \"Day 1\",\n      \"condition\": \"Sunny\",\n      \"temperature\": \"32°C\"\n    },\n    {\n      \"day\": \"Day 2\",\n      \"condition\": \"Partly Cloudy\",\n      \"temperature\": \"30°C\"\n    },\n    {\n      \"day\": \"Day 3\",\n      \"condition\": \"Cloudy\",\n      \"temperature\": \"28°C\"\n    }\n  ],\n  \"touristSpots\": [\n    {\n      \"day\": \"Day 1\",\n      \"attractions\": [\n        {\n          \"name\": \"Red Fort\",\n          \"description\": \"Historic fort complex\",\n          \"estimatedCost\": 5,\n          \"rating\": 4.5\n        },\n        {\n          \"name\": \"Jama Masjid\",\n          \"description\": \"Largest mosque in India\",\n          \"estimatedCost\": 2,\n          \"rating\": 4.6\n        },\n        {\n          \"name\": \"Chandni Chowk\",\n          \"description\": \"Bustling market area\",\n          \"estimatedCost\": 10, \n          \"rating\": 4.2\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 2\",\n      \"attractions\": [\n        {\n          \"name\": \"Humayun's Tomb\",\n          \"description\": \"Mughal-era tomb\",\n          \"estimatedCost\": 5,\n          \"rating\": 4.4\n        },\n        {\n          \"name\": \"Qutub Minar\",\n          \"description\": \"Tallest brick minaret\",\n          \"estimatedCost\": 5,\n          \"rating\": 4.7\n        },\n        {\n          \"name\": \"Lotus Temple\",\n          \"description\": \"Baháʼí House of Worship\",\n          \"estimatedCost\": 2,\n          \"rating\": 4.3\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 3\",\n      \"attractions\": [\n        {\n          \"name\": \"India Gate\",\n          \"description\": \"War memorial\",\n          \"estimatedCost\": 2,\n          \"rating\": 4.6\n        },\n        {\n          \"name\": \"Rashtrapati Bhavan\",\n          \"description\": \"Presidential residence\",\n          \"estimatedCost\": 5,\n          \"rating\": 4.5\n        },\n        {\n          \"name\": \"National Museum\",\n          \"description\": \"Museum of Indian art and artifacts\",\n          \"estimatedCost\": 5, \n          \"rating\": 4.4\n        }\n      ]\n    }\n  ],\n  \"restaurantRecommendations\": [\n    {\n      \"day\": \"Day 1\",\n      \"restaurants\": [\n        {\n          \"name\": \"Paranthe Wali Gali\",\n          \"cuisine\": \"Indian\",\n          \"cost\": 10,\n          \"rating\": 4.0\n        },\n        {\n          \"name\": \"Al Jawahar\",\n          \"cuisine\": \"Mughlai\",\n          \"cost\": 15,\n          \"rating\": 4.2\n        },\n        {\n          \"name\": \"Karim's\",\n          \"cuisine\": \"Mughlai\",\n          \"cost\": 12,\n          \"rating\": 4.5\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 2\",\n      \"restaurants\": [\n         {\n          \"name\": \"Bukhara\",\n          \"cuisine\": \"North Indian\",\n          \"cost\": 25,\n          \"rating\": 4.7\n        },\n        {\n          \"name\": \"Dum Pukht\",\n          \"cuisine\": \"Awadhi\",\n          \"cost\": 20,\n          \"rating\": 4.5\n        },\n        {\n          \"name\": \"Indian Rose\",\n          \"cuisine\": \"Indian\",\n          \"cost\": 15,\n          \"rating\": 4.2\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 3\",\n      \"restaurants\": [\n        {\n          \"name\": \"The Connaught\",\n          \"cuisine\": \"Multi-cuisine\",\n          \"cost\": 30,\n          \"rating\": 4.6\n        },\n        {\n          \"name\": \"Le Cirque\",\n          \"cuisine\": \"French\",\n          \"cost\": 40,\n          \"rating\": 4.8\n        },\n        {\n          \"name\": \"Pinch of Spice\",\n          \"cuisine\": \"Indian\",\n          \"cost\": 18,\n          \"rating\": 4.3\n        }\n      ]\n    }\n  ],\n  \"itineraryPlanner\": [\n    {\n      \"day\": \"Day 1\",\n      \"activities\": [\n        \"Arrival & Check-in to Hotel\",\n        \"Visit Red Fort\",\n        \"Lunch at Paranthe Wali Gali\",\n        \"Visit Jama Masjid\",\n        \"Explore Chandni Chowk\",\n        \"Dinner at Al Jawahar\"\n      ]\n    },\n    {\n      \"day\": \"Day 2\",\n      \"activities\": [\n        \"Visit Humayun's Tomb\",\n        \"Lunch at Bukhara\",\n        \"Visit Qutub Minar\",\n        \"Visit Lotus Temple\",\n        \"Dinner at Dum Pukht\"\n      ]\n    },\n    {\n      \"day\": \"Day 3\",\n      \"activities\": [\n        \"Visit India Gate\",\n        \"Visit Rashtrapati Bhavan\",\n        \"Lunch at The Connaught\",\n        \"Visit National Museum\",\n        \"Dinner at Pinch of Spice\",\n        \"Departure\"\n      ]\n    }\n  ],\n  \"budgetOverview\": {\n    \"totalHotelCost\": 75,\n    \"totalAttractionCost\": 44,\n    \"estimatedFoodCost\": 90,\n    \"miscellaneousExpenses\": 21,\n    \"totalEstimatedCost\": 230\n  }\n}\n```" },
            ],
        },
    ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());

