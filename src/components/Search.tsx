import { useContext } from "react";
import {
  City,
  ContentContext,
  SearchContext,
  SelectedCityContext,
} from "../App";
import Forecast from "./Forecast";

function Search() {
  const { searchResult } = useContext(SearchContext);
  const { setContent } = useContext(ContentContext);
  const { setSelectedCity } = useContext(SelectedCityContext);

  function handleClick(id: number) {
    const selected: City | undefined = searchResult.find((c) => c.id === id);
    if (selected) {
      setSelectedCity(selected);
      setContent(<Forecast />);
      console.log(selected);
    }
  }

  return (
    <>
      <div className="container">
        {searchResult?.map((c) => {
          return (
            <div
              key={c.id}
              onClick={() => handleClick(c.id)}
              className="searchElement"
            >
              {c.name} - {c.country} - {c.timezone}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Search;
