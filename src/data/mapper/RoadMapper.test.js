import RoadMapper from "./RoadMapper";

const mapper = new RoadMapper();

function createMockStopMap() {
  const stopMap = new Map();
  const stopNames = ["A", "B", "C"];
  for (let stopName of stopNames) {
    stopMap.set(stopName, {
      name: stopName,
      roads: [],
    });
  }
  return stopMap;
}
function createMockRoadJson(from, to, duration) {
  return {
    mista: from,
    mihin: to,
    kesto: duration,
  };
}

test("Can map roads to stops", () => {
  const roadData = [];
  roadData.push(createMockRoadJson("A", "B", 1));
  roadData.push(createMockRoadJson("B", "C", 1));
  const stopData = createMockStopMap();

  mapper.map(stopData, roadData);
  expect(stopData.get("A").roads.length).toBe(1);
  expect(stopData.get("B").roads.length).toBe(2);
  expect(stopData.get("C").roads.length).toBe(1);
});

test("Reverse roads included", () => {
  const roadData = [];
  roadData.push(createMockRoadJson("A", "B", 1));
  const stopData = createMockStopMap();

  mapper.map(stopData, roadData);
  const aRoads = stopData.get("A").roads;
  expect(aRoads[0].duration).toBe(1);
  expect(aRoads[0].isReverse).toBe(false);

  const bRoads = stopData.get("B").roads;
  expect(bRoads[0].duration).toBe(1);
  expect(bRoads[0].isReverse).toBe(true);
});

test("No roads", () => {
  const roadData = [];
  const stopData = createMockStopMap();

  mapper.map(stopData, roadData);
  expect(stopData.get("A").roads.length).toBe(0);
  expect(stopData.get("B").roads.length).toBe(0);
  expect(stopData.get("C").roads.length).toBe(0);
});