// All these data is stored in local storage
// and will be used to populate the car comparison boxes
// and the car list on the main page.   
//All are dummy data

const carData = [
{
id: 1,
brand: "Tesla",
model: "Model 3 RWD",
price: 42000,
range: 272,
chargingTime: 0.5, // 30 minutes
battery: 57.5,
efficiency: 240,
fastCharging: 170,
cargoSpace: 19.8,
image: "images/car models/Tesla Model 3.jpg",
"0to60": 5.8
},
{
id: 2,
brand: "Nissan",
model: "Leaf",
price: 28000,
range: 150,
chargingTime: 1, 
battery: 40, 
efficiency: 300, 
fastCharging: 50, 
cargoSpace: 20, 
image: "images/car models/Nissan Leaf.jpg",
"0to60": 9.5 
},
{
id: 3,
brand: "BMW",
model: "i3",
price: 44000,
range: 153,
chargingTime: 0.75, 
battery: 42, 
efficiency: 250, 
fastCharging: 60, 
cargoSpace: 18, 
image: "images/car models/BMW i3.jpg",
"0to60": 9.0 
},
{
id: 4,
brand: "Tesla",
model: "Model Y",
price: 48000,
range: 326,
chargingTime: 0.5, 
battery: 75, 
efficiency: 260, 
fastCharging: 170, 
cargoSpace: 30, 
image: "images/car models/Tesla Model Y.jpg",
"0to60": 4.5 
},
{
id: 5,
brand: "Kia",
model: "EV6",
price: 42000,
range: 310,
chargingTime: 1, 
battery: 77, 
efficiency: 230, 
fastCharging: 100, 
cargoSpace: 25, 
image: "images/car models/Kia EV6.jpg",
"0to60": 7.0 
},
{
id: 6,
brand: "Hyundai",
model: "Kona Electric",
price: 38000,
range: 258,
chargingTime: 1, 
battery: 64, 
efficiency: 210, 
fastCharging: 75, 
cargoSpace: 20, 
image: "images/car models/Hyundai Kona Electric.jpg",
"0to60": 8.5 
},
{
id: 7,
brand: "Chevrolet",
model: "Bolt EV",
price: 32000,
range: 259,
chargingTime: 1, 
battery: 66,
efficiency: 240, 
fastCharging: 55, 
cargoSpace: 17, 
image: "images/car models/Chevy Bolt.jpg",
"0to60": 8.0 
},
{
id: 8,
brand: "Ford",
model: "Mustang Mach-E",
price: 43000,
range: 305,
chargingTime: 0.75, 
battery: 70, 
efficiency: 245, 
fastCharging: 150, 
cargoSpace: 29, 
image: "images/car models/Ford Mustang Mach-E.jpg",
"0to60": 6.3 
},
{
id: 9,
brand: "Volkswagen",
model: "ID.4",
price: 41000,
range: 260,
chargingTime: 1, 
battery: 77, 
efficiency: 240, 
fastCharging: 100, 
cargoSpace: 25, 
image: "images/car models/Volkswagen_ID4.jpg",
"0to60": 8.0 
},
{
id: 10,
brand: "Audi",
model: "e-tron",
price: 65000,
range: 222,
chargingTime: 1, 
battery: 71,
efficiency: 270,
fastCharging: 150,
cargoSpace: 28.5,
image: "images/car models/Audi e-tron.jpg",
"0to60": 5.5
}
];
localStorage.setItem("evCars", JSON.stringify(carData));

document.addEventListener("DOMContentLoaded", function () {
const storedCars = JSON.parse(localStorage.getItem("evCars")) || [];

function showPopup(car) {
const popupContent = `
<div class="popup-content">
    <h2>${car.brand} ${car.model}</h2>
    <table>
        <tr><td><strong>Price:</strong></td><td>$${car.price.toLocaleString()}</td></tr>
        <tr><td><strong>Battery (kWh):</strong></td><td>${car.battery !== null ? car.battery : "N/A"}</td></tr>
        <tr><td><strong>Range (EPA):</strong></td><td>${car.range} miles</td></tr>
        <tr><td><strong>0–60 mph:</strong></td><td>${car["0to60"] !== null ? car["0to60"] + " sec" : "N/A"}</td></tr>
        <tr><td><strong>Efficiency:</strong></td><td>${car.efficiency !== null ? car.efficiency + " Wh/mi" : "N/A"}</td></tr>
        <tr><td><strong>Fast Charging:</strong></td><td>${car.fastCharging !== null ? car.fastCharging + " kW" : "N/A"}</td></tr>
        <tr><td><strong>Cargo Space:</strong></td><td>${car.cargoSpace !== null ? car.cargoSpace + " cu ft" : "N/A"}</td></tr>
    </table>
    <button class="close-popup">Close</button>
</div>
`;
const popup = document.createElement("div");
popup.className = "popup";
popup.innerHTML = popupContent;
document.body.appendChild(popup);
const closeButton = popup.querySelector(".close-popup");
closeButton.addEventListener("click", function() {
popup.remove();
});
}

const carListContainer = document.querySelector(".car-list");
const searchBtn = document.querySelector(".filter-search[type='submit']");
const resetBtn = document.querySelector(".filter-search[type='reset']");

// Function to render filtered cars
function renderCars(filteredCars) {
carListContainer.innerHTML = ""; // Clear existing content
// If no cars, fallback to showing at least one car (first in the list)
if (filteredCars.length === 0 && storedCars.length > 0) {
filteredCars = [storedCars[0]];
}
filteredCars.forEach(car => {
const carCard = document.createElement("div");
carCard.className = "car-card";
carCard.innerHTML = `
    <center><img src="${car.image}" alt="${car.brand} ${car.model}"></center>
    <h3>${car.brand} ${car.model}</h3>
    <table>
        <tr><td><strong>Brand:</strong></td><td>${car.brand}</td></tr>
        <tr><td><strong>Price:</strong></td><td>$${car.price.toLocaleString()}</td></tr>
        <tr><td><strong>Range:</strong></td><td>${car.range} miles</td></tr>
        <tr><td><strong>Charging Time:</strong></td><td>${(car.chargingTime * 60)} min</td></tr>
    </table>
`;
carCard.addEventListener("click", function() {
    showPopup(car);
});
carListContainer.appendChild(carCard);
});
}

// Filter functionality
function getFilteredCars() {
const budget = document.querySelector("select[name='budget']").value;
const range = document.querySelector("select[name='range']").value;
const brand = document.querySelector("select[name='brand']").value;
return storedCars.filter(car => {
const priceOk = !budget || car.price <= parseInt(budget);
const rangeOk = !range || car.range >= parseInt(range);
const brandOk = !brand || car.brand === brand;
return priceOk && rangeOk && brandOk;
});
}

searchBtn.addEventListener("click", function (e) {
e.preventDefault();
renderCars(getFilteredCars());
});

resetBtn.addEventListener("click", function (e) {
e.preventDefault();
document.querySelector("form").reset();
renderCars(storedCars);
});

// Initialize the list with all cars
renderCars(storedCars);
});

// New code: Dropdown-based car selection in compare boxes
const storedCars = JSON.parse(localStorage.getItem("evCars")) || [];
const comparisonContainer = document.querySelector(".compare-section");
const searchInput = document.getElementById("searchInput");
const searchPreview = document.getElementById("search-preview");

function populateCarSelect(selectElement) {
storedCars.forEach(car => {
const option = document.createElement("option");
option.value = car.id;
option.textContent = `${car.brand} ${car.model}`;
selectElement.appendChild(option);
});
}

function handleCarSelect(event) {
const selectedId = event.target.value;
const box = event.target.closest(".compare-box");
const car = storedCars.find(c => c.id == selectedId);
if (car) {
const carInfoDiv = box.querySelector(".car-info");
carInfoDiv.innerHTML = `
<img src="${car.image}" alt="${car.brand} ${car.model}" style="width: 100%; height: auto; margin-bottom: 10px; border-radius: 10px;">
<table style="width: 100%; border-collapse: collapse;">
<tr style="background-color: #CCE6FF;"><td><strong>Price:</strong></td><td>$${car.price.toLocaleString()}</td></tr>
<tr><td><strong>Range:</strong></td><td>${car.range} miles</td></tr>
<tr style="background-color: #CCE6FF;"><td><strong>Charging Time:</strong></td><td>${(car.chargingTime * 60)} min</td></tr>
<tr><td><strong>Battery (kWh):</strong></td><td>${car.battery !== null ? car.battery : "N/A"}</td></tr>
<tr style="background-color: #CCE6FF;"><td><strong>Efficiency:</strong></td><td>${car.efficiency !== null ? car.efficiency : "N/A"}</td></tr>
<tr><td><strong>Fast Charging:</strong></td><td>${car.fastCharging !== null ? car.fastCharging : "N/A"}</td></tr>
<tr style="background-color: #CCE6FF;"><td><strong>Cargo Space:</strong></td><td>${car.cargoSpace !== null ? car.cargoSpace : "N/A"}</td></tr>
</table>
`;
} else {
// Clear info if no car selected
const carInfoDiv = box.querySelector(".car-info");
carInfoDiv.innerHTML = "";
}
}

document.querySelectorAll(".car-select").forEach(select => {
populateCarSelect(select);
select.addEventListener("change", handleCarSelect);
});

document.getElementById("add-box-btn").addEventListener("click", function () {
const newId = document.querySelectorAll(".compare-box").length + 1;
const box = document.createElement("div");
box.className = "compare-box";
box.id = `compare-box-${newId}`;
box.innerHTML = `
<h4>Car ${newId}</h4>
<select class="car-select" style="width: 100%; padding: 8px; margin-bottom: 10px;">
<option value="">Select a car...</option>
</select>
<div class="car-info"></div>
`;
comparisonContainer.appendChild(box);
const select = box.querySelector(".car-select");
populateCarSelect(select);
select.addEventListener("change", handleCarSelect);
});

// Add functionality: search for a car and add to comparison box when Enter is pressed
searchInput.addEventListener("keydown", function (e) {
if (e.key === "Enter") {
const searchTerm = searchInput.value.trim();
if (searchTerm) {
const car = storedCars.find(c =>
    c.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.model.toLowerCase().includes(searchTerm.toLowerCase())
);
if (car) {
    let selectFilled = false;
    // Add car to the first empty dropdown
    const selects = document.querySelectorAll(".compare-box .car-select");
    for (const select of selects) {
        if (!select.value) {
            select.value = car.id;
            select.dispatchEvent(new Event("change"));
            selectFilled = true;
            break;
        }
    }
    // If no empty dropdown is found, add a new comparison box
    if (!selectFilled) {
        const newId = document.querySelectorAll(".compare-box").length + 1;
        const box = document.createElement("div");
        box.className = "compare-box";
        box.id = `compare-box-${newId}`;
        box.innerHTML = `
            <h4>Car ${newId}</h4>
            <select class="car-select" style="width: 100%; padding: 8px; margin-bottom: 10px;">
                <option value="">Select a car...</option>
            </select>
            <div class="car-info"></div>
        `;
        comparisonContainer.appendChild(box);
        const select = box.querySelector(".car-select");
        populateCarSelect(select);
        select.value = car.id;
        select.dispatchEvent(new Event("change"));
        select.addEventListener("change", handleCarSelect);
    }
    // Clear the search input and hide the preview
    searchInput.value = "";
    if (searchPreview) {
      searchPreview.style.display = "none";
      searchPreview.innerHTML = "";
    }
} else {
    alert("Car not found.");
}
}
e.preventDefault();
}
});
