

function getDate(timestamp) {
    let currentDate = new Date(timestamp);
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[currentDate.getDay()];
    let minutes = currentDate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let hours = currentDate.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    return `${day}  ${hours}:${minutes}`
}

function formatHours(timestamp) {
    let forecastDate = new Date(timestamp);
    let hours = forecastDate.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    return `${hours}:00`
}

function getWeather(response) {
    let cityDisplay = document.querySelector("h1");
    let currentTemperatureDisplay = document.querySelector("#current-temperature");
    let weatherDescriptionDisplay = document.querySelector("h3");
    let windDisplay = document.querySelector("#wind-speed-value");
    let humidityDisplay = document.querySelector("#humidity-value");
    let highsOf = document.querySelector("#high");
    let lowsOf = document.querySelector("#low");
    let iconId = (response.data.weather[0].icon);
    let weatherIconUrl = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
    let currentWeatherIconDisplay = document.querySelector("#current-weather-icon");
    let dateDisplay = document.querySelector("#date");

    currentCelciusTemp = response.data.main.temp;
    highsOfTemp = response.data.main.temp_max;
    lowsOfTemp = response.data.main.temp_min;

    cityDisplay.innerHTML = (response.data.name);
    currentTemperatureDisplay.innerHTML = Math.round(response.data.main.temp);
    weatherDescriptionDisplay.innerHTML = (response.data.weather[0].description);
    windDisplay.innerHTML = (Math.round(response.data.wind.speed));
    humidityDisplay.innerHTML = (response.data.main.humidity)
    highsOf.innerHTML = Math.round(response.data.main.temp_max);
    lowsOf.innerHTML = Math.round(response.data.main.temp_min);
    currentWeatherIconDisplay.src = weatherIconUrl;
    currentWeatherIconDisplay.setAttribute("alt", response.data.weather[0].description);
    dateDisplay.innerHTML = getDate(response.data.dt *1000);
}

function getForecast(response) {
    forecastSection = document.querySelector("#forecast-section");
    forecastSection.innerHTML = null;
    let forecast = null;
    for (let index = 0; index < 5; index++) {
        forecast = response.data.list[index];
        forecastSection.innerHTML += 
    `
            <div class="col-2" >
                <div class="time">
                    ${formatHours(forecast.dt *1000)}
                </div>
                <div class="weatherIcon">
                    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="">
                </div>
                <div class="forecastTemperature">
                    ${Math.round(forecast.main.temp)}°
                </div>
            </div>
    
    `
    }
}

function searchForLocation(location) {
    let apiKey = `4934aa3a2a7bd013332e7d59c0e551f4`;
    let apiAddress = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=${apiKey}`
    axios.get(apiAddress).then(getWeather);

    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(getForecast);
}

function getLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchForLocation);
}

function search(city) {
    let apiKey = `4934aa3a2a7bd013332e7d59c0e551f4`;
    let apiAddress = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiAddress).then(getWeather);

    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(getForecast);
}

function getCity(event) {
    event.preventDefault();
    let input = document.querySelector("#input-city");
    let city = input.value;
    search(city);
    if (city.length = 0) {
        getLocation()
    }
}

function convertToFahrenheit(temp) {
    temp.preventDefault();
    let currentTemperatureDisplay = document.querySelector("#current-temperature");
    currentTemperatureDisplay.innerHTML = Math.round((currentCelciusTemp * 9/5) + 32);
    let highsOf = document.querySelector("#high");
    let lowsOf = document.querySelector("#low");
    highsOf.innerHTML = Math.round((highsOfTemp * 9/5) + 32);
    lowsOf.innerHTML = Math.round((lowsOfTemp * 9/5) + 32);

    celcius.classList.remove("active");
    fahrenheit.classList.add("active");
}

function convertToCelcius(temp) {
    temp.preventDefault();
    let currentTemperatureDisplay = document.querySelector("#current-temperature");
    currentTemperatureDisplay.innerHTML = Math.round(currentCelciusTemp);
    let highsOf = document.querySelector("#high");
    let lowsOf = document.querySelector("#low");
    highsOf.innerHTML = Math.round(highsOfTemp);
    lowsOf.innerHTML = Math.round(lowsOfTemp);
    celcius.classList.add("active");
    fahrenheit.classList.remove("active");
}

let currentCelciusTemp = null;
let highsOfTemp = null;
let lowsOfTemp = null;

search(`London`);

let searchForm = document.querySelector("#city-input-form");
searchForm.addEventListener("submit", getCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getLocation);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", convertToFahrenheit);

let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", convertToCelcius);


