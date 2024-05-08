import { useContext, useState } from "react";
import { ContentContext, SearchContext } from "../App";
import Search from "./Search";
import Home from "./Home";

function Nav() {
  const [city, setCity] = useState("");
  const { setSearchResult } = useContext(SearchContext);
  const { setContent } = useContext(ContentContext);

  function handleCity(e: React.ChangeEvent<HTMLInputElement>) {
    setCity(e.target.value);
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      searchCity();
    }
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
        <span onClick={() => setContent(<Home />)}>Weather</span>
        <div>
          <input
            type="text"
            value={city}
            onChange={handleCity}
            onKeyDown={handleKey}
          />
          <button onClick={searchCity}>SEARCH</button>
        </div>
      </nav>
    </>
  );
}

export default Nav;
