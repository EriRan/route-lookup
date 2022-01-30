export type Action = {
  type: string; // I would like this to have only values from actions.ts but I don't know how to do that.
  payload: Payload;
};

export type LanguageType = "fi" | "en";

export type LanguageStore = {
  language: LanguageType;
  isLanguageDropdownOpen: boolean;
};

export type Payload = LanguageState;

export type LanguageState = {
  language: LanguageType;
};
