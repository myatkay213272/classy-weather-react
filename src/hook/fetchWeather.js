
const API_KEY = 'd624763c9bc7912774ae93ca6a020f7c'
const fetchWeather = async () => {
 
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
    const data = await response.json()

}

export default fetchWeather