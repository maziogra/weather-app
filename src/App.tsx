import Nav from "./components/Nav";
import "./app.css";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

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

function App() {
  const content = useSelector((state: RootState) => state.content.content);
  return (
    <>
      <Nav />
      {content}
    </>
  );
}

export default App;
