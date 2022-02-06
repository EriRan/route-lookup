import { Button, Menu } from "@material-ui/core";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeLanguageDropdown,
  openLanguageDropdown,
} from "../../../../actions/language";
import { LanguageType } from "../../../../reducers/language/types";
import { RootState } from "../../../../reducers/types";
import LanguageSelectorItem from "./LanguageSelectorItem";
import i18next from "i18next";

export default function LanguageSelector() {
  const dispatch = useDispatch();
  const languageState = useSelector((state: RootState) => {
    return {
      isLanguageDropdownOpen: state.language.isLanguageDropdownOpen,
      anchorElement: state.language.languageDropdownAnchorElement,
      language: state.language.language,
    };
  });

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(openLanguageDropdown(event.currentTarget));
  };

  const handleClose = () => {
    dispatch(closeLanguageDropdown());
  };

  const languageSelectorItems = Object.keys(
    i18next.services.resourceStore.data
  ).map((availableLanguage) => (
    <LanguageSelectorItem
      key={`language-selector-${availableLanguage}`}
      language={availableLanguage}
      isSelected={languageState.language === availableLanguage}
    />
  ));
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={
          languageState.isLanguageDropdownOpen ? "basic-menu" : undefined
        }
        aria-haspopup="true"
        aria-expanded={languageState.isLanguageDropdownOpen ? "true" : "false"}
        onClick={handleMenuOpen}
      >
        {getLanguageFlagEmoji(languageState.language)}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={languageState.anchorElement}
        open={languageState.isLanguageDropdownOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {languageSelectorItems}
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
