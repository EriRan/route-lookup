export type LanguageType = "fi" | "en";

export type LanguageStore = {
  language: LanguageType;
  isLanguageDropdownOpen: boolean;
};

export type Payload = {
  language?: string;
  languageDropdownAnchorElement?: any; // TODO: this is an HTML element which should not be in Redux
};
