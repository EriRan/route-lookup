import LineMapper from "./LineMapper";

const mapper = new LineMapper();
const mockLineData = createMockLinesJson();

function createMockLinesJson() {
  return {
    lineOne: ["A", "B", "C"],
    lineTwo: ["Z", "X", "Y"],
    lineThree: ["C", "D", "Z"],
  };
}

test("Can map lines", () => {
  mapper.map(mockLineData).forEach((mappedLine) => {
    expect(mappedLine.name).toBeDefined();
    expect(mappedLine.name[0]).toBe("L");
    expect(mappedLine.stopsAt).toBeInstanceOf(Array);
    expect(mappedLine.stopsAt.length).toBeGreaterThan(0);
  });
});
