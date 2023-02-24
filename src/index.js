//current date and time
let date = new Date();
function formatDate(now) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];

  let today = date.getDate();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let year = date.getFullYear();
  let current = `${day} ${today} ${month} ${year}`;

  return current;
}
let dateTime = document.querySelector("#date-time");
let day = formatDate(new Date());

let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
dateTime.innerHTML = `${day} ${hours}:${minutes}`;

//displaying weather and city name
function displayWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let h2 = document.querySelector("h2");

  let h1 = document.querySelector("h1");
  h2.innerHTML = `${temp}°C`;
  h1.innerHTML = response.data.name;

  let description = response.data.weather[0].description;
  let descriptionCap = description[0].toUpperCase() + description.substring(1);
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = `${descriptionCap}`;

  let tempHilo = document.querySelector("#high-low");
  let tempHi = Math.round(response.data.main.temp_max);
  let tempLo = Math.round(response.data.main.temp_min);
  tempHilo.innerHTML = `H:${tempHi}° | L:${tempLo}°`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let windSpeed = Math.round(response.data.wind.speed * 3.6);
  let wind = document.querySelector("#wind");
  wind.innerHTML = windSpeed;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

//weather in current location
function searchLocation(position) {
  let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
  let locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(locationUrl).then(displayWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getLocation);

//search for city weather
function search(city) {
  let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  search(cityInput.value);
}

search("Dublin");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
