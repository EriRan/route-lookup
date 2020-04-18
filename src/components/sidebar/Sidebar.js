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
import TextField from "@material-ui/core/TextField";
import "./Sidebar.css";

class Sidebar extends React.Component {
  render() {
    return (
      <Drawer anchor={"left"} open={true} variant="persistent">
        <p>Kuutiola reittiopas</p>
        <Divider />
        <form>
          <TextField
            id="outlined-basic"
            label="Lähtöpaikka"
            variant="outlined"
          />

          <TextField id="outlined-basic" label="Määränpää" variant="outlined" />
        </form>
        <Divider />
        <p>Keltainen linja: A -> D</p>
        <p>Punainen linja: D -> Q</p>
        <p>Kesto: 12</p>
        <Divider />
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
