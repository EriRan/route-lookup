import React, { FunctionComponent } from "react";

import { Typography } from "@material-ui/core";

/**
 * Secondary title that is displayed if using a development build
 */
const KuutiolaAppBarSubtitle: FunctionComponent<{}> = () => (
  <Typography variant="h6" align="center" color="secondary">
    {process.env.NODE_ENV === "development" ? "Local development version" : ""}
  </Typography>
);

export default KuutiolaAppBarSubtitle;
