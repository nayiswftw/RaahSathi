import { GoogleGenerativeAI } from "@google/generative-ai";
// const {
//     GoogleGenerativeAI,
// } = require("@google/generative-ai");

// const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI("AIzaSyDSiQSRePzSqZmVhSRvpPVfV5tryl4DikA");

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
    responseSchema: {
        type: "object",
        properties: {
            location: {
                type: "string"
            },
            duration_days: {
                type: "integer"
            },
            group_size: {
                type: "integer"
            },
            budget: {
                type: "number"
            },
            hotels: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        hotel_name: {
                            type: "string"
                        },
                        address: {
                            type: "string"
                        },
                        price_per_night: {
                            type: "number"
                        },
                        image_url: {
                            type: "string"
                        },
                        geo_coordinates: {
                            type: "object",
                            properties: {
                                latitude: {
                                    type: "number"
                                },
                                longitude: {
                                    type: "number"
                                }
                            },
                            required: [
                                "latitude",
                                "longitude"
                            ]
                        },
                        rating: {
                            type: "number"
                        },
                        description: {
                            type: "string"
                        }
                    },
                    required: [
                        "hotel_name",
                        "address",
                        "price_per_night",
                        "geo_coordinates",
                        "rating"
                    ]
                }
            },
            rentals: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        rental_type: {
                            type: "string"
                        },
                        company_name: {
                            type: "string"
                        },
                        price_per_day: {
                            type: "number"
                        },
                        image_url: {
                            type: "string"
                        },
                        geo_coordinates: {
                            type: "object",
                            properties: {
                                latitude: {
                                    type: "number"
                                },
                                longitude: {
                                    type: "number"
                                }
                            },
                            required: [
                                "latitude",
                                "longitude"
                            ]
                        },
                        terms_and_conditions: {
                            type: "string"
                        }
                    },
                    required: [
                        "rental_type",
                        "company_name",
                        "price_per_day",
                        "geo_coordinates"
                    ]
                }
            },
            restaurants: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        restaurant_name: {
                            type: "string"
                        },
                        cuisine_type: {
                            type: "string"
                        },
                        address: {
                            type: "string"
                        },
                        price_range: {
                            type: "string"
                        },
                        image_url: {
                            type: "string"
                        },
                        geo_coordinates: {
                            type: "object",
                            properties: {
                                latitude: {
                                    type: "number"
                                },
                                longitude: {
                                    type: "number"
                                }
                            },
                            required: [
                                "latitude",
                                "longitude"
                            ]
                        },
                        rating: {
                            type: "number"
                        },
                        dish_description: {
                            type: "string"
                        }
                    },
                    required: [
                        "restaurant_name",
                        "cuisine_type",
                        "address",
                        "geo_coordinates",
                        "rating"
                    ]
                }
            },
            weather: {
                type: "object",
                properties: {
                    current_weather: {
                        type: "object",
                        properties: {
                            temperature: {
                                type: "number"
                            },
                            conditions: {
                                type: "string"
                            }
                        },
                        required: [
                            "temperature",
                            "conditions"
                        ]
                    },
                    hourly_forecast: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                time: {
                                    type: "string"
                                },
                                temperature: {
                                    type: "number"
                                },
                                conditions: {
                                    type: "string"
                                }
                            },
                            required: [
                                "time",
                                "temperature",
                                "conditions"
                            ]
                        }
                    },
                    daily_average_temperature: {
                        type: "number"
                    },
                    best_time_to_visit: {
                        type: "string"
                    }
                },
                required: [
                    "current_weather",
                    "hourly_forecast",
                    "daily_average_temperature",
                    "best_time_to_visit"
                ]
            },
            itinerary: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        day: {
                            type: "integer"
                        },
                        activities: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    place_name: {
                                        type: "string"
                                    },
                                    place_details: {
                                        type: "string"
                                    },
                                    image_url: {
                                        type: "string"
                                    },
                                    geo_coordinates: {
                                        type: "object",
                                        properties: {
                                            latitude: {
                                                type: "number"
                                            },
                                            longitude: {
                                                type: "number"
                                            }
                                        },
                                        required: [
                                            "latitude",
                                            "longitude"
                                        ]
                                    },
                                    ticket_price: {
                                        type: "number"
                                    },
                                    travel_time_minutes: {
                                        type: "number"
                                    },
                                    best_time_to_visit: {
                                        type: "string"
                                    }
                                },
                                required: [
                                    "place_name",
                                    "place_details",
                                    "geo_coordinates",
                                    "ticket_price"
                                ]
                            }
                        }
                    },
                    required: [
                        "day",
                        "activities"
                    ]
                }
            }
        },
        required: [
            "location",
            "duration_days",
            "group_size",
            "budget",
            "hotels",
            "weather",
            "itinerary"
        ]
    },
};

async function run(formData) {

    const location = formData.destination;
    const duration_days = formData.days;
    const budget = formData.budget;
    const group_size = formData.companions;

    const chatSession = model.startChat({
        generationConfig,
        history: [
        ],
    });

    const result = await chatSession.sendMessage(`Generate a travel plan for ${location} for ${duration_days} days for ${group_size} with a budget of ${budget} USD.`);
    const responseText = await result.response.text();
    console.log(responseText);
}
run( { destination: "Paris", days: 1, budget: 1000, companions: 2 } );

