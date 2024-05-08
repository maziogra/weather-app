import { useContext, useEffect, useState } from "react";
import { SelectedCityContext } from "../App";

type Forecast = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    rain_sum: string;
    precipitation_probability_max: "%";
  };
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    rain: string;
    snowfall: string;
    // new
    wind_speed_10m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    rain: number;
    snowfall: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    rain_sum: number[];
    precipitation_probability_max: number[];
  };
};

function Forecast() {
  const { selectedCity } = useContext(SelectedCityContext);
  const [forecast, setForecast] = useState<Forecast>();
  let today, days;

  {
    useEffect(() => {
      async function fetchData(url: string) {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data: Forecast = await response.json();
          setForecast(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      fetchData(
        `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,rain,snowfall,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,rain_sum,precipitation_probability_max&timezone=GMT`
      );
    }, [selectedCity]);
  }

  if (forecast) {
    today = (
      <>
        <div className="carcont">
          <div className="todayElement">
            <img
              src={
                forecast.current.rain < 0.15
                  ? "https://cdn.icon-icons.com/icons2/2533/PNG/512/sun_weather_icon_152003.png"
                  : forecast.current.rain > 0.15
                  ? "https://e7.pngegg.com/pngimages/598/737/png-clipart-storm-ico-icon-storm-love-text.png"
                  : forecast.current.snowfall > 0.15
                  ? "https://png.pngtree.com/png-vector/20230321/ourmid/pngtree-snow-clouds-with-snowflakes-vector-png-image_6657012.png"
                  : "https://www.freeiconspng.com/uploads/rain-cloud-icon-4.png"
              }
              width="100px"
            />
            <br />
            <br />
            <p>
              Temperature: {forecast.current.temperature_2m}
              {forecast.current_units.temperature_2m}
            </p>
            <p>
              Apparent temperature: {forecast.current.apparent_temperature}
              {forecast.current_units.apparent_temperature}
            </p>
            <p>
              Humidity: {forecast.current.relative_humidity_2m}
              {forecast.current_units.relative_humidity_2m}
            </p>
            <p>
              Wind speed: {forecast.current.wind_speed_10m}
              {forecast.current_units.wind_speed_10m}
            </p>
          </div>
        </div>
      </>
    );
    days = (
      <div className="carcont">
        <div className="car">
          {forecast.daily.time.map((c, i) => (
            <div key={i} className="element">
              <img
                src={
                  forecast.daily.precipitation_probability_max[i] < 65
                    ? "https://cdn.icon-icons.com/icons2/2533/PNG/512/sun_weather_icon_152003.png"
                    : forecast.daily.rain_sum[i] > 10
                    ? "https://www.shareicon.net/data/2016/06/17/595814_storm_512x512.png"
                    : forecast.daily.temperature_2m_max[i] < 5
                    ? "https://png.pngtree.com/png-vector/20230321/ourmid/pngtree-snow-clouds-with-snowflakes-vector-png-image_6657012.png"
                    : "https://www.freeiconspng.com/uploads/rain-cloud-icon-4.png"
                }
                width="100px"
              />
              <br />
              <br />
              <p>
                Max: {Math.floor(forecast.daily.temperature_2m_max[i])}
                {forecast.daily_units.temperature_2m_max}
              </p>
              <p>
                Min: {Math.floor(forecast.daily.temperature_2m_min[i])}
                {forecast.daily_units.temperature_2m_min}
              </p>
              <p>
                Rain probability:{" "}
                {forecast.daily.precipitation_probability_max[i]}
                {forecast.daily_units.precipitation_probability_max}
              </p>
              <p>
                Rain sum: {forecast.daily.rain_sum[i]}
                {forecast.daily_units.rain_sum}
              </p>
              <br />
              <p>{c}</p>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    today = <h1 style={{ color: "red" }}>LOADING DATA...</h1>;
    days = today;
  }

  return (
    <>
      <h1>TODAY</h1>
      {today}
      <h1>7 DAYS FORECAST</h1>
      {days}
    </>
  );
}

export default Forecast;
