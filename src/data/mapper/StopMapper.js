import RoadMapper from "./RoadMapper";

class StopMapper {
  map(transportData) {
    const mappedStops = new Map();
    transportData.pysakit.forEach((stop) => {
      const mappedStop = {};
      mappedStop.name = stop;
      mappedStop.roads = [];
      mappedStops.set(mappedStop.name, mappedStop);
    });
    new RoadMapper().map(mappedStops, transportData.tiet);
    return mappedStops;
  }
}

export default StopMapper;
