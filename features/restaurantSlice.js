import { createSlice } from "@reduxjs/toolkit";

export const rastaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    restaurant: {
      id: null,
      imgUrl: null,
      title: null,
      rating: null,
      genre: null,
      address: null,
      short_description: null,
      dishes: null,
    },
  },
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
  },
});

export const { setRestaurant } = rastaurantSlice.actions;

export const selectRestaurant = (state) => state.restaurant.restaurant;

export default rastaurantSlice.reducer;
