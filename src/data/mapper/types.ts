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
};

export type Stop = {
  name: String;
  roads: Array<Road>;
};
