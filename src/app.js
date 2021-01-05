let apiKey = `4934aa3a2a7bd013332e7d59c0e551f4`;
let city = `london`
let apiAddress = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

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
    cityDisplay.innerHTML = (response.data.name);
    currentTemperatureDisplay.innerHTML = Math.round(response.data.main.temp);
    weatherDescriptionDisplay.innerHTML = (response.data.weather[0].description);
    windDisplay.innerHTML = (Math.round(response.data.wind.speed));
    humidityDisplay.innerHTML = (response.data.main.humidity)
    highsOf.innerHTML = Math.round(response.data.main.temp_max);
    lowsOf.innerHTML = Math.round(response.data.main.temp_min);
    currentWeatherIconDisplay.src = weatherIconUrl;
}


axios.get(apiAddress).then(getWeather);