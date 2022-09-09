import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlice";
import restaurantReducer from "./features/restaurantSlice";

export default configureStore({
  reducer: {
    basket: basketReducer,
    restaurant: restaurantReducer,
  },
});
