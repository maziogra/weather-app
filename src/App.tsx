import React, { createContext, useState } from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";
import "./app.css";

export type City = {
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

const emptyCity: City = {
  admin1: "",
  admin1_id: 0,
  admin2: "",
  admin2_id: 0,
  admin3: "",
  admin3_id: 0,
  country: "",
  country_code: "",
  country_id: 0,
  elevation: 0,
  feature_code: "",
  id: 0,
  latitude: 0,
  longitude: 0,
  name: "",
  population: 0,
  timezone: "",
};

export const SearchContext = createContext<{
  searchResult: City[];
  setSearchResult: React.Dispatch<React.SetStateAction<City[]>>;
}>({
  searchResult: [],
  setSearchResult: () => {},
});

export const ContentContext = createContext<{
  content: React.ReactElement;
  setContent: React.Dispatch<React.SetStateAction<React.ReactElement>>;
}>({ content: <Home />, setContent: () => {} });

export const SelectedCityContext = createContext<{
  selectedCity: City;
  setSelectedCity: React.Dispatch<React.SetStateAction<City>>;
}>({
  selectedCity: emptyCity,
  setSelectedCity: () => {},
});

function App() {
  const [searchResult, setSearchResult] = useState<City[]>([]);
  const [content, setContent] = useState<React.ReactElement>(<Home />);
  const [selectedCity, setSelectedCity] = useState<City>(emptyCity);

  return (
    <>
      <SearchContext.Provider value={{ searchResult, setSearchResult }}>
        <ContentContext.Provider value={{ content, setContent }}>
          <SelectedCityContext.Provider
            value={{ selectedCity, setSelectedCity }}
          >
            <Nav />
            {content}
          </SelectedCityContext.Provider>
        </ContentContext.Provider>
      </SearchContext.Provider>
    </>
  );
}

export default App;
