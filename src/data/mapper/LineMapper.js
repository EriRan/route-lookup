import _ from "lodash";

class LineMapper {
  map(linesJson) {
    const mappedLines = [];
    for (const lineName in linesJson) {
      const mappedLine = {};
      mappedLine.name = _.capitalize(lineName);
      mappedLine.stopsAt = linesJson[lineName];
      mappedLines.push(mappedLine);
    }
    return mappedLines;
  }
}

export default LineMapper;
