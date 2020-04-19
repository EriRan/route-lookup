import React from "react";

import {
  Button,
  Drawer,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import SidebarHeader from "./header/SidebarHeader";
import RouteInput from "./route/RouteInput";
import RouteResult from "./route/RouteResult";

class Sidebar extends React.Component {
  render() {
    return (
      <Drawer anchor={"left"} open={true} variant="persistent">
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
              <p>Keltainen <Button>Näytä</Button></p>
              <p>Punainen <Button>Näytä</Button></p>
              <p>Vihreä <Button>Näytä</Button></p>
              <p>Sininen <Button>Näytä</Button></p>
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
              <p>Tehty Solidabiksen koodihaastetta varten</p>
              <p>Koodaus ja ulkoasu: Erik Rantanen</p>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Drawer>
    );
  }
}

export default Sidebar;
