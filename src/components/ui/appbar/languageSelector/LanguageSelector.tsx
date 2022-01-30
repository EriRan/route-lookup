import { Button, Menu } from "@material-ui/core";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLOSE_LANGUAGE_DROPDOWN,
  OPEN_LANGUAGE_DROPDOWN,
} from "../../../../actions/language/actions";
import { LanguageType } from "../../../../reducers/language/types";
import { RootState } from "../../../../reducers/types";
import LanguageSelectorItem from "./LanguageSelectorItem";

export default function LanguageSelector() {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isLanguageDropdownOpen = useSelector(
    (state: RootState) => state.language.isLanguageDropdownOpen
  );
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: OPEN_LANGUAGE_DROPDOWN,
    });
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    dispatch({ type: CLOSE_LANGUAGE_DROPDOWN });
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={isLanguageDropdownOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isLanguageDropdownOpen ? "true" : undefined}
        onClick={handleMenuOpen}
      >
        {getLanguageFlagEmoji(currentLanguage)}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isLanguageDropdownOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <LanguageSelectorItem language="en" />
        <LanguageSelectorItem language="fi" />
      </Menu>
    </div>
  );
}

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
