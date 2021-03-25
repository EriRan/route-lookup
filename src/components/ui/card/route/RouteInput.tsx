import React from "react";
import _ from "lodash";

import { TextField } from "@material-ui/core";
import {
  isUndefinedOrNull,
  isUndefinedOrNullOrEmptyString,
} from "../../../../util/Utilities";
import { RouteInputEvent, RouteInputProps } from "./types";
import { Stop } from "../../../../data/mapper/types";

class RouteInput extends React.Component<RouteInputProps, {}> {
  render() {
    return (
      <TextField
        id="outlined-basic"
        className="center-input"
        label={this.props.label}
        autoFocus={this.props.autoFocus}
        value={this.getCurrentValue()}
        variant="outlined"
        margin="dense"
        color="primary"
        //onChange calls an action, which sets the value and whether there are errors.
        //Once the state change is applied here, text input will get the error status
        //from the state
        onChange={this.handleChange.bind(this)}
        error={this.hasError()}
      />
    );
  }

  private getCurrentValue() {
    if (
      !isUndefinedOrNull(this.props.inputStopData) &&
      !isUndefinedOrNull(this.props.inputStopData!.name)
    ) {
      return this.props.inputStopData!.name;
    }
    return "";
  }

  private handleChange(event: RouteInputEvent) {
    //Some input validation at first
    if (_.isEmpty(event.target.value)) {
      this.props.onChangeFunction(
        "",
        this.isInputInvalid("", this.props.stopMap)
      );
    }
    //Material UI https://material-ui.com/es/guides/typescript/#handling-value-and-event-handlers
    if (typeof event.target.value !== "string") {
      console.error("Non string input received");
      return;
    }

    const value = _.upperCase(event.target!.value as string);
    this.props.onChangeFunction(
      value,
      this.isInputInvalid(value, this.props.stopMap)
    );
  }

  private hasError(): boolean {
    if (
      isUndefinedOrNull(this.props.inputStopData) ||
      isUndefinedOrNull(this.props.inputStopData?.hasErrors)
    ) {
      return false;
    }
    return this.props.inputStopData!.hasErrors!;
  }

  private isInputInvalid(input: string, stopMap: Map<string, Stop>) {
    return !isUndefinedOrNullOrEmptyString(input) && !stopMap.has(input);
  }
}

export default RouteInput;
