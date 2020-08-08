import React from "react";
import { Box, Typography } from "@material-ui/core";
import { PublicRounded } from "@material-ui/icons";
import { green, amber } from "@material-ui/core/colors";
import CountUp from "react-countup";
import myStyle from "./Style";

export default function WorldStats(props) {
  const classes = myStyle();
  const { worldData } = props;
  return (
    <Box className={classes.container}>
      <Box display="flex" alignItems="center">
        <PublicRounded className={classes.worldIcon} />
        <Typography variant="h4">World stats</Typography>
      </Box>

      <Box className={classes.tileWrapper}>
        <Box bgcolor="primary.main" className={classes.tile}>
          <Typography className={classes.typo} variant="h3" paragraph>
            Confirmed
          </Typography>
          <Typography className={classes.typo} variant="h3">
            <CountUp end={worldData.cases} />
          </Typography>
        </Box>
        <Box bgcolor="secondary.main" className={classes.tile}>
          <Typography className={classes.typo} variant="h3" paragraph>
            Deaths
          </Typography>
          <Typography className={classes.typo} variant="h3">
            <CountUp end={worldData.deaths} />
          </Typography>
        </Box>
        <Box bgcolor={amber["A700"]} className={classes.tile}>
          <Typography className={classes.typo} variant="h3" paragraph>
            Critical
          </Typography>
          <Typography className={classes.typo} variant="h3">
            <CountUp end={worldData.critical} />
          </Typography>
        </Box>
        <Box bgcolor={green["A700"]} className={classes.tile}>
          <Typography className={classes.typo} variant="h3" paragraph>
            Recovered
          </Typography>
          <Typography className={classes.typo} variant="h3">
            <CountUp end={worldData.recovered} />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
