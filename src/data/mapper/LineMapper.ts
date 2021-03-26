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
    lineName: string
  ): Array<string> {
    return linesUnmapped[lineName];
  }
}

export default LineMapper;
