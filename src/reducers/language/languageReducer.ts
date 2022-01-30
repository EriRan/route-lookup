import i18next from "i18next";
import { LANGUAGE_CHANGE } from "../../actions/language/actions";
import { Action, LanguageStore } from "./types";

const INITIAL_STATE: LanguageStore = {
  language: "fi",
};

export const REDUCERS = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case LANGUAGE_CHANGE:
      i18next.changeLanguage(action.payload.language);
      return {
        ...state,
        language: action.payload
      }
    default:
      return state;
  }
};