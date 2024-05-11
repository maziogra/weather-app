import { useState } from "react";
import Search from "./Search";
import Home from "./Home";
import { useDispatch } from "react-redux";
import { setSearchResults } from "../store/search/search";
import { setContent } from "../store/search/content";

function Nav() {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  function handleCity(e: React.ChangeEvent<HTMLInputElement>) {
    setCity(e.target.value);
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      searchCity();
    }
  }

  async function searchCity() {
    dispatch(setContent(<Search />));
    const response = await fetch(
      encodeURI(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
      )
    );
    setCity("");
    const data = await response.json();
    dispatch(setSearchResults(data.results));
  }

  return (
    <>
      <nav>
        <span onClick={() => dispatch(setContent(<Home />))}>Weather</span>
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
