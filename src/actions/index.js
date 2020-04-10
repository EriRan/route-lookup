import routeDataApi from "../apis/transport-data"
import {
  GET_DATA
} from "./types";

export const getPublicTransportData = () => async dispatch => {
  const response = await routeDataApi.get();
  //Validate response contains: 1. Stops 2. Connections between stops 3. Public transport routes
  //If no response, use local backup
  dispatch({ type: GET_DATA, payload: response.data });
};