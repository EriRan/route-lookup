import { Button, Menu } from "@material-ui/core";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeLanguageDropdown,
  openLanguageDropdown,
} from "../../../../actions/language";
import { LanguageType } from "../../../../reducers/language/types";
import { RootState } from "../../../../reducers/types";
import LanguageSelectorItem from "./languageSelectorItem/LanguageSelectorItem";
import i18next from "i18next";
import convertLanguageFlagEmoji from "./languageToFlagEmojiConverter";

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

  // Get all available languages and create selector items for each language
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
        {convertLanguageFlagEmoji(languageState.language)}
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
