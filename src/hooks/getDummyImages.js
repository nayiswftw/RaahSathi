export const fetchSpots = async () => {
    const url = "https://api.apify.com/v2/datasets/yc1MrfmbSt5PSnYN7/items?fields=imageUrl";
    return await fetchImages(url);
};

export const fetchRestaurants = async () => {
    const url = "https://api.apify.com/v2/datasets/WebatNFQacu3cazJA/items?fields=imageUrl";
    return await fetchImages(url);
};

export const fetchHotels = async () => {
    const url = "https://api.apify.com/v2/datasets/aughTXiyP6Zaog61v/items?fields=imageUrl";
    return await fetchImages(url);
};

const fetchImages = async (url) => {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        const randomIndex = Math.floor(Math.random() * result.length);
        return result[randomIndex].imageUrl;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Usage:
// fetchHotels().then(url => console.log(url)).catch(err => console.error(err));
// fetchHotels().then(url => console.log(url))