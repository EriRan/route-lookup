import { connect, ConnectedProps } from "react-redux";

import { Divider, Typography } from "@material-ui/core";

import { compressResponse } from "./routeResponseCompressor";
import RouteResultErrors from "./RouteResultErrors";
import { useTranslation } from "react-i18next";
import { CompressedRoute } from "./types";
import { RootState } from "../../../../reducers";
import { CalculationResponse } from "../../../../reducers/route/calculation/types";

/**
 * Renders finished route calculation between two stops. If there are any errors in the calculations we render them instead
 * @param props
 * @returns
 */
const RouteResult = (props: Props) => {
  const { t } = useTranslation();
  if (props.calculatedRoute) {
    return renderRoute(props.calculatedRoute!);
  }
  return <div />;

  function renderRoute(calculatedRoute: CalculationResponse) {
    if (calculatedRoute.errorMessages.length) {
      return (
        <RouteResultErrors errorMessages={calculatedRoute.errorMessages} />
      );
    }
    if (!calculatedRoute.route.length) {
      return <div />;
    }

    const compressedRouteData = compressResponse(calculatedRoute.route).map(
      (compressedStop) => {
        return (
          <Typography key={`result-stop-${compressedStop.from}-${compressedStop.to}`}>
            {renderRouteDescription(compressedStop)}
          </Typography>
        );
      }
    );
    return (
      <div>
        {compressedRouteData}
        <Divider />
        <Typography>
          {renderTotalDuration(calculatedRoute.totalDuration)}
        </Typography>
      </div>
    );
  }

  function renderRouteDescription(stopRoute: CompressedRoute) {
    return (
      stopRoute.from +
      "→" +
      stopRoute.to +
      " " +
      t("ROUTE_RESULT_WITH_LINE") +
      " " +
      getLineName(stopRoute)
    );
  }

  function renderTotalDuration(totalDuration: number | null) {
    return t("ROUTE_RESULT_TOTAL_DURATION") + ":" + totalDuration;
  }

  /**
   * Return the provided line unless the line name 
   * @param line 
   * @returns 
   */
  function getLineName(stopRoute: CompressedRoute) {
    if (stopRoute.error) {
      return t(stopRoute.error);
    }
    return stopRoute.line;
  }
};

const mapStateToProps = (state: RootState) => {
  return {
    calculatedRoute: state.route.calculatedRoute,
  };
};

const connector = connect(mapStateToProps, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

export default connector(RouteResult);
