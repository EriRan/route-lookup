import TransportDataSingleton from "../data/TransportDataSingleton";
import UiContainer from "./ui/UiContainer";
import MapView from "./map/MapView";
import { CssBaseline } from "@material-ui/core";


const App = () => {
  const transportData = TransportDataSingleton.getInstance();
  return (
    <div className="app">
      <CssBaseline />
      <UiContainer transportData={transportData} />
      <MapView stopMap={transportData.stopMap} />
    </div>
  );
};

export default App;
