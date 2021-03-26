import StopMapper from "./StopMapper";
import LineMapper from "./LineMapper";

import { isUndefinedOrNull } from "../../util/Utilities";
import { Line, Road, TransportData, TransportDataUnmapped } from "./types";

/**
 * Map the data provided in JSON to a object that can be handled more easily
 */
class TransportDataMapper {
  map(transportData: TransportDataUnmapped) {
    const mappedTransportData: TransportData = {
      stopMap: new StopMapper().map(transportData.pysakit, transportData.tiet),
      lines: new LineMapper().map(transportData.linjastot),
    };
    mapLinesToRoads(mappedTransportData);
    return mappedTransportData;

    function mapLinesToRoads(mappedData: TransportData) {
      mappedData.stopMap.forEach((stop) => {
        //Only the map value is needed here, so other parameters are omitted
        stop.roads.forEach((road) => {
          road.includesLines = [];
          mappedData.lines.forEach((line) => addLineIfRoadIncluded(road, line));
        });
      });
    }

    /**
     * Go through all stops in a bus line and check if the current road connects two of the stops that are next to each other in the bus stops that the bus line goes through
     *
     * Todo: This is really funky. Is there a better way to do this?
     * @param road
     * @param line
     */
    function addLineIfRoadIncluded(road: Road, line: Line) {
      let toIndex: number | null = null;
      let fromIndex: number | null = null;
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
        indexesAreNextToEachOther(toIndex!, fromIndex!)
      ) {
        road.includesLines!.push(line.name);
      }
    }

    function indexesAreNextToEachOther(toIndex: number, fromIndex: number) {
      return toIndex - 1 === fromIndex || toIndex + 1 === fromIndex;
    }
  }
}

export default TransportDataMapper;
