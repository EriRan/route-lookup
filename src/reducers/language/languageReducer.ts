import i18next from "i18next";
import {
  CLOSE_LANGUAGE_DROPDOWN,
  LANGUAGE_CHANGE,
  OPEN_LANGUAGE_DROPDOWN,
} from "../../actions/language/actions";
import { Action, LanguageStore } from "./types";

const INITIAL_STATE: LanguageStore = {
  language: "fi",
  isLanguageDropdownOpen: false
};

export const LANGUAGE_REDUCERS = (
  state = INITIAL_STATE,
  action: Action
): LanguageStore => {
  switch (action.type) {
    case LANGUAGE_CHANGE:
      i18next.changeLanguage(action.payload.language);
      return {
        ...state,
        language: action.payload.language,
      };
    case OPEN_LANGUAGE_DROPDOWN:
      return {
        ...state,
        isLanguageDropdownOpen: true
      };
    case CLOSE_LANGUAGE_DROPDOWN:
      return {
        ...state,
        isLanguageDropdownOpen: false
      };
    default:
      return state;
  }
};
