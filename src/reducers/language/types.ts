export type Action = {
  type: string; // I would like this to have only values from actions.ts but I don't know how to do that.
  payload: Payload;
};

export type LanguageStore = {
  language: string;
};

export type Payload = LanguageState;

export type LanguageState = {
  language: string;
};