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
 * Busline that runs on the roads
 */
export type Line = {
  name: String;
  stopsAt: Array<String>;
};
