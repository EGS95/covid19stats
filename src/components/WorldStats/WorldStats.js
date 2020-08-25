import React from "react";
import { Box, Typography } from "@material-ui/core";
import { PublicRounded } from "@material-ui/icons";
import { green, amber } from "@material-ui/core/colors";
import CountUp from "react-countup";
import myStyle from "./Style";

export default function WorldStats(props) {
  const classes = myStyle();
  const { worldData } = props;
  function getLastUpdate(timestamp) {
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours() % 12 || 12;
    let minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    let amOrpm = date.getHours() > 11 ? "PM" : "AM";
    let lastUpdate = `${day}/${month}/${year} at ${hours}:${minutes} ${amOrpm}`;
    return `Last updated: ${lastUpdate}`;
  }
  return (
    <Box className={classes.container}>
      <Typography variant="caption">
        {getLastUpdate(worldData.updated)}
      </Typography>
      <Box display="flex" alignItems="center">
        <PublicRounded className={classes.worldIcon} />
        <Typography variant="h4">World stats</Typography>
      </Box>

      <Box className={classes.tileWrapper}>
        <Box bgcolor="primary.main" className={classes.tile}>
          <Typography className={classes.typo} variant="h4" paragraph>
            Confirmed
          </Typography>
          <Typography className={classes.typo} variant="h4">
            <CountUp end={worldData.cases} />
          </Typography>
        </Box>
        <Box bgcolor="secondary.main" className={classes.tile}>
          <Typography className={classes.typo} variant="h4" paragraph>
            Deaths
          </Typography>
          <Typography className={classes.typo} variant="h4">
            <CountUp end={worldData.deaths} />
          </Typography>
        </Box>
        <Box bgcolor={amber["A700"]} className={classes.tile}>
          <Typography className={classes.typo} variant="h4" paragraph>
            Critical
          </Typography>
          <Typography className={classes.typo} variant="h4">
            <CountUp end={worldData.critical} />
          </Typography>
        </Box>
        <Box bgcolor={green["A700"]} className={classes.tile}>
          <Typography className={classes.typo} variant="h4" paragraph>
            Recovered
          </Typography>
          <Typography className={classes.typo} variant="h4">
            <CountUp end={worldData.recovered} />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
