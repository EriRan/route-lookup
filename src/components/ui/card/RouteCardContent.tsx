import { FunctionComponent } from "react";

import { Divider, Accordion, Grid, AccordionDetails } from "@material-ui/core";

import RouteForm from "./route/RouteForm";
import RouteResult from "./route/RouteResult";
import RouteCardHeader from "./header/RouteCardHeader";
import { UiContainerProps } from "../types";

const RouteCardContent: FunctionComponent<UiContainerProps> = ({
  transportData,
}) => {
  return (
    <Accordion>
      <RouteCardHeader />
      <Divider />
      <AccordionDetails>
        <Grid container direction="column">
          <RouteForm stopMap={transportData.stopMap} />
          <Divider />
          <RouteResult />
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default RouteCardContent;
