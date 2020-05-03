import React from "react";
import {connect} from "react-redux";

import {
  CardContent,
  Collapse,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import RouteForm from "./route/RouteForm";
import RouteResult from "./route/RouteResult";
import RouteCardHeader from "./header/RouteCardHeader"

class RouteCardContent extends React.Component {
  render() {
    return (
      <CardContent>
        <RouteCardHeader />
        <Divider />
        <RouteForm possibleStops={this.props.transportData.stops} />
        <RouteResult transportData={this.props.transportData} />
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography color="primary">Tietoa sivusta</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Tehty Solidabiksen koodihaastetta varten. <br />
              Koodaus ja ulkoasu: Erik Rantanen
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </CardContent>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSidebarOpen: state.sidebar.isOpen,
  };
};

export default connect(mapStateToProps, {})(RouteCardContent);
