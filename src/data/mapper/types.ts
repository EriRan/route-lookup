/**
 * Full data coming from reittiopas.json mapped as a Typescript type
 */
export type TransportDataUnmapped = {
  pysakit: Array<String>; //Unmapped stops
  tiet: Array<RoadUnmapped>;
  linjastot: LinesUnmapped;
};

/**
 * Linjastot in reittiopas.json which provide all available buslines and the bus stops they stop on
 */
export type LinesUnmapped = {
  keltainen: Array<String>;
  punainen: Array<String>;
  vihreä: Array<String>;
  sininen: Array<String>;
};

/**
 * Unmapped roads from reittiopas.json that describe connections from one bus stop to another and how long do they take
 */
export type RoadUnmapped = {
  mista: String;
  mihin: String;
  kesto: number;
};

//Unmapped stops are stored in a array of Strings

/**
 * Full transport data from reittiopas.json mapped into a more convenient format
 */
export type TransportData = {
  stopMap: Map<String, Stop>;
  lines: Array<Line>;
};

/**
 * Busline that runs on the roads
 */
export type Line = {
  name: String;
  stopsAt: Array<String>;
};

/**
 * Road between two stops
 */
export type Road = {
  from: Stop;
  to: Stop;
  duration: number;
  isReverse: boolean;
  includesLines?: Array<String>;
};

export type Stop = {
  name: String;
  roads: Array<Road>;
};
