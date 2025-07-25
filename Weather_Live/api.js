const API_KEY = ''

export async function getWeatherByCity(city) {
  const currWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`

  try {
    const [currWeatherResponse, forecastResponse] = await Promise.all([fetch(currWeatherUrl), fetch(forecastUrl)])

    if(!currWeatherResponse.ok || !forecastResponse.ok){
      throw new Error('City not found or API error.')
    }

  const currentWeatherData = await currWeatherResponse.json()
  const forecastData = await forecastResponse.json()

  return {current: currentWeatherData, forecast: forecastData}

  } catch(error) {
    console.error("Failed to fetch weather data: ", error)
    throw error
  }
}