import axios from "axios";

const API_KEY = "live_ng56yseEUveSD4j2vA5mdPBdj3qPbd49gf5Yfv0RdNi1U3m9scZgmgtfQzMTE3FY";
axios.defaults.baseURL = "https://api.thecatapi.com/v1/";
axios.defaults.headers.common["x-api-key"] = API_KEY;

export async function fetchBreeds() {
    const response = await axios.get("breeds");
    return response.data;
}

export async function fetchImages(breedId, onProgress) {
    const response = await axios.get(`images/search?limit=10&breed_ids=${breedId}`, {
        onDownloadProgress: onProgress
    });
    return response.data;
}