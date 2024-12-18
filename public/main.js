const weatherDisplay = document.querySelector('.weather');
const weatherForm = document.querySelector('#weather-form');
const cityInput = document.querySelector('#city-input');
const errorDisplay = document.querySelector('.error-message');

// Fetch weather data from API
const fetchWeather = async (city) => {
  const url = `/api?q=${city}`;

  try {
    const res = await fetch(url);

    // Handle rate limiting (429 status)
    if (res.status === 429) {
      errorDisplay.textContent = 'Too many requests, please wait for 1 minute.';
      errorDisplay.style.color = 'red';
      errorDisplay.style.fontSize = '18px';
      errorDisplay.style.marginTop = '10px';
      return;
    }

    const data = await res.json();

    if (data.cod === '404') {
      alert('City not found');
      return;
    }

    if (data.cod === 401) {
      alert('Invalid API Key');
      return;
    }

    const displayData = {
      city: data.name,
      temp: kelvinToFahrenheit(data.main.temp),
    };

    addWeatherToDOM(displayData);
    errorDisplay.textContent = ''; // Clear any previous error messages
  } catch (error) {
    console.error('Error fetching weather data:', error);
    errorDisplay.textContent = 'An error occurred, please try again later.';
    errorDisplay.style.color = 'red';
  }
};

// Add display data to DOM
const addWeatherToDOM = (data) => {
  weatherDisplay.innerHTML = `
    <h1>Weather in ${data.city}</h1>
    <h2>${data.temp} &deg;F</h2>
  `;
  cityInput.value = '';
};

// Convert Kelvin to Fahrenheit
const kelvinToFahrenheit = (temp) => {
  return Math.ceil(((temp - 273.15) * 9) / 5 + 32);
};

// Event listener for form submission
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (cityInput.value === '') {
    alert('Please enter a city');
  } else {
    fetchWeather(cityInput.value);
  }
});

// Initial fetch
fetchWeather('Mumbai');
