import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import RouteCardContent from "./RouteCardContent";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    position: "fixed",
    zIndex: 1,
    top: "10%",
  },
}));

export default function RouteCard({ transportData }) {
  const classes = useStyles();
  return (
    <Card className={classes.root} raised={true}>
      <RouteCardContent transportData={transportData} />
    </Card>
  );
}
