

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

function getCity(event) {
    event.preventDefault();
    let input = document.querySelector("#input-city");
    let city = input.value;
    let apiKey = `4934aa3a2a7bd013332e7d59c0e551f4`;
    let apiAddress = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiAddress).then(getWeather);
}


let searchForm = document.querySelector("#city-input-form");
searchForm.addEventListener("submit", getCity);


