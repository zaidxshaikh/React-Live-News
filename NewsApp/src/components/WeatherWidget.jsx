import React, { useState, useEffect } from "react";

const WEATHER_KEY = "zaidxshaikh-weather-cache";

const weatherIcons = {
  Clear: "\u2600\uFE0F",
  Clouds: "\u2601\uFE0F",
  Rain: "\uD83C\uDF27\uFE0F",
  Drizzle: "\uD83C\uDF26\uFE0F",
  Thunderstorm: "\u26C8\uFE0F",
  Snow: "\uD83C\uDF28\uFE0F",
  Mist: "\uD83C\uDF2B\uFE0F",
  Fog: "\uD83C\uDF2B\uFE0F",
  Haze: "\uD83C\uDF2B\uFE0F",
};

const demoWeather = {
  temp: 22,
  condition: "Clear",
  city: "New York",
  humidity: 55,
  wind: 12,
  feelsLike: 20,
};

const WeatherWidget = ({ apiKey, city = "New York" }) => {
  const [weather, setWeather] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!apiKey) {
        setWeather(demoWeather);
        return;
      }
      try {
        const cached = JSON.parse(
          localStorage.getItem(WEATHER_KEY) || "null"
        );
        if (cached && Date.now() - cached.timestamp < 600000) {
          setWeather(cached.data);
          return;
        }
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        const w = {
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
          city: data.name,
          humidity: data.main.humidity,
          wind: Math.round(data.wind.speed),
          feelsLike: Math.round(data.main.feels_like),
        };
        setWeather(w);
        localStorage.setItem(
          WEATHER_KEY,
          JSON.stringify({ data: w, timestamp: Date.now() })
        );
      } catch {
        setWeather(demoWeather);
      }
    };
    fetchWeather();
  }, [apiKey, city]);

  if (!weather) return null;

  const icon = weatherIcons[weather.condition] || "\uD83C\uDF24\uFE0F";

  return (
    <div className="weather-widget">
      <button
        className="weather-widget__toggle"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="weather-widget__icon">{icon}</span>
        <span className="weather-widget__temp">{weather.temp}\u00B0C</span>
      </button>
      {expanded && (
        <div className="weather-widget__dropdown">
          <div className="weather-widget__header">
            <span className="weather-widget__city">{weather.city}</span>
            <span className="weather-widget__condition">
              {icon} {weather.condition}
            </span>
          </div>
          <div className="weather-widget__details">
            <div className="weather-widget__detail">
              <span className="weather-widget__detail-label">Feels Like</span>
              <span className="weather-widget__detail-value">
                {weather.feelsLike}\u00B0C
              </span>
            </div>
            <div className="weather-widget__detail">
              <span className="weather-widget__detail-label">Humidity</span>
              <span className="weather-widget__detail-value">
                {weather.humidity}%
              </span>
            </div>
            <div className="weather-widget__detail">
              <span className="weather-widget__detail-label">Wind</span>
              <span className="weather-widget__detail-value">
                {weather.wind} km/h
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
