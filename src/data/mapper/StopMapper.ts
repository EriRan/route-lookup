import RoadMapper from "./RoadMapper";
import { RoadUnmapped, Stop } from "./types";

class StopMapper {
  public map(
    unmappedStops: Array<String>,
    unmappedRoads: Array<RoadUnmapped>
  ): Map<String, Stop> {
    const mappedStops = new Map<String, Stop>();
    unmappedStops.forEach((unmappedStop) => {
      const mappedStop: Stop = {
        name: unmappedStop,
        roads: [],
      };
      mappedStops.set(mappedStop.name, mappedStop);
    });
    new RoadMapper().map(mappedStops, unmappedRoads);
    return mappedStops;
  }
}

export default StopMapper;
