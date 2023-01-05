import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  calculateNewRoute,
  changeStartOrDestination,
} from "./change/stopsStateChangeDeducer";
import { Payload, RouteStore } from "./types";

const initialState: RouteStore = {
  calculatedRoute: null,
  startStop: { name: null, hasErrors: false },
  destinationStop: { name: null, hasErrors: false },
};

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setStartStop(state, action: PayloadAction<Payload>) {
      state.startStop = action.payload;
      state.calculatedRoute = calculateNewRoute(state);
    },
    setDestinationStop(state, action: PayloadAction<Payload>) {
      state.destinationStop = action.payload;
      state.calculatedRoute = calculateNewRoute(state);
    },
    stopClicked(state, action: PayloadAction<Payload>) {
      changeStartOrDestination(state, action.payload);
      state.calculatedRoute = calculateNewRoute(state);
    },
  },
});

export const { setStartStop, setDestinationStop, stopClicked } =
  routeSlice.actions;

export default routeSlice.reducer;
