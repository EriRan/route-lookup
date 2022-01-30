import { Button, Menu, MenuItem } from "@material-ui/core";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LANGUAGE_CHANGE } from "../../../actions/language/actions";
import { LanguageType } from "../../../reducers/language/types";
import { RootState } from "../../../reducers/types";

export default function LanguageSelector() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageSelectionChange = (language: LanguageType) => {
    setAnchorEl(null);
    dispatch({ type: LANGUAGE_CHANGE, payload: { language: language } });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleMenuOpen}
      >
        {getLanguageFlagEmoji(currentLanguage)}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => handleLanguageSelectionChange("fi")}
          selected={currentLanguage === "fi"}
        >
          🇫🇮
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageSelectionChange("en")}
          selected={currentLanguage === "en"}
        >
          🇺🇸
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageSelectionChange("jp")}
          selected={currentLanguage === "jp"}
        >
          🇯🇵
        </MenuItem>
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
    case "jp":
      return "🇯🇵";
    default:
      throw new Error("Unimplemented handling for language: " + language);
  }
};
