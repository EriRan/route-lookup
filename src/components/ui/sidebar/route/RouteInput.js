import React from "react";
import _ from "lodash";

import { TextField } from "@material-ui/core";
import { isUndefinedOrNullOrEmptyString } from "../../../../util/Utilities";

class RouteInput extends React.Component {
  render() {
    return (
      <TextField
        id={this.props.id}
        className={this.props.className}
        label={this.props.label}
        autoFocus={this.props.autoFocus}
        variant="outlined"
        margin="dense"
        color="primary"
        //onChange calls an action, which sets the value and whether there are errors.
        //Once the state change is applied here, text input will get the error status
        //from the state
        onChange={(event) => {
          const value = _.upperCase(event.target.value);
          this.props.onChangeFunction(
            value,
            this.isInputInvalid(value, this.props.possibleStops)
          );
        }}
        error={this.props.inputStopData.hasError}
      />
    );
  }

  isInputInvalid(input, possibleStops) {
    return (
      !isUndefinedOrNullOrEmptyString(input) &&
      !possibleStops.has(input)
    );
  }
}

export default RouteInput;
