/**
 * Map the data provided in JSON to a object that can be handled more easily
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
        const mappedRoad = {};
        mappedRoad.pointOne = road.mista;
        mappedRoad.pointTwo = road.mihin;
        mappedRoad.duration = road.kesto;
        mappedRoad.isReverse = false;
        const mappedPointOneStop = mappedStops.get(mappedRoad.pointOne);
        mappedPointOneStop.roads.push(mappedRoad);
        const mappedPointTwoStop = mappedStops.get(mappedRoad.pointTwo);
        mappedPointTwoStop.roads.push(createReverseRoad(mappedRoad));
      });
    }

    function createReverseRoad(mappedRoad) {
      const reverseRoad = {};
      reverseRoad.pointOne = mappedRoad.pointTwo;
      reverseRoad.pointTwo = mappedRoad.pointOne;
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
