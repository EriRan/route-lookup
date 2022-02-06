import { MenuItem } from "@material-ui/core";
import { forwardRef, FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import {
  CLOSE_LANGUAGE_DROPDOWN,
  LANGUAGE_CHANGE,
} from "../../../../actions/language/actions";
import { LanguageType } from "../../../../reducers/language/types";

type Props = {
  language: LanguageType;
  isSelected: boolean;
};

const LanguageSelectorItem: FunctionComponent<Props> = forwardRef((props: Props, _ref) => {
  const dispatch = useDispatch();

  const handleLanguageSelectionChange = (language: LanguageType) => {
    // Don't bother making a redux call if we are selecting already selected language
    if (!props.isSelected) {
      dispatch({ type: LANGUAGE_CHANGE, payload: { language: language } });
    }
    dispatch({ type: CLOSE_LANGUAGE_DROPDOWN });
  };

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
      selected={props.isSelected}
    >
      {getLanguageFlagEmoji(props.language)}
    </MenuItem>
  );
});

export default LanguageSelectorItem;
