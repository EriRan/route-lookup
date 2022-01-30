import { LanguageStore } from "./language/types";
import { RouteStore } from "./route/types";

//Todo: Is this how this is supposed to be done? Read through React Redux typescript guide. They seemed to recommend not using connect everywhere like I am as well
export type RootState = {
  route: RouteStore;
  language: LanguageStore;
};
