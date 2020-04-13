import _ from "lodash";

import { FIRST_LOCATION } from "./BusStopConstant";
import { provideNextLocation } from "./NextLocationProvider";
import { RIGHT } from "./NextBusStopDirection";

class BusStopLocationProvider {
  provide(firstStop) {
    const alreadyDeducedStops = new Map();
    this.addOneLocation(alreadyDeducedStops, firstStop, FIRST_LOCATION);
    return alreadyDeducedStops;
  }

  addOneLocation(alreadyDeducedStops, stopData, location) {
    const alreadyDeducedStop = alreadyDeducedStops.get(stopData.name);
    if (_.isUndefined(alreadyDeducedStop) || _.isNull(alreadyDeducedStop)) {
      alreadyDeducedStops.set(stopData.name, {
        x: location.x,
        y: location.y,
      });
      const nextDirectionIndexContainer = { next: RIGHT };
      stopData.roads
        .filter((road) => {
          return road.isReverse === false
        })
        .forEach((road) => {
          this.addOneLocation(
            alreadyDeducedStops,
            road.to,
            this.deduceNextLocation(
              road.to,
              nextDirectionIndexContainer,
              alreadyDeducedStops,
              location
            )
          );
        });
    }
  }

  deduceNextLocation(
    nextStop,
    nextDirectionIndexContainer,
    renderedStops,
    currentLocation
  ) {
    const alreadyDeducedStop = renderedStops.get(nextStop.name);
    if (_.isUndefined(alreadyDeducedStop) || _.isNull(alreadyDeducedStop)) {
      const nextLocation = provideNextLocation(
        currentLocation,
        nextDirectionIndexContainer.next
      );
      nextDirectionIndexContainer.next++;
      return nextLocation;
    } else {
      return null;
    }
  }
}

export default BusStopLocationProvider;
