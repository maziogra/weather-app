import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { City } from "../../App";

interface SelectedCityState {
  selectedCity: City;
}

const initialState: SelectedCityState = {
  selectedCity: {
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
  },
};

const selectedCitySlice = createSlice({
  name: "selectedCity",
  initialState,
  reducers: {
    setSelectedCity: (state, action: PayloadAction<City>) => {
      state.selectedCity = action.payload;
    },
  },
});

export const { setSelectedCity } = selectedCitySlice.actions;
export default selectedCitySlice.reducer;
