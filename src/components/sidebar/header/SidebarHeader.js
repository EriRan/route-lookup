import React from "react";
import { Typography, IconButton, List, ListItem, ListItemText } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

class SidebarHeader extends React.Component {
  render() {
    return (
      <List>
        <ListItem>
          <ListItemText>
            <Typography variant="h4" align="center">
              Kuutiola
              <br />
              reittiopas
            </Typography>
          </ListItemText>
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
        </ListItem>
          
      </List>
    );
  }
}

export default SidebarHeader;
