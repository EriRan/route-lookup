import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Drawer } from "@material-ui/core";
import "./Sidebar.css";

class Sidebar extends React.Component {
  render() {
    return (
      <Drawer anchor={"left"} open={true} variant="persistent">
        <List disablePadding dense>
          <ListItem button>
            <ListItemText>Home</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>Billing</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>Settings</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

export default Sidebar;
