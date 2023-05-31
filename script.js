let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let hours = now.getHours();
let minutes = now.getMinutes();
let day = days[now.getDay()];

function formatDate() {
  let currentDateElement = document.getElementById("current-date");
  currentDateElement.innerHTML = `${day}, ${hours}:${minutes}`;
}

formatDate();

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h3 = document.querySelector("#city-name");
  let temperatureElement = document.querySelector("#temperature");

  if (searchInput.value) {
    let apiKey = "";
    let city = searchInput.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    axios.get(apiUrl).then(function (response) {
      let temperature = Math.round(response.data.main.temp);
      h3.innerHTML = city;
      temperatureElement.innerHTML = temperature;
    });
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showWeather(response) {
  let h3 = document.querySelector("h3");
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.getElementById("temperature");
  h3.innerHTML = `${response.data.name}`;
  temperatureElement.innerHTML = `${temperature}`;
}

function getCurrentPosition(position) {
  console.log(position);
  let apiKey = "34ae1065362d42545661451bda2b8a1f";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

let currentLocationButton = document.getElementById("current-location");
currentLocationButton.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
});
