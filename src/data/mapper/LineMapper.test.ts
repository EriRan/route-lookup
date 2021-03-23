import LineMapper from "./LineMapper";
import { LinesUnmapped } from "./types";

const mapper = new LineMapper();
const mockLineData = createMockLinesJson();

function createMockLinesJson(): LinesUnmapped {
  return {
    punainen: ["A", "B", "C"],
    keltainen: ["Z", "X", "Y"],
    vihreä: ["C", "D", "Z"],
    sininen: ["R", "F", "S"],
  };
}

test("Can map lines", () => {
  mapper.map(mockLineData).forEach((mappedLine) => {
    expect(mappedLine.name).toBeDefined();
    expect(mappedLine.stopsAt).toBeInstanceOf(Array);
    expect(mappedLine.stopsAt.length).toBeGreaterThan(0);
  });
});
