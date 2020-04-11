/**
 * Map the data provided in JSON to a object that can be handled more easily
 */
class TransportDataMapper {
  map(transportData) {
    const mappedTransportData = {};

    mappedTransportData.stops = transportData.pysakit;
    mappedTransportData.roads = mapRoutes(transportData.tiet);
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

    function mapRoutes(routesJson) {
      const mappedRoutes = [];
      routesJson.map((jsonRoute) => {
        const mappedRoute = {};
        mappedRoute.from = jsonRoute.mista;
        mappedRoute.to = jsonRoute.mihin;
        mappedRoute.duration = jsonRoute.kesto;
        mappedRoutes.push(mappedRoute);
      });
      return mappedRoutes;
    }
  }
}

export default TransportDataMapper;
