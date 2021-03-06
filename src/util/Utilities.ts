import _ from "lodash";

export function isUndefinedOrNull(value: any) {
  return _.isUndefined(value) || _.isNull(value);
}

export function isUndefinedOrNullOrEmptyString(value: any) {
  return _.isUndefined(value) || _.isNull(value) || value === "";
}

export function isNullOrEmpty(value: any) {
  return _.isUndefined(value) || _.isEmpty(value);
}
