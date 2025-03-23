import React, { useState } from "react";

function WeatherDashboard() {
  // Mock weather data
  const mockWeatherData = {
    "New York": {
      temperature: "22°C",
      humidity: "56%",
      windSpeed: "15 km/h",
    },
    "Los Angeles": {
      temperature: "27°C",
      humidity: "45%",
      windSpeed: "10 km/h",
    },
    London: {
      temperature: "15°C",
      humidity: "70%",
      windSpeed: "20 km/h",
    },
  };

  const [cityInput, setCityInput] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  // Handle search action
  const handleSearch = (cityName) => {
    const city = cityName || cityInput.trim();
    if (!city) return;

    const weather = mockWeatherData[city];

    if (weather) {
      setCurrentWeather({ city, ...weather });
      setError("");
      // Update search history (avoid duplicates)
      if (!searchHistory.includes(city)) {
        setSearchHistory([city, ...searchHistory]);
      }
    } else {
      setCurrentWeather(null);
      setError("City not found.");
    }

    setCityInput(""); // Clear input after search
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <input
        type="text"
        placeholder="Search for a city..."
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        style={{ padding: "8px", width: "70%", marginRight: "10px" }}
      />
      <button onClick={() => handleSearch()} style={{ padding: "8px 16px" }}>
        Search
      </button>

      <div style={{ marginTop: "20px" }}>
        {currentWeather ? (
          <div>
            <h3>Weather in {currentWeather.city}</h3>
            <div>Temperature: {currentWeather.temperature}</div>
            <div>Humidity: {currentWeather.humidity}</div>
            <div>Wind Speed: {currentWeather.windSpeed}</div>
          </div>
        ) : error ? (
          <div style={{ color: "red" }}>{error}</div>
        ) : (
          <div>Enter a city to see weather data.</div>
        )}
      </div>

      {searchHistory.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h4>Search History:</h4>
          {searchHistory.map((city, index) => (
            <button
              key={index}
              onClick={() => handleSearch(city)}
              style={{
                margin: "5px",
                padding: "6px 10px",
                cursor: "pointer",
                background: "#eee",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Weather Dashboard</h1>
      <WeatherDashboard />
    </div>
  );
}

export default App;
