import React from "react";
import _ from "lodash";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

class RouteResultErrors extends React.Component<Props, {}> {
  render() {
    if (_.isEmpty(this.props.errorMessages)) {
      return <div />;
    }
    return <List dense={true}>{this.createItems()}</List>;
  }

  private createItems(): JSX.Element[] {
    return this.props.errorMessages.map((errorMessage) => {
      return (
        <ListItem>
          <ListItemText primary={errorMessage} />
        </ListItem>
      );
    });
  }
}

type Props = {
  errorMessages: Array<string>;
};

export default RouteResultErrors;
