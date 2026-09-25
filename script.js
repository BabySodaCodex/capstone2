let goButton = document.getElementById("go-button");
let petSelect = document.getElementById("pet-select");

async function loadDogs() {
let selectedDog = petSelect.value;

if (selectedDog === "") {
alert("Please choose a dog first.");
return;
}

let response = await fetch(
"https://student-data-api.rhyantotherescue-d9d.workers.dev/api/v1/datasets/Dogs/records?search=" +
encodeURIComponent(selectedDog)
);

console.log("Status: " + response.status);

let data = await response.json();
let dogs = data.records;

console.log("Records:", dogs);

if (dogs.length === 0) {
document.getElementById("results").style.display = "block";
document.getElementById("result-1").textContent =
"Sorry, no results found.";
return;
}

let dog = dogs[0];

console.log("Selected dog:", dog);

document.getElementById("result-1").textContent =
dog.Name + " lives at least " + dog["Minimum Life Span"] + " years.";

document.getElementById("result-image").src = dog["Image"];

document.getElementById("results").style.display = "block";
}

goButton.addEventListener("click", loadDogs);