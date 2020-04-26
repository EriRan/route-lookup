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
 * Line {
 *  String name
 *  Array[] stopsAt
 * }
 */
class TransportDataMapper {
  map(transportData) {
    const mappedTransportData = {};
    mappedTransportData.stops = mapStops(transportData);
    mappedTransportData.lines = mapLines(transportData.linjastot);
    return mappedTransportData;

    function mapStops(transportData) {
      const mappedStops = new Map();
      transportData.pysakit.forEach((stop) => {
        const mappedStop = {};
        mappedStop.name = stop;
        mappedStop.roads = [];
        mappedStops.set(mappedStop.name, mappedStop);
      });
      mapRoads(mappedStops, transportData.tiet);
      return Array.from(mappedStops.values());
    }

    function mapRoads(mappedStops, roadsJson) {
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
    }

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

    function mapLines(linesJson) {
      const mappedLines = [];
      for (var lineName in linesJson) {
        const mappedLine = {};
        mappedLine.name = lineName;
        mappedLine.stopsAt = linesJson[lineName];
        mappedLines.push(mappedLine);
      }
      return mappedLines;
    }
  }
}

export default TransportDataMapper;
