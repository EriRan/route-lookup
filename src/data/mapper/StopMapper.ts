import RoadMapper from "./RoadMapper";
import { RoadUnmapped, Stop } from "./types";

class StopMapper {
  public map(
    unmappedStops: Array<string>,
    unmappedRoads: Array<RoadUnmapped>
  ): Map<string, Stop> {
    const mappedStops = new Map<string, Stop>();
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
