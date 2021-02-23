import { isUndefinedOrNull } from "../../util/Utilities";

/**
 * Append road data to the provided stops
 */
class RoadMapper {
  map(mappedStops, roadsJson) {
    if (isUndefinedOrNull(roadsJson)) {
      return;
    }
    roadsJson.forEach((road) => {
      const mappedPointOneStop = mappedStops.get(road.mista);
      const mappedPointTwoStop = mappedStops.get(road.mihin);
      const mappedRoad = {};
      mappedRoad.from = mappedPointOneStop;
      mappedRoad.to = mappedPointTwoStop;
      mappedRoad.duration = road.kesto;
      mappedRoad.isReverse = false;
      mappedPointOneStop.roads.push(mappedRoad);
      mappedPointTwoStop.roads.push(
        createReverseRoad(mappedRoad, mappedPointOneStop, mappedPointTwoStop)
      );
    });

    function createReverseRoad(
      mappedRoad,
      mappedPointOneStop,
      mappedPointTwoStop
    ) {
      const reverseRoad = {};
      reverseRoad.from = mappedPointTwoStop;
      reverseRoad.to = mappedPointOneStop;
      reverseRoad.duration = mappedRoad.duration;
      reverseRoad.isReverse = true;
      return reverseRoad;
    }
  }
}

export default RoadMapper;
