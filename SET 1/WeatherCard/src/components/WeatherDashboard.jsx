import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from "./WeatherCard";
import './WeatherDashboard.css'; 

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cities = ['London', 'Paris', 'New York', 'Tokyo', 'Sydney'];

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        const promises = cities.map(city =>
          axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`)
        );
        
        const responses = await Promise.all(promises);
        const data = responses.map(response => ({
          city: response.data.location.name,
          temperature: response.data.current.temp_c,
          condition: response.data.current.condition.text,
          icon: response.data.current.condition.icon
        }));
        
        setWeatherData(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error?.message || err.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) return <div>Loading weather data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="weather-dashboard">
      <h1>Weather Dashboard</h1>
      <div className="weather-cards-container">
        {weatherData.map((weather, index) => (
          <WeatherCard
            key={index}
            city={weather.city}
            temperature={weather.temperature}
            condition={weather.condition}
            icon={weather.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherDashboard;