import BusTrafficContainer from "./markers/BusTrafficContainer";
import { provideBusStopLocations } from "./markers/stop/location/busStopLocationProvider";
import { MAP_PADDING } from "./MapViewConstant";
import { MapViewProps } from "./types";
import { FunctionComponent } from "react";

const MapView: FunctionComponent<MapViewProps> = (props) => {
  //Start from the first bus stop in the props and crawl to next ones through the roads.
  const busStopLocations = provideBusStopLocations(
    props.stopMap.values().next().value
  );
  const roads = Array.from(props.stopMap.values()).flatMap(
    (stop) => stop.roads
  );
  return (
    <div className="map-background">
      <svg
        width={busStopLocations.xMax + MAP_PADDING}
        height={busStopLocations.yMax + MAP_PADDING}
      >
        <BusTrafficContainer
          roads={roads}
          busStopLocationMap={busStopLocations.busStopLocationMap}
        />
      </svg>
    </div>
  );
};

export default MapView;
