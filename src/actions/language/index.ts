import _ from "lodash";
import { CLOSE_LANGUAGE_DROPDOWN, LANGUAGE_CHANGE, OPEN_LANGUAGE_DROPDOWN } from "./actions";

export const changeLanguage = (language: string) => {
  return {
    type: LANGUAGE_CHANGE,
    payload: {
      language: _.lowerCase(language),
    },
  };
};

export const openLanguageDropdown = (languageDropdownAnchorElement: HTMLElement) => {
  return {
    type: OPEN_LANGUAGE_DROPDOWN,
    payload: {
      languageDropdownAnchorElement: languageDropdownAnchorElement,
    },
  };
};

export const closeLanguageDropdown = () => {
  return {
    type: CLOSE_LANGUAGE_DROPDOWN,
  };
};
