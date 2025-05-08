import React from 'react'

const API_KEY = 'd624763c9bc7912774ae93ca6a020f7c';

const Header = () => {
  return (
   <div>

    <form onSubmit={handleSubmit} className="weather-form">
        <input
          type="text"
          value={city}
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
          className="weather-input"
        />

   </div>
  )
}

export default Header