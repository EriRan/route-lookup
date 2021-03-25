/**
 * Full data coming from reittiopas.json mapped as a Typescript type
 */
export type TransportDataUnmapped = {
  pysakit: Array<string>; //Unmapped stops
  tiet: Array<RoadUnmapped>;
  linjastot: LinesUnmapped;
};

/**
 * Linjastot in reittiopas.json which provide all available buslines and the bus stops they stop on
 */
export type LinesUnmapped = {
  keltainen: Array<string>;
  punainen: Array<string>;
  vihreä: Array<string>;
  sininen: Array<string>;
};

/**
 * Unmapped roads from reittiopas.json that describe connections from one bus stop to another and how long do they take
 */
export type RoadUnmapped = {
  mista: string;
  mihin: string;
  kesto: number;
};

//Unmapped stops are stored in a array of strings

/**
 * Full transport data from reittiopas.json mapped into a more convenient format
 */
export type TransportData = {
  stopMap: Map<string, Stop>;
  lines: Array<Line>;
};

/**
 * Busline that runs on the roads
 */
export type Line = {
  name: string;
  stopsAt: Array<string>;
};

/**
 * Road between two stops
 */
export type Road = {
  from: Stop;
  to: Stop;
  duration: number;
  isReverse: boolean;
  includesLines?: Array<string>;
};

export type Stop = {
  name: string;
  roads: Array<Road>;
};
