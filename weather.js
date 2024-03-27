const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature h1");
const descElement = document.querySelector(".summary h1");
const locationElement = document.querySelector(".place h1");
const notificationElement = document.querySelector(".notification");

const input = document.getElementById("city");
const button = document.getElementById("submit");

const windElement = document.querySelector(".wind");
const visiElement = document.querySelector(".visibility");
const humidElement = document.querySelector(".humidity");
const uvElement = document.querySelector(".uv");

const weather = {};

weather.temperature = {
    unit: "celcius",
};

const KELVIN = 273;

const key = "7c752405d720885f397bc9055c62d60d";

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML =
        "<p>Browser doesn't Support Geolocation</p>";
}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error}.meesage </p>`;
}

function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.wind = data.wind.speed;
            weather.humidity = data.main.humidity;
            weather.visibility = Math.floor(data.visibility / 1000);
        })
        .then(function () {
            displayWeather();
        });
}

button.addEventListener("click", function () {
    const city = input.value;
    getWeatherByCity(city);
});

function getWeatherByCity(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    console.log(api);
    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.wind = data.wind.speed;
            weather.humidity = data.main.humidity;
            weather.visibility = Math.floor(data.visibility / 1000);
        })
        .then(function () {
            displayWeather();
        })
        .catch(function (error) {
            showError(error);
        });
}

function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    windElement.innerHTML = `${weather.wind}m/h`;
    visiElement.innerHTML = `${weather.visibility}km`;
    humidElement.innerHTML = `${weather.humidity}%`;
}
