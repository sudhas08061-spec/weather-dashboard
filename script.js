const container = document.getElementById("weather-container")
const loader = document.getElementById("loader")

// Cities with coordinates
const cities = [
  {name:"Delhi", lat:28.61, lon:77.23},
  {name:"London", lat:51.50, lon:-0.12},
  {name:"Tokyo", lat:35.67, lon:139.65}
]


function weatherEmoji(code){

    if(code === 0) return "☀️"
    if(code <= 3) return "⛅"
    if(code <= 48) return "☁️"
    if(code <= 67) return "🌧️"
    if(code <= 77) return "❄️"
    if(code <= 99) return "⛈️"

    return "🌍"
}


function fetchWeather(city){

    const url =
`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`

    return fetch(url)
        .then(res => res.json())
        .then(data => {

            const temp = data.current_weather.temperature
            const code = data.current_weather.weathercode

            return {
                city: city.name,
                temp,
                emoji: weatherEmoji(code)
            }

        })
}


const promises = cities.map(city => fetchWeather(city))


Promise.all(promises)

.then(results => {

    loader.style.display = "none"

    results.forEach(weather => {

        const card = document.createElement("div")
        card.className = "card"

        card.innerHTML = `
        <h2>${weather.city}</h2>
        <div class="emoji">${weather.emoji}</div>
        <div class="temp">${weather.temp}°C</div>
        `

        container.appendChild(card)

    })

})

.catch(error => {

    loader.innerText = "Error loading weather data"
    loader.classList.add("error")

})
