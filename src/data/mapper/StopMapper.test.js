import StopMapper from "./StopMapper";

const mapper = new StopMapper();

function createMockStopsJson() {
  return {
    pysakit: ["A", "B", "C"],
  };
}

test("Stops contain required variables", () => {
  const stopMap = mapper.map(createMockStopsJson());
  expect(stopMap).toBeInstanceOf(Map);
  Array.from(stopMap.entries()).forEach((stopEntry) => {
    const key = stopEntry[0];
    const value = stopEntry[1];

    expect(key).toBeDefined();
    expect(value).toBeDefined();
    expect(value.roads).toBeInstanceOf(Array);
  });
});
