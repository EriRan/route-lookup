/**
 * Deduces correct style for a RoadLine depending on what lines does it have
 */
class RoadStyleDeducer {
  deduce(includesLines) {
    if (!Array.isArray(includesLines) || includesLines.length === 0) {
      return this.createResponse(0.3, "gray");
    }
    if (includesLines.length === 1) {
      return this.deduceFromSingleLine(includesLines[0])
    }
    return this.deduceFromMultipleLines(includesLines);
  }

  deduceFromSingleLine(colorString) {
    switch (colorString) {
      case "keltainen":
        return this.createResponse(1.0, "yellow");
      case "punainen":
        return this.createResponse(1.0, "red");
      case "vihreä":
        return this.createResponse(1.0, "green");
      case "sininen":
        return this.createResponse(1.0, "blue");
      default:
        console.log("Unrecognised line name: ", colorString, " Please define a color for it");
        return this.createResponse(1.0, "black");
    }
  }

  deduceFromMultipleLines(includesLines) {
    return this.createResponse(1.0, "pink");
  }

  createResponse(opacity, colorString) {
    return {
        opacity: opacity,
        color: colorString,
    }
  }
}

export default RoadStyleDeducer;
