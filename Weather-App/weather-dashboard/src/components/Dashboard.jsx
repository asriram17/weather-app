import React, { useState, useEffect, useRef } from "react";
import Weather from "./Weather";
import axios from "axios";
import Forecast from "./Forecast";

import Barchart from "./Barchart";
import Donutchart from "./Donutchart";
import ScribblePad from "./ScribblePad";

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [location, setLocation] = useState("chennai");
  const [symbol, setSymbol] = useState("IBM");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = "136dead426c6cfa34a4aab945996a76c";
  const STOCK_API_KEY = "demo";
  // const STOCK_API_KEY = "Y03AEVID0RV0LWEE";
  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const currentWeatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`
        );
        setWeatherData(currentWeatherResponse.data);
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`
        );
        setForecastData(forecastResponse.data);
        const stockdata = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`
        );

        const timeSeries = stockdata.data["Time Series (Daily)"];

        const formattedData = Object.keys(timeSeries)
          .slice(0, 7)
          .map((date) => ({
            date: new Date(date),
            close: +timeSeries[date]["4. close"],
          }));

        console.log(timeSeries);

        setData(formattedData);
      } catch (err) {
        setError("Error fetching weather data. Please try again.");
      }
      setLoading(false);
    };

    fetchWeatherData();
  }, [location, API_KEY]);

  const handleSearch = () => {
    setLocation(inputValue);
  };

  return (
    <div className="dashboard">
      {error && <h3 style={{ color: "red" }}>Enter a valid City Name</h3>}
      {loading ? (
        <div>
          <h1>Loading....</h1>
        </div>
      ) : (
        <>
          <div className="form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
                setError("");
              }}
            >
              <input
                className="input-form"
                type="text"
                value={inputValue}
                placeholder="Enter City"
                onChange={(e) => setInputValue(e.target.value)}
              ></input>
              <button onClick={handleSearch}>search</button>
            </form>
          </div>

          {weatherData && (
            <div className="allcards">
              <div className="weather-card">
                <Weather data={weatherData} />
              </div>
              <div className="forecast">
                <Forecast data={forecastData} />
              </div>
              {/* <div className="stock-chart"> */}
                <div className="barchart">
                  <p style={{ color: "black" }}>Stock Market - {symbol}</p>
                  <Barchart data={data} />
                </div>
                <div className="donutchart">
                  <p style={{ color: "black" }}>Stock Market - {symbol}</p>
                  <Donutchart data={data} />
                </div>
              {/* </div> */}
              <div className="scribble">
                <ScribblePad />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
