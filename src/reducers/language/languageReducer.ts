import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "../../i18n";
import { LanguageStore, Payload } from "./types";
import { RootState } from "..";

const initialState: LanguageStore = {
  language: "fi",
  isLanguageDropdownOpen: false,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    languageChange(state, action: PayloadAction<Payload>) {
      if (!action.payload.language) {
        return state;
      }
      const newLanguage = action.payload.language.toLowerCase();
      if (newLanguage !== "fi" && newLanguage !== "en") {
        console.warn("Unsupported language: " + newLanguage);
        return state;
      }
      changeLanguage(newLanguage);
      // Direct state modification is allowed here with Immer that is included in Redux toolkit
      // This is only allowed inside createSlice
      state.language = newLanguage;
    },
    openLanguageDropdown(state) {
      state.isLanguageDropdownOpen = true;
    },
    closeLanguageDropdown(state) {
      state.isLanguageDropdownOpen = false;
    },
  },
});

type Return = (state: RootState) => string | undefined;

export const getLanguageData = createSelector([state => state.language.language, state => state.language.isLanguageDropdownOpen], (language, isLanguageDropdownOpen) => {
  return {
    language: language,
    isLanguageDropdownOpen: isLanguageDropdownOpen
  }
})

function changeLanguage(language: string) {
  i18n.changeLanguage(language);
}

export const { languageChange, openLanguageDropdown, closeLanguageDropdown } =
  languageSlice.actions;

export default languageSlice.reducer;
