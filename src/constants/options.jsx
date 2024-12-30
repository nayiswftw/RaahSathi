

export const SelectCompanions =[
    {
        id: 1,
        title: "Solo Adventure",
        desc: "Embark on a journey of self-discovery",
        icon: "⌁",
        people: '1'
    },
    {
        id: 2,
        title: "Romantic Getaway",
        desc: "Experience the world together",
        icon: "⌁",
        people: '2'
    },
    {
        id: 3,
        title: "Family Fun",
        desc: "Create unforgettable memories with your loved ones",
        icon: "⌁",
        people: '3 to 5 People'
    },
    {
        id: 4,
        title: "Friends' Escapade",
        desc: "Thrilling adventures with your best pals",
        icon: "⌁",
        people: '5 to 10 People'
    }

]

export const SelectBudget =[
    {
        id: 1,
        title: "Budget-Friendly",
        desc: "Travel smart, spend less",
        icon: "⌁",
    },
    {
        id: 2,
        title: "Moderate",
        desc: "Balance comfort and cost",
        icon: "⌁",
    },
    {
        id: 3,
        title: "Luxury",
        desc: "Indulge in the lavish experiences",
        icon: "⌁",
    },

]

export const AI_PROMPT=`Generate a travel plan for the destination: {location} for {totalDays} days.
Traveler type: {traveller}, with a {budget} budget.
Provide a list of hotel options including the name, address, price, and the most recent image URL (ensure the URL is working), geo coordinates, rating, and descriptions.
Suggest a daily itinerary with place names, details, image URLs, geo coordinates, ticket pricing, ratings, and travel time for each location for {totalDays} days, including the best time to visit in a itinerary array.
Output in proper JSON format.`