import transportData from "../data/reittiopas.json";
import TransportDataMapper from "./mapper/TransportDataMapper";
import {
  GET_DATA
} from "./types";

export const getPublicTransportData = () => async dispatch => {
  //Validate response contains: 1. Stops 2. Connections between stops 3. Public transport routes
  //If no response, use local backup
  let mapper = new TransportDataMapper();

  dispatch({ type: GET_DATA, payload: mapper.map(transportData)});
};