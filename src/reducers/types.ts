import { RouteStore } from "./route/types";

//Todo: There was a clever trick in react redux documentation, where the type was got with <typeof store.getState>. Make use of this
export type RootState = {
  route: RouteStore;
};
