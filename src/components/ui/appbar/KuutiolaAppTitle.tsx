import { Typography, withStyles } from "@material-ui/core";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { LANGUAGE_CHANGE } from "../../../actions/language/actions";
import { KuutiolaAppBarProps } from "./types";

const styles = {
  centeredTitle: {
    margin: "0 auto",
  },
};

const KuutiolaAppTitle: FunctionComponent<KuutiolaAppBarProps> = ({
  classes,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
        <Typography
          variant="h5"
          align="center"
          className={classes.centeredTitle}
          onClick={() => dispatch({type: LANGUAGE_CHANGE, payload: {language: "en"}})}
        >
          {t('APP_TITLE')}
        </Typography>
  );
};

export default withStyles(styles)(KuutiolaAppTitle);