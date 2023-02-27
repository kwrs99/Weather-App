//format the current date and time
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

//format the day of the forecast
function formatForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//show forecast
function displayForecast(response) {
  let forecastData = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastData.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-md-2">
            <h4>${formatForecast(forecastDay.dt)}</h4>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="60px"
            />
            <div>
              <span class="forecast-temp-hi">${Math.round(
                forecastDay.temp.max
              )}</span>° | 
              <span class="forecast-temp-lo">${Math.round(
                forecastDay.temp.min
              )}</span>°
            </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//displaying weather and city name
function displayWeather(response) {
  tempCelsius = response.data.main.temp;
  let temp = Math.round(tempCelsius);
  let h2 = document.querySelector("#current-temp");

  let h1 = document.querySelector("#city-name");
  h2.innerHTML = `${temp} `;
  h1.innerHTML = response.data.name;

  let description = response.data.weather[0].description;
  let descriptionCap = description[0].toUpperCase() + description.substring(1);
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = `${descriptionCap}`;

  let tempHilo = document.querySelector("#high-low");
  let tempHi = Math.round(response.data.main.temp_max);
  let tempLo = Math.round(response.data.main.temp_min);
  tempHilo.innerHTML = `H: ${tempHi}° | L: ${tempLo}°`;

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

  getForecast(response.data.coord);
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

tempCelsius = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//temperature conversion

function temperatureFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempFahrenheit = Math.round((tempCelsius * 9) / 5 + 32);
  let h2 = document.querySelector("#current-temp");
  h2.innerHTML = tempFahrenheit;
}

function temperatureCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let h2 = document.querySelector("#current-temp");
  h2.innerHTML = Math.round(tempCelsius);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", temperatureFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", temperatureCelsius);

search("Dublin");
