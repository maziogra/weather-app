import { createContext, useState } from "react";
import Nav from "./components/Nav";
import Search from "./components/Search";
import "./app.css";

type City = {
  admin1: string;
  admin1_id: number;
  admin2: string;
  admin2_id: number;
  admin3: string;
  admin3_id: number;
  country: string;
  country_code: string;
  country_id: number;
  elevation: number;
  feature_code: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  timezone: string;
};

export const SearchContext = createContext<{
  searchResult: City[];
  setSearchResult: React.Dispatch<React.SetStateAction<City[]>>;
}>({
  searchResult: [],
  setSearchResult: () => {},
});

function App() {
  const [searchResult, setSearchResult] = useState<City[]>([]);
  return (
    <>
      <SearchContext.Provider value={{ searchResult, setSearchResult }}>
        <Nav />
        <Search />
      </SearchContext.Provider>
    </>
  );
}

export default App;
