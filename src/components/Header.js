import React, { useState } from 'react';


const API_KEY = 'd624763c9bc7912774ae93ca6a020f7c';

const Header = () => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [todayWeather, setTodayWeather] = useState(null);
  const [tomorrowWeather, setTomorrowWeather] = useState(null);

  const fetchWeather = async (e) => {
    e.preventDefault(); 
    try {
      setError('');
      
      // Fetch current weather
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!currentRes.ok) throw new Error('City not found');
      const currentData = await currentRes.json();
      setTodayWeather(currentData);
      setCity('')

      // Fetch forecast weather
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!forecastRes.ok) throw new Error('Forecast not found');
      const forecastData = await forecastRes.json();

      // Get tomorrow's date string (YYYY-MM-DD)
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];

      // Find forecast for around 12:00 tomorrow
      const tomorrowData = forecastData.list.find(item =>
        item.dt_txt.startsWith(tomorrowStr) && item.dt_txt.includes("12:00:00")
      );


      setTomorrowWeather(tomorrowData);
    } catch (err) {
      setError('City not found or network error');
      setTodayWeather(null);
      setTomorrowWeather(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(e);
    }


  };

  return (
    <>
      <h2>Weather App</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
          className="weather-input"
        />

        <button type="submit" className="weather-button">
          Get Weather
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {todayWeather && (
        <div className="weather-info">
          <h3>Today's Weather in {todayWeather.name}</h3>
          <p>Temp: {todayWeather.main.temp} °C</p>
          <p>Condition: {todayWeather.weather[0].description}</p>
        </div>
      )}

      {tomorrowWeather && (
        <div className="weather-info">
          <h3>Tomorrow's Weather</h3>
          <p>Temp: {tomorrowWeather.main.temp} °C</p>
          <p>Condition: {tomorrowWeather.weather[0].description}</p>
        </div>
      )}
    </>
  );
};

export default Header;
