/**
 * Map the data provided in JSON to a object that can be handled more easily
 */
class TransportDataMapper {
  map(transportData) {
    const mappedTransportData = {};

    mappedTransportData.stops = transportData.pysakit;
    mappedTransportData.roads = transportData.tiet;
    mappedTransportData.busLines = mapBuslines(transportData.linjastot);

    return mappedTransportData;

    function mapBuslines(buslinesJson) {
      const mappedBusLines = [];
      for (var lineName in buslinesJson) {
        const mappedBusline = {};
        mappedBusline.name = lineName;
        mappedBusline.stopsAt = buslinesJson[lineName];
        mappedBusLines.push(mappedBusline);
      }
      return mappedBusLines;
    }
  }
}
export default TransportDataMapper;
