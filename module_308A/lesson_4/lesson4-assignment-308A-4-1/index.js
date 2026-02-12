import * as Carousel from "./Carousel.js";
import { fetchBreeds, fetchImages } from "./api.js";
import { updateProgressBar, setWorkingCursor } from "./helpers.js";

const breedSelect = document.getElementById("breedSelect");

async function initialLoad() {
    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
    });
}

breedSelect.addEventListener("change", async () => {
    setWorkingCursor(true);
    const images = await fetchImages(breedSelect.value, updateProgressBar);
    
    Carousel.clear();
    images.forEach(img => {
        const item = Carousel.createCarouselItem(img.url, "cat", img.id);
        Carousel.appendCarousel(item);
    });
    
    Carousel.start();
    setWorkingCursor(false);
});

initialLoad();

// Add this to the bottom of index.js
export async function favourite(imgId) {
  try {
    const response = await axios.get("favourites");
    const existing = response.data.find(f => f.image_id === imgId);
    
    if (existing) {
      await axios.delete(`favourites/${existing.id}`);
      console.log("Removed from favourites");
    } else {
      await axios.post("favourites", { image_id: imgId });
      console.log("Added to favourites");
    }
  } catch (error) {
    console.error("Favourite toggle failed:", error);
  }
}