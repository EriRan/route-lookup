import React from "react";
import { connect, ConnectedProps } from "react-redux";

import { Divider, Typography } from "@material-ui/core";

import { compressResponse } from "./routeResponseCompressor";
import { isUndefinedOrNull } from "../../../../util/Utilities";
import { RootState } from "../../../../reducers/types";
import { CalculationResponse } from "../../../../reducers/route/change/calculation/types";
import _ from "lodash";

class RouteResult extends React.Component<Props, {}> {
  render() {
    if (!isUndefinedOrNull(this.props.calculatedRoute)) {
      return this.renderRoute(this.props.calculatedRoute!);
    }
    return <div />;
  }

  renderRoute(calculatedRoute: CalculationResponse) {
    if (!_.isEmpty(calculatedRoute.errorMessages)) {
      return (
        <Typography key={`result-stop-no-route`}>
          {calculatedRoute.errorMessages}
        </Typography>
      );
    }
    if (isUndefinedOrNull(calculatedRoute.route)) {
      return <div />;
    }

    const compressedRouteData = compressResponse(
      Array.from(calculatedRoute.route!.values())
    ).map((stopRoute) => {
      return (
        <Typography key={`result-stop-${stopRoute.from}-${stopRoute.to}`}>
          {stopRoute.from} → {stopRoute.to} linjalla {stopRoute.line}
        </Typography>
      );
    });
    return (
      <div>
        {compressedRouteData}
        <Divider />
        <Typography>Kesto yhteensä: {calculatedRoute.totalDuration}</Typography>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    calculatedRoute: state.route.calculatedRoute,
  };
};

const connector = connect(mapStateToProps, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

export default connector(RouteResult);
