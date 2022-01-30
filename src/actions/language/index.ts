import _ from "lodash";
import { LANGUAGE_CHANGE } from "./actions";

export const changeLanguage = (language: string) => {
  return {
    type: LANGUAGE_CHANGE,
    payload: {
      language: _.lowerCase(language)
    },
  };
};