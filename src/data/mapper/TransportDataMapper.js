import StopDataMapper from "./StopDataMapper";

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
    mappedTransportData.stops = new StopDataMapper().map(transportData);
    mappedTransportData.lines = mapLines(transportData.linjastot);
    mapLinesToRoads(mappedTransportData);
    return mappedTransportData;

    function mapLines(linesJson) {
      const mappedLines = [];
      for (const lineName in linesJson) {
        const mappedLine = {};
        mappedLine.name = lineName;
        mappedLine.stopsAt = linesJson[lineName];
        mappedLines.push(mappedLine);
      }
      return mappedLines;
    }

    function mapLinesToRoads(mappedData) {
      for (const stop in mappedData.stops) {
        for (const road in stop.roads) {
          mappedData.lines.forEach(line => addLineIfRoadIncluded(road, line));
        }
      }
    }

    function addLineIfRoadIncluded(road, line) {
      
    }
  }
}

export default TransportDataMapper;
