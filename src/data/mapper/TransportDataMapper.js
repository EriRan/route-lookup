import StopMapper from "./StopMapper";
import LineMapper from "./LineMapper";

import { isUndefinedOrNull } from "../../util/Utilities";

/**
 * Map the data provided in JSON to a object that can be handled more easily
 *
 * Response:
 * Object {
 *  Map<String, Stop> stops
 *  Array<Line> lines
 * }
 * Stop {
 *  String name
 *  Array<Road> roads
 * }
 * Road {
 *  Stop to
 *  Stop from
 *  Array<String> includesLines
 *  Boolean isReverse
 * }
 * Line {
 *  String name
 *  Array[] stopsAt
 * }
 */
class TransportDataMapper {
  map(transportData) {
    const mappedTransportData = {};
    mappedTransportData.stops = new StopMapper().map(transportData);
    mappedTransportData.lines = new LineMapper().map(
      transportData.linjastot
    );
    mapLinesToRoads(mappedTransportData);
    return mappedTransportData;

    function mapLinesToRoads(mappedData) {
      for (const stop of mappedData.stops.values()) {
        stop.roads.forEach((road) => {
          mappedData.lines.forEach((line) => addLineIfRoadIncluded(road, line));
        });
      }
    }

    function addLineIfRoadIncluded(road, line) {
      var toIndex = null;
      var fromIndex = null;
      for (let i = 0; i < line.stopsAt.length; i++) {
        let iteratedStop = line.stopsAt[i];
        if (iteratedStop === road.to.name) {
          toIndex = i;
        } else if (iteratedStop === road.from.name) {
          fromIndex = i;
        }
      }
      if (
        !isUndefinedOrNull(toIndex) &&
        !isUndefinedOrNull(fromIndex) &&
        indexesAreNextToEachOther(toIndex, fromIndex)
      ) {
        if (isUndefinedOrNull(road.includesLines)) {
          road.includesLines = [];
        }
        road.includesLines.push(line.name);
      }
    }

    function indexesAreNextToEachOther(toIndex, fromIndex) {
      return toIndex - 1 === fromIndex || toIndex + 1 === fromIndex;
    }
  }
}

export default TransportDataMapper;
