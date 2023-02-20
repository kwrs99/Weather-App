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

//city search

function citySearch(event) {
  event.preventDefault();
  let cityNew = document.querySelector("#search-input").value;
  let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityNew}&appid=${apiKey}&units=metric`;
  axios.get(url).then(weather);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", citySearch);

//current location temp. and name
function weather(response) {
  let temp = Math.round(response.data.main.temp);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${temp}°C`;
  h1.innerHTML = `${response.data.name}`;

  let description = response.data.weather[0].description;
  let descriptionCap = description[0].toUpperCase() + description.substring(1);
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = `${descriptionCap}`;

  let tempHilo = document.querySelector("#high-low");
  let tempHi = Math.round(response.data.main.temp_max);
  let tempLo = Math.round(response.data.main.temp_min);
  tempHilo.innerHTML = `H:${tempHi}° | L:${tempLo}°`;

  let humid = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${humid} %`;

  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${windSpeed} km/h`;
}

//current location
function location(position) {
  let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(weather);
}

navigator.geolocation.getCurrentPosition(location);

let h1 = document.querySelector("h1");

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(location);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getLocation);
