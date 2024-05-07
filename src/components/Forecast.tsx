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
    precipitation_hours: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    rain_sum: number[];
    precipitation_hours: number[];
  };
};

function Forecast() {
  const { selectedCity } = useContext(SelectedCityContext);
  const [forecast, setForecast] = useState<Forecast>();

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
        `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&daily=temperature_2m_max,temperature_2m_min,rain_sum,precipitation_hours&timezone=GMT`
      );
    }, [selectedCity]);
  }

  return (
    <>
      <div className="carcont">
        <div className="car">
          {forecast?.daily.time.map((c, i) => (
            <div key={i} className="element">
              <img
                src={
                  forecast.daily.rain_sum[i] < 2
                    ? "https://cdn.icon-icons.com/icons2/2533/PNG/512/sun_weather_icon_152003.png"
                    : "https://www.freeiconspng.com/uploads/rain-cloud-icon-4.png"
                }
                width="100px"
              />
              <br />
              <br />
              <p>Max: {Math.floor(forecast.daily.temperature_2m_max[i])}°C</p>
              <p>Min: {Math.floor(forecast.daily.temperature_2m_min[i])}°C</p>
              <p>Rain sum: {forecast.daily.rain_sum[i]} mm</p>
              <br />
              <p>{c}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Forecast;
