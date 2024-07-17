import { useDate } from "../Utils/useDate";

const Weather = ({ data }) => {
  const { main, weather, name, wind, sys } = data;
  const { time } = useDate();

  return (
    <div style={{ display: "flex" }}>
      <div className="weathercard" style={{ color: "black" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ display: "inline" }}>Current Weather</h3>
          <span style={{ margin: "20px" }}>{time}</span>
        </div>
        <hr />
        <b style={{ fontSize: "20px" }}>
          {weather[0].description.toUpperCase()}
        </b>

        <p>{Math.round(main.temp)}°C</p>
        <p>Feels like {Math.round(main.feels_like)}°C</p>
        <div className="weather-info">
          <p className="btn">Humidity {main.humidity}%</p>
          <p className="btn1">Wind Speed {wind.speed} m/s</p>
        </div>
        <hr />
        <h3 className="text-center" style={{ fontStyle: "italic" }}>
          {name}, {sys.country}
        </h3>
      </div>
    </div>
  );
};

export default Weather;
