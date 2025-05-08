import React, { useState } from 'react'

const Header = () => {

   const [city,setCity] = useState('')
   const [weather,setWeather] = useState('')
   const [error,setError] = useState('')

   const API_KEY = 'd624763c9bc7912774ae93ca6a020f7c';
    
  
   const fetchWeather = async()=>{

    if(!city) return 

    try{

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        )
        const data =await  response.json()
        console.log(data)

        if (data.cod === 200){
            setWeather(data)
        }else {
            setWeather(null);
            setError('City not found.');
        }

    }catch(err){
        setWeather(null);
        setError('Failed to fetch data.');
    }

   }

  
  return (
    <div>
        <h1>🌤 Weather App</h1>
        <div className='search-box'>
            <input 
                type="text" 
                placeholder='Enter city name'
                value={city}
                onChange={(e)=>setCity(e.target.value)}
                
            />
        </div>

        <button onClick={fetchWeather}>Search</button>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {weather && (
            <div className='weather-info'>
                <h2>{weather.name} ,{weather.sys.country}</h2>
                <p>🌡 Temperature: {weather.main.temp}°C</p>
                <p>☁ Condition: {weather.weather[0].description}</p>
                <p>💨 Wind: {weather.wind.speed} m/s</p>
            </div>
        )}



    </div>
  )
}

export default Header