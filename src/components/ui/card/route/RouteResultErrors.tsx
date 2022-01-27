import _ from "lodash";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useTranslation } from "react-i18next";

const RouteResultErrors = (props: Props) => {
  const { t } = useTranslation();

  if (_.isEmpty(props.errorMessages)) {
    return <div />;
  }
  return <List dense={true}>{createItems()}</List>;

  function createItems(): JSX.Element[] {
    let errorIndex = 1;
    return props.errorMessages.map((errorMessage) => {
      const message = t(errorMessage);
      console.log(message);
      return (
        <ListItem key={`input-error-${errorIndex++}`}>
          <ListItemText primary={message} />
        </ListItem>
      );
    });
  }
};

type Props = {
  errorMessages: Array<string>;
};

export default RouteResultErrors;
