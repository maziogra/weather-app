import { useContext, useState } from "react";
import { SearchContext } from "../App";

function Nav() {
  const [city, setCity] = useState("");
  const { setSearchResult } = useContext(SearchContext);

  function handleCity(e: React.ChangeEvent<HTMLInputElement>) {
    setCity(e.target.value);
  }

  async function searchCity() {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
    );
    setCity("");
    const data = await response.json();
    setSearchResult(data.results);
  }

  return (
    <>
      <nav>
        <span>Weather</span>
        <div>
          <input type="text" value={city} onChange={handleCity} />
          <button onClick={searchCity}>SEARCH</button>
        </div>
      </nav>
    </>
  );
}

export default Nav;
