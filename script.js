const goButton = document.getElementById("go-button");
const petSelect = document.getElementById("pet-select");

const results = document.getElementById("results");
const resultImage = document.getElementById("result-image");
const result1 = document.getElementById("result-1");
const result2 = document.getElementById("result-2");
const result3 = document.getElementById("result-3");

async function loadDogs() {

// Dropdown code
const selectedDog = petSelect.value;

//  select breed boolean or alert will direct to select dog
if (selectedDog === "") {
alert("Please choose a dog first.");
return;
}

// Bring in my Dogs API
const url =
"https://student-data-api.rhyantotherescue-d9d.workers.dev/api/v1/datasets/Dogs/records?search=" +
encodeURIComponent(selectedDog);

console.log("Searching for:", selectedDog);
console.log("API URL:", url);

try {

// fetch API dog 
const response = await fetch(url);

console.log("Status:", response.status);


//response to JSON
const data = await response.json();

console.log("API response:", data);


const dogs = data.records;

console.log("Number of records:", dogs.length);


// results
if (dogs.length === 0) {

  results.style.display = "block";

  resultImage.style.display = "none";

  result1.textContent = "No results found.";

  result2.textContent =
    "We could not find information for " + selectedDog + ".";

  result3.textContent = "";

  return;
}


// dogs selected by dropdown
const dog = dogs[0];

console.log("Dog information:", dog);


// Display the dog information
result1.textContent =
  dog.Name +
  " Weighs a minimum " +
  dog["Minimum Weight"] +
  "lbs and Weighs a maximum " +
  dog["Maximum Weight"] +
"lbs. They would be an excellent companion if you prefer a dog that is " + dog["Temperament"]
  
  ;


result2.textContent =
  "Breed Name: " + selectedDog;


result3.textContent =
  "Is a " + dog.Name + " The perfect dog for you?"


// dogs image
resultImage.src = dog.Image;

resultImage.alt = "Image of " + dog.Name;

resultImage.style.display = "block";


// Show the Results section
results.style.display = "block";

} catch (error) {

console.error("Error:", error);

results.style.display = "block";

result1.textContent = "Something went wrong.";

result2.textContent =
  "We were unable to load the dog information.";

result3.textContent = "";

resultImage.style.display = "none";

}
}

// show dogs when this button is clicked
goButton.addEventListener("click", loadDogs);