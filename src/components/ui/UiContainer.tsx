import React, { FunctionComponent } from "react";

import RouteCard from "./card/RouteCard";
import KuutiolaAppBar from "./appbar/KuutiolaAppBar";
import { UiContainerProps } from "./types";

const UiContainer: FunctionComponent<UiContainerProps> = (transportData) => (
  <div>
    <KuutiolaAppBar />
    <RouteCard transportData={transportData} />
  </div>
);

export default UiContainer;
