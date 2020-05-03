import React from "react";

import RouteCard from "./card/RouteCard";
import KuutiolaAppBar from "./appbar/KuutiolaAppBar";

const UiContainer = ({transportData}) => (
  <div>
    <KuutiolaAppBar />
    <RouteCard transportData={transportData}/>
  </div>
);

export default (UiContainer);