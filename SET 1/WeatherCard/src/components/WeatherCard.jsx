// src/components/WeatherCard.js
import React  from 'react';
import './WeatherCard.css';
import './WeatherCard.css'; 

const WeatherCard = ({ city, temperature, condition, icon }) => {
  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <div className="weather-info">
        {icon && <img src={icon} alt={condition} />}
        <div>
          <p className="temperature">{temperature}°C</p>
          <p className="condition">{condition}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;