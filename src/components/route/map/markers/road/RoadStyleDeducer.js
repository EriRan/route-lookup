/**
 * Deduces styles for roads. The more lines the road is included in, the more style objects will be provided.
 *
 * return Array<StyleObject>
 *
 * StyleObject : {
 *  Integer opacity
 *  String color
 * }
 */
class RoadStyleDeducer {
  deduce(includesLines) {
    if (!Array.isArray(includesLines) || includesLines.length === 0) {
      return new Array(this.createResponse(0.3, "gray"));
    }
    return this.deduceFromLines(includesLines);
  }

  deduceFromLines(includesLines) {
    const arrayResponse = [];
    includesLines.forEach((singleLine) => {
      arrayResponse.push(this.deduceOneLineStyle(singleLine));
    });
    return arrayResponse;
  }

  deduceOneLineStyle(colorString) {
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
        console.log(
          "Unrecognised line name: ",
          colorString,
          " Please define a color for it"
        );
        return this.createResponse(1.0, "black");
    }
  }

  createResponse(opacity, colorString) {
    return {
      opacity: opacity,
      color: colorString,
    };
  }
}

export default RoadStyleDeducer;
