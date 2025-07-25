import { getWeatherByCity} from "./api.js";
import { renderCurrentWeather, renderForecast } from "./ui.js";

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const currentWeatherDiv = document.getElementById('current-weather');

searchForm.addEventListener('submit', async(e) => {
  e.preventDefault()
  const city = searchInput.value.trim()

  if(!city) return;

  currentWeatherDiv.innerHTML = `<p class="text-lg" >Loading...</p>`
  document.getElementById('forecast-cards').innerHTML = ''

  try {
    const weatherData = await getWeatherByCity(city)

    renderCurrentWeather(weatherData.current)
    renderForecast(weatherData.forecast)
  } catch (error){
    currentWeatherDiv.innerHTML = `<p class="text-red-400 font-bold">Could not fetch weather data. Please try another city.</p>`
  }

  searchInput.value = ''

})