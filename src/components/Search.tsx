import { useContext } from "react";
import { SearchContext } from "../App";

function Search() {
  const { searchResult } = useContext(SearchContext);
  return (
    <>
      <div className="container">
        {searchResult.map((c) => {
          return (
            <div key={c.id} className="searchElement">
              {c.name} - {c.country} - {c.timezone}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Search;
