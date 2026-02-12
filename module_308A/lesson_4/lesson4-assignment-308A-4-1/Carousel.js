import * as bootstrap from "bootstrap";
import { favourite } from "./index.js"; 

export function createCarouselItem(imgSrc, imgAlt, imgId) {
  const template = document.querySelector("#carouselItemTemplate");
  const clone = template.content.firstElementChild.cloneNode(true);

  const img = clone.querySelector("img");
  img.src = imgSrc;
  img.alt = imgAlt;

  // Handles Requirement: POST/DELETE logic when clicking heart
  const favBtn = clone.querySelector(".favourite-button");
  favBtn.addEventListener("click", () => {
    favourite(imgId);
  });

  return clone;
}

export function clear() {
  const carousel = document.querySelector("#carouselInner");
  while (carousel.firstChild) {
    carousel.removeChild(carousel.firstChild);
  }
}

export function appendCarousel(element) {
  const carousel = document.querySelector("#carouselInner");
  const activeItem = document.querySelector(".carousel-item.active");
  
  // Requirement: First item must be 'active' for Bootstrap to work
  if (!activeItem) element.classList.add("active");
  
  carousel.appendChild(element);
}

export function start() {
  const multipleCardCarousel = document.querySelector("#carouselExampleControls");
  // Initialize the Bootstrap Javascript component
  new bootstrap.Carousel(multipleCardCarousel, {
    interval: 5000,
    ride: true
  });
}