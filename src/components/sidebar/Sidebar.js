import React from "react";
import { connect } from "react-redux";

import {
  Button,
  Drawer,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import SidebarHeader from "./header/SidebarHeader";
import RouteInput from "./route/RouteInput";
import RouteResult from "./route/RouteResult";

class Sidebar extends React.Component {
  render() {
    return (
      <Drawer
        anchor={"left"}
        open={this.props.isSidebarOpen}
        variant="persistent"
      >
        <SidebarHeader />
        <Divider />
        <RouteInput />
        <RouteResult />
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Linjatiedot</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Keltainen <Button>Näytä</Button> <br />
              Punainen <Button>Näytä</Button> <br />
              Vihreä <Button>Näytä</Button> <br />
              Sininen <Button>Näytä</Button> <br />
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Tietoa sivusta</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Tehty Solidabiksen koodihaastetta varten <br />
              Koodaus ja ulkoasu: Erik Rantanen
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSidebarOpen: state.sidebar.isOpen,
  };
};

export default connect(mapStateToProps, {})(Sidebar);
