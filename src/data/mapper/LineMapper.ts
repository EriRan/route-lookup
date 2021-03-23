import _ from "lodash";
import { LinesUnmapped, Line } from "./types";

class LineMapper {
  public map(linesUnmapped: LinesUnmapped): Array<Line> {
    const mappedLines = new Array<Line>();
    for (const lineName in linesUnmapped) {
      const mappedLine: Line = {
        name: _.capitalize(lineName),
        stopsAt: this.extractStops(linesUnmapped, lineName),
      };
      mappedLines.push(mappedLine);
    }
    return mappedLines;
  }

  /**
   * Todo: This is dumb. Adding new lines should not require changes to this class. Maybe one small transformation should be ran for the linjastot from reittiopas.json
   * @param linesUnmapped
   * @param lineName
   * @returns
   */
  private extractStops(
    linesUnmapped: LinesUnmapped,
    lineName: String
  ): Array<String> {
    switch (lineName) {
      case "keltainen":
        return linesUnmapped.keltainen;
      case "punainen":
        return linesUnmapped.punainen;
      case "sininen":
        return linesUnmapped.sininen;
      case "vihreä":
        return linesUnmapped.vihreä;
      default:
        console.error("Encountered unknown bus line: " + lineName);
        return new Array<String>();
    }
  }
}

export default LineMapper;
