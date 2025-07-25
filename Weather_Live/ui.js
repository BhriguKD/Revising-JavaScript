export function renderCurrentWeather(data){
  const currWeatherDiv = document.getElementById('current-weather')
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

  currWeatherDiv.innerHTML = `
    <h1 class="text-4xl sm:text-5xl font-bold">${data.name}</h1>
    <img src="${iconUrl}" alt="${data.weather[0].description}" class="mx-auto w-24 h-24">
    <p class="text-6xl sm:text-7xl font-extrabold">${Math.round(data.main.temp)}℃</p>
    <p class="text-xl capitalize">${data.weather[0].description}</p>
  `
}

export function renderForecast(data){
  const forecastCardsDiv = document.getElementById('forecast-cards')
  forecastCardsDiv.innerHTML = ''

  const dailyForecasts = data.list.filter(item=> {
    return item.dt_txt.includes("12:00:00")
  })

  const forecastHTML = dailyForecasts.map(day => {
    const date = new Date(day.dt * 1000)
    const dayName = date.toLocaleDateString('en-US', {weekday: 'short'})
    const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`

    return `
      <div class="bg-amber-300 border-2 p-4 text-center">
        <p class="font-bold">${dayName}</p>
        <img src="${iconUrl}" alt="${day.weather[0].description}" class="mx-auto w-12 h-12">
        <p>${Math.round(day.main.temp)}℃</p>
      </div>
    `
  }).join('')

  forecastCardsDiv.innerHTML = forecastHTML
}