import { useContext, useState } from "react";
import { ContentContext, SearchContext } from "../App";
import Search from "./Search";

function Nav() {
  const [city, setCity] = useState("");
  const { setSearchResult } = useContext(SearchContext);
  const { setContent } = useContext(ContentContext);

  function handleCity(e: React.ChangeEvent<HTMLInputElement>) {
    setCity(e.target.value);
  }

  async function searchCity() {
    setContent(<Search />);
    const response = await fetch(
      encodeURI(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
      )
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
