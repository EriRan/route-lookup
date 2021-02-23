import _ from "lodash";

export function isUndefinedOrNull(value) {
  return _.isUndefined(value) || _.isNull(value);
}

export function isUndefinedOrNullOrEmptyString(value) {
  return _.isUndefined(value) || _.isNull(value) || value === "";
}
