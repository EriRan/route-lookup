import TransportDataSingleton from "../data/TransportDataSingleton";
import UiContainer from "./ui/UiContainer";
import MapView from "./map/MapView";
import { CssBaseline } from "@material-ui/core";
import { initReactI18next, useTranslation } from "react-i18next";
import i18n from "i18next";
import translationsJson from "../../resources/translations/translations.json"

i18n.use(initReactI18next)
.init(translationsJson)

const App = () => {
  const transportData = TransportDataSingleton.getInstance();
  const { t } = useTranslation();
  return (
    <div className="app">
      <h2>{t("Welcome to React")}</h2>
      <CssBaseline />
      <UiContainer transportData={transportData} />
      <MapView stopMap={transportData.stopMap} />
    </div>
  );
};

export default App;
