class RouteCalculator {
  constructor(transportData) {
    this.transportData = transportData;
  }

  calculate(startStop, destinationStop) {
    if (startStop === destinationStop) {
      return "Olet jo määränpäässäsi.";
    }
    const settledNodes = [startStop];
    const unsettledNodes = this.getOtherNodes(startStop, this.transportData.stops);
    return `Path from ${startStop} to ${destinationStop}`;
  }

  getOtherNodes(startStop, stops) {
    const otherNodes = [];
    stops.forEach(stop => {
      if (stop.name !== startStop) {
        otherNodes.push(stop.name);
      }
    })
    return otherNodes;
  }
}

export default RouteCalculator;
