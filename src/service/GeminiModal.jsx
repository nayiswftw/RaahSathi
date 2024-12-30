import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: "Generate a travel plan for the destination: {location} for {totalDays} days.\nTraveler type: {traveller}, with a {budget} budget.\nProvide a list of hotel options including the name, address, price, and the most recent image URL (ensure the URL is working), geo coordinates, rating, and descriptions.\nSuggest a daily itinerary with place names, details, image URLs, geo coordinates, ticket pricing, ratings, and travel time for each location for {totalDays} days, including the best time to visit in a itinerary array.\nOutput in proper JSON format.",
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
                { text: "Generate a travel plan for the destination: Dhaka Division for 3 days.\nTraveler type: 3,  with a friendly budget.\nProvide a list of hotel options including the name, address, price, and the most recent image URL (ensure the URL is working), geo coordinates, rating, and descriptions.\nSuggest a daily itinerary with place names, details, image URLs, geo coordinates, ticket pricing, ratings, and travel time for each location for 3 days, including the best time to visit in a itinerary array.\nOutput in proper JSON format.\n" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"destination\": \"Dhaka Division, Bangladesh\",\n  \"totalDays\": 3,\n  \"travelerType\": \"Group of 3\",\n  \"budget\": \"Friendly\",\n  \"hotels\": [\n    {\n      \"name\": \"Pan Pacific Sonargaon Dhaka\",\n      \"address\": \"107 Kazi Nazrul Islam Ave, Dhaka 1215, Bangladesh\",\n      \"price\": \"100-200 USD/night\",\n      \"imageUrl\": \"https://lh3.googleusercontent.com/p/AF1QipO6oC23l-r5tMjdk-5Quc9o7w979eL_r6sN1uE=w296-h202-n-k-no-v1\",\n      \"geoCoordinates\": {\n        \"latitude\": 23.732188,\n        \"longitude\": 90.417699\n      },\n      \"rating\": 4.5,\n      \"description\": \"Luxury hotel with a prime location, offering a range of amenities and dining options.\"\n    },\n    {\n      \"name\": \"The Westin Dhaka\",\n      \"address\": \"Plot-01, Road-45, Gulshan South Avenue, Gulshan 2, Dhaka 1212, Bangladesh\",\n      \"price\": \"80-180 USD/night\",\n      \"imageUrl\": \"https://lh3.googleusercontent.com/p/AF1QipOW9Ctt-zY_rV0C9aGmQ491K9C3mXLwS_89hN0=w296-h202-n-k-no-v1\",\n      \"geoCoordinates\": {\n        \"latitude\": 23.78637,\n        \"longitude\": 90.40678\n      },\n      \"rating\": 4.4,\n      \"description\": \"Modern hotel with stylish rooms, a rooftop pool, and several dining venues.\"\n    },\n    {\n      \"name\": \"Long Beach Suites Dhaka\",\n      \"address\": \"Plot # SE(F)-2, Road # 130, Gulshan North Ave, Dhaka 1212, Bangladesh\",\n      \"price\": \"60-120 USD/night\",      \n      \"imageUrl\": \"https://lh3.googleusercontent.com/p/AF1QipNThwM9W-gJ_c-rK_xZI6fU0p2g94rD-ZtJ5vU=w296-h202-n-k-no-v1\",\n      \"geoCoordinates\": {\n        \"latitude\": 23.7916134,\n        \"longitude\": 90.4107075\n      },\n      \"rating\": 4.0,\n      \"description\": \"Comfortable suites with kitchenettes, ideal for longer stays and families.\"\n    }\n  ],\n  \"itinerary\": [\n    {\n      \"day\": 1,\n      \"bestTimeToVisit\": \"Morning\",\n      \"places\": [\n        {\n          \"name\": \"Ahsan Manzil\",\n          \"details\": \"Historic palace with Mughal architecture.\",\n          \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/f/f1/Ahsan_Manzil_Main_Gate.JPG\",\n          \"geoCoordinates\": {\n            \"latitude\": 23.71816,\n            \"longitude\": 90.40315\n          },\n          \"ticketPrice\": \"200 BDT\",\n          \"rating\": 4.3,\n          \"travelTime\": \"30 minutes from city center\"\n        },\n        {\n          \"name\": \"Lalbag Fort\",\n          \"details\": \"17th-century Mughal fort complex.\",\n          \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/6/65/Lalbagh_Fort%2C_Dhaka.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 23.7104,\n            \"longitude\": 90.3967\n          },\n          \"ticketPrice\": \"200 BDT\",\n          \"rating\": 4.4,\n          \"travelTime\": \"15 minutes from Ahsan Manzil\"\n        }\n      ]\n    },\n    {\n      \"day\": 2,\n      \"bestTimeToVisit\": \"Daytime\",\n      \"places\": [\n        {\n          \"name\": \"Sadarghat River Port\",\n          \"details\": \"Busy river port with ferry services.\",\n          \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/0/08/Buriganga_River_at_Sadarghat.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 23.7122,\n            \"longitude\": 90.4076\n          },\n          \"ticketPrice\": \"Varies depending on destination\",\n          \"rating\": 4.0,\n          \"travelTime\": \"20 minutes from Lalbag Fort\"\n        },\n        {\n          \"name\": \"Star Mosque\",\n          \"details\": \"Ornate mosque with intricate tilework.\",\n          \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/e/e1/Star_Mosque%2C_Dhaka.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 23.7187,\n            \"longitude\": 90.3976\n          },\n          \"ticketPrice\": \"Free\",\n          \"rating\": 4.2,\n          \"travelTime\": \"20 minutes from Sadarghat\"\n        }\n      ]\n    },\n    {\n      \"day\": 3,\n      \"bestTimeToVisit\": \"Anytime\",\n      \"places\": [\n        {\n          \"name\": \"National Museum\",\n          \"details\": \"Museum showcasing Bangladeshi art, history, and culture.\",\n          \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/8/85/Bangladesh_National_Museum_Shahbag%2C_Dhaka.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 23.7405,\n            \"longitude\": 90.3931\n          },\n          \"ticketPrice\": \"200 BDT\",\n          \"rating\": 4.1,\n          \"travelTime\": \"30 minutes from city center\"\n        },\n\n        {\n          \"name\": \" Liberation War Museum\",\n          \"details\": \"Museum dedicated to the Bangladesh Liberation War.\",\n          \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/7/76/Liberation_War_Museum%2C_Dhaka.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 23.737633,\n            \"longitude\": 90.389391\n          },\n          \"ticketPrice\": \"100 BDT\",\n          \"rating\": 4.5,\n          \"travelTime\": \"10 minutes from National Museum\"\n        }\n\n\n\n      ]\n    }\n  ]\n}\n```" },
            ],
        },
    ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
