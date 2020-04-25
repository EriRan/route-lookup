class RouteCalculator {
  constructor(transportData) {
    this.transportData = transportData;
  }

  calculate(startStop, destinationStop) {
    if (startStop === destinationStop) {
      return "Olet jo määränpäässäsi.";
    }
    return `Path from ${startStop} to ${destinationStop}`;
  }
}

export default RouteCalculator;
