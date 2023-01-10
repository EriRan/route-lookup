import { TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Stop } from "../../../../../../data/mapper/types";
import { useAppDispatch } from "../../../../../../reducers/hooks";
import { RouteInputProps, RouteInputEvent } from "../../types";

/**
 * Renders a component where a name of a bus stop can be written to. Has a onChange function as parameter to react to typing. Is not aware whether it is a input for start or destination, which is why we must pass a stopState to it, which can
 * contain errors of a start or destination stop
 * @param props
 * @returns
 */
const RouteInput = (props: RouteInputProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  return (
    <TextField
      className="center-input"
      label={t(props.label)}
      value={props.inputStopData.name ? props.inputStopData.name : ""}
      variant="outlined"
      margin="dense"
      color="primary"
      //onChange calls an action, which sets the value and whether there are errors.
      //Once the state change is applied here, text input will get the error status
      //from the state
      onChange={handleChange.bind(this)}
      error={hasError()}
    />
  );

  /**
   * Called when we type into a bus stop name text field
   * @param event
   * @returns
   */
  function handleChange(event: RouteInputEvent) {
    //Some input validation at first
    if (!event.target) {
      console.error("Missing target from event");
      dispatch({
        type: props.onChangeFunction.type,
        payload: {
          name: "",
          hasErrors: isInputInvalid("", props.stopMap),
        },
      });
      return;
    } else if (!event.target.value) {
      dispatch({
        type: props.onChangeFunction.type,
        payload: {
          name: event.target.value,
          hasErrors: isInputInvalid("", props.stopMap),
        },
      });
      return;
    }
    //Material UI https://material-ui.com/es/guides/typescript/#handling-value-and-event-handlers
    else if (typeof event.target.value !== "string") {
      console.error("Non string input received");
      return;
    }
    const value = event.target.value;
    dispatch({
      type: props.onChangeFunction.type,
      payload: {
        name: value,
        hasErrors: isInputInvalid(value, props.stopMap),
      },
    });
  }

  function hasError(): boolean {
    if (!props.inputStopData || !props.inputStopData.hasErrors) {
      return false;
    }
    return props.inputStopData.hasErrors!;
  }

  function isInputInvalid(input: string, stopMap: Map<string, Stop>) {
    return !!input && !stopMap.has(input);
  }
};

export default RouteInput;