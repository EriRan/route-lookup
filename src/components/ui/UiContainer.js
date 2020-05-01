import React from "react";

import Sidebar from "./sidebar/Sidebar";
import KuutiolaAppBar from "./appbar/KuutiolaAppBar";

const UiContainer = ({transportData}) => (
  <div>
    <KuutiolaAppBar />
    <Sidebar transportData={transportData}/>
  </div>
);

export default (UiContainer);