// Welcome Carousel JS
const carousel = document.querySelector(".carousel");
const slides = carousel.querySelectorAll(".slide");
const prevBtn = carousel.querySelector(".prev");
const nextBtn = carousel.querySelector(".next");

let currentIndex = 0;

// Function to show a specific slide
function showSlide(index) {
  // Wrap around if index goes out of bounds
  if (index < 0) {
    index = slides.length - 1;
  } else if (index >= slides.length) {
    index = 0;
  }

  // Hide all slides
  slides.forEach((slide) => {
    slide.style.display = "none";
  });

  // Show the selected slide
  slides[index].style.display = "block";

  // Update current index
  currentIndex = index;
}

// Initial display
showSlide(currentIndex);

// Button events (specific only to this carousel)
prevBtn.addEventListener("click", () => {
  showSlide(currentIndex - 1);
});

nextBtn.addEventListener("click", () => {
  showSlide(currentIndex + 1);
});

// Auto-slide every 4 seconds
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    showSlide(currentIndex + 1);
  }, 4000); // change every 4s
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Start auto-slide on page load
startAutoSlide();
