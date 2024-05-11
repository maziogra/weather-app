import Forecast from "./Forecast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setSelectedCity } from "../store/search/selectedCity";
import { setContent } from "../store/search/content";
import { City } from "../App";

function Search() {
  const searchResult = useSelector(
    (state: RootState) => state.search.searchResult
  );
  const dispatch = useDispatch();

  function handleClick(id: number) {
    const selected: City | undefined = searchResult.find((c) => c.id === id);
    if (selected) {
      dispatch(setSelectedCity(selected));
      dispatch(setContent(<Forecast />));
    }
  }

  return (
    <>
      <div className="container">
        {searchResult ? (
          searchResult?.map((c) => {
            return (
              <div
                key={c.id}
                onClick={() => handleClick(c.id)}
                className="searchElement"
              >
                {c.name} - {c.country} - {c.timezone}
              </div>
            );
          })
        ) : (
          <h1>NO RESULTS</h1>
        )}
      </div>
    </>
  );
}

export default Search;
