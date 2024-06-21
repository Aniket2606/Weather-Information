const result = document.getElementById("result");
const searchBtn = document.getElementById("search-btn");
const cityRef = document.getElementById("city");

// Function to display weather details
const displayWeather = (data) => {
  result.innerHTML = `
    <h2>${data.name}</h2>
    <h4 class="weather">${data.weather[0].main}</h4>
    <h4 class="desc">${data.weather[0].description}</h4>
    <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
    <h1>${data.main.temp.toFixed(1)} &#176;</h1>
    <div class="temp-container">
        <div>
            <h4 class="title">Min</h4>
            <h4 class="temp">${data.main.temp_min.toFixed(1)} &#176;</h4>
        </div>
        <div>
            <h4 class="title">Max</h4>
            <h4 class="temp">${data.main.temp_max.toFixed(1)} &#176;</h4>
        </div>
        <div>
            <h4 class="title">Humidity</h4>
            <h4 class="temp">${data.main.humidity} %</h4>
        </div>
    </div>`;
};

// Function to fetch weather details from API
const getWeather = () => {
  const cityValue = cityRef.value.trim();
  if (cityValue === "") {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
    return;
  }
  const key = "key";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
  cityRef.value = ""; // Clear the input field
  fetch(url)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("City not found");
      }
      return resp.json();
    })
    .then((data) => {
      console.log(data);
      displayWeather(data);
    })
    .catch((error) => {
      result.innerHTML = `<h3 class="msg">${error.message}</h3>`;
    });
};

// Event listeners
searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);
