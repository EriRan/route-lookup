import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calculateNewRoute } from "./calculation/calculateNewRoute";
import { changeStartOrDestinationStop } from "./change/changeStartOrDestinationStop";
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
      changeStartOrDestinationStop(state, action.payload);
      state.calculatedRoute = calculateNewRoute(state);
    },
  },
});

export const getStartAndDestination = createSelector([state => state.route.startStop, state => state.route.destinationStop], (startStop, destinationStop) => {
  return {
    startStop: startStop,
    destinationStop: destinationStop
  }
})

export const { setStartStop, setDestinationStop, stopClicked } =
  routeSlice.actions;

export default routeSlice.reducer;
