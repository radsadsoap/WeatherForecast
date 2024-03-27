const input1 = document.getElementById("city");
const button1 = document.getElementById("submit");

const cityNameElement = document.querySelector(".city-time h1");
const cityTime = document.querySelector(".city-time h2");
const cityDate = document.querySelector(".city-time h3");

const currentNameElement = document.querySelector(".current-time h1");
const currentTime = document.querySelector(".current-time h2");
const currentDate = document.querySelector(".current-time h3");

const TIME_KEY = "2pfL5M4mB/5h1jnoPQ4CBg==b7PM2ikilHxhbKtu";

button1.addEventListener("click", function () {
    const city = input1.value;
    getTimeOfCity(city);
});

async function getTimeOfCity(city) {
    try {
        const response = await fetch(
            `https://api.api-ninjas.com/v1/worldtime?city=${city}`,
            {
                method: "GET",
                headers: {
                    "X-Api-Key": "2pfL5M4mB/5h1jnoPQ4CBg==b7PM2ikilHxhbKtu",
                },
            }
        );

        if (response.ok) {
            const result = await response.json();
            const cityHour = result.hour;
            const cityMin = result.minute;
            const dateCity = new Date(result.date).toDateString();
            const cityName = result.timezone;

            displayTime(cityName, cityHour, cityMin, dateCity);
        } else {
            throw new Error("Failed to fetch time");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

function displayTime(cityName, cityHour, cityMin, dateCity) {
    cityNameElement.innerHTML = `${cityName}`;
    cityTime.innerHTML = `${cityHour}:${cityMin}`;
    cityDate.innerHTML = `${dateCity}`;

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentDateString = now.toDateString();

    currentNameElement.innerHTML = "Asia/Kolkata";
    currentTime.innerHTML = `${currentHour}:${currentMinute}`;
    currentDate.innerHTML = `${currentDateString}`;
}
