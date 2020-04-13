import _ from "lodash";

export function isUndefinedOrNull(value) {
  return _.isUndefined(value) || _.isNull(value);
}