// INDEX OR HOMEPAGE JS SECTION
function toggleMenu() {
  document.getElementById("menu").classList.toggle("active");
  document.querySelector(".hamburger").classList.toggle("active");
}

// Room Cards JS
const carouselTrack = document.querySelector(".carousel-track");
const carouselItems = document.querySelectorAll(".carousel-item");
const prevButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");

let currentSlide = 0;

function updateCarousel() {
  if (!carouselTrack || !carouselItems.length) {
    return;
  }
  carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
}

if (prevButton && nextButton && carouselTrack && carouselItems.length) {
  prevButton.addEventListener("click", () => {
    currentSlide =
      (currentSlide - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % carouselItems.length;
    updateCarousel();
  });

  updateCarousel();
}

// Booking Form Validation and Redirect
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".booking-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (form.checkValidity()) {
      // Collect values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const room = document.getElementById("room").value;
      const checkin = document.getElementById("checkin").value;
      const checkout = document.getElementById("checkout").value;
      const guests = document.getElementById("guests").value;

      // Redirect with query parameters
      const url = `payment.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&room=${encodeURIComponent(room)}&checkin=${encodeURIComponent(checkin)}&checkout=${encodeURIComponent(checkout)}&guests=${encodeURIComponent(guests)}`;
      window.location.href = url;
    } else {
      form.reportValidity();
    }
  });
});
// Mode number
const paymentMode = document.getElementById("paymentMode");
const creditCardField = document.getElementById("creditCardField");
const paypalField = document.getElementById("paypalField");
const gcashField = document.getElementById("gcashField");

paymentMode.addEventListener("change", function () {
  // Hide all fields first
  creditCardField.style.display = "none";
  paypalField.style.display = "none";
  gcashField.style.display = "none";

  // Show the selected one
  if (this.value === "Credit Card") {
    creditCardField.style.display = "block";
  } else if (this.value === "PayPal") {
    paypalField.style.display = "block";
  } else if (this.value === "GCash") {
    gcashField.style.display = "block";
  }
});
document
  .getElementById("payment-details")
  .addEventListener("submit", function (e) {
    if (!this.checkValidity()) {
      e.preventDefault(); // stop submission if invalid
      alert("Please fill in the required payment details.");
    }
  });

// Payment Page JS
// Room prices
const roomPrices = { standard: 800, deluxe: 1500, premium: 2500 };

function calculateDays(checkin, checkout) {
  const inDate = new Date(checkin);
  const outDate = new Date(checkout);
  const diffTime = outDate - inDate;
  return diffTime > 0 ? diffTime / (1000 * 60 * 60 * 24) : 0;
}

// Get values from query params
const params = new URLSearchParams(window.location.search);
const name = params.get("name") || "Guest";
const room = params.get("room") || "standard";
const guests = parseInt(params.get("guests") || "1", 10);
const checkin = params.get("checkin") || "";
const checkout = params.get("checkout") || "";

const days = calculateDays(checkin, checkout);
const pricePerNight = roomPrices[room] || 0;
const total = days * guests * pricePerNight;

const statusSymbol = document.getElementById("status-symbol");
const statusSymbol2 = document.getElementById("status-symbol2");

// Fill in details
document.getElementById("userName").textContent = name;
document.getElementById("roomType").textContent =
  room.charAt(0).toUpperCase() + room.slice(1) + " Room";
document.getElementById("guests").textContent = guests;
document.getElementById("checkin").textContent = checkin;
document.getElementById("checkout").textContent = checkout;
document.getElementById("total").textContent = total;

// Checkout button
document.getElementById("checkoutBtn").addEventListener("click", function () {
  const statusDiv = document.getElementById("status");
  const mode = document.getElementById("paymentMode").value;

  if (!mode) {
    alert("Please select a payment mode first.");
    statusSymbol.style.display = "block";
    statusSymbol2.style.display = "none";
    return;
  }

  statusSymbol.style.display = "none";
  statusSymbol2.style.display = "block";

  statusDiv.textContent = "Payment - Successful";
  statusDiv.classList.remove("pending");
  statusDiv.classList.add("success");

  alert(
    "Payment Successful!\n" +
      "Name: " +
      name +
      "\n" +
      "Room: " +
      room +
      "\n" +
      "Guests: " +
      guests +
      "\n" +
      "Days: " +
      days +
      "\n" +
      "Total: ₱" +
      total +
      "\n" +
      "Payment Mode: " +
      mode,
  );
});

// PAYMENT STATUS
const paymentDetails = document.getElementById("payment-details");
const thankYouMessage = document.getElementById("thankYouMessage");
const thankYouText = document.getElementById("thankYouText");
const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", function () {
  if (checkoutBtn.textContent === "Proceed to Checkout") {
    // First click: hide details and show thank-you
    const name = document.getElementById("userName").textContent.trim();
    paymentDetails.style.display = "none";
    thankYouText.textContent = `Thank you, ${name}! See you at our Hotel.`;
    thankYouMessage.style.display = "block";
    checkoutBtn.textContent = "Return to Homepage";
  } else {
    // Second click: redirect to homepage
    window.location.href = "index.html"; // replace with your actual homepage URL
  }
});
