import { FunctionComponent } from "react";
import { withStyles } from "@material-ui/core/styles";

import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { KuutiolaAppBarProps } from "./types";
import KuutiolaAppBarSubtitle from "./KuutiolaAppBarSubtitle";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { LANGUAGE_CHANGE } from "../../../actions/language/actions";

const styles = {
  centeredTitle: {
    margin: "0 auto",
  },
};

const KuutiolaAppBar: FunctionComponent<KuutiolaAppBarProps> = ({
  classes,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <AppBar color="primary">
      <Toolbar>
        <Typography
          variant="h5"
          align="center"
          className={classes.centeredTitle}
          onClick={() => dispatch({type: LANGUAGE_CHANGE, payload: {language: "en"}})}
        >
          {t('APP_TITLE')}
        </Typography>
        <KuutiolaAppBarSubtitle />
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(KuutiolaAppBar);
