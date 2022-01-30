import { MenuItem } from "@material-ui/core";
import React from "react";
import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLOSE_LANGUAGE_DROPDOWN,
  LANGUAGE_CHANGE,
} from "../../../../actions/language/actions";
import { LanguageType } from "../../../../reducers/language/types";
import { RootState } from "../../../../reducers/types";

type Props = {
  language: LanguageType;
};

const LanguageSelectorItem: FunctionComponent<Props> = (props: Props) => {
  const dispatch = useDispatch();

  const handleLanguageSelectionChange = (language: LanguageType) => {
    dispatch({ type: LANGUAGE_CHANGE, payload: { language: language } });
    dispatch({ type: CLOSE_LANGUAGE_DROPDOWN });
  };

  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );

  const getLanguageFlagEmoji = (language: LanguageType) => {
    switch (language) {
      case "fi":
        return "🇫🇮";
      case "en":
        return "🇺🇸";
      default:
        throw new Error("Unimplemented handling for language: " + language);
    }
  };

  return (
    <MenuItem
      onClick={() => handleLanguageSelectionChange(props.language)}
      selected={currentLanguage === props.language}
    >
      {getLanguageFlagEmoji(props.language)}
    </MenuItem>
  );
};

export default LanguageSelectorItem;
