import React from "react";
import { Box, Typography } from "@material-ui/core";
import { PublicRounded } from "@material-ui/icons";
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
    return `Last updated: ${day}/${month}/${year} at ${hours}:${minutes} ${amOrpm}`;
  }
  const Tile = (props) => {
    return (
      <Box bgcolor={props.bgcolor} className={classes.tile}>
        <Typography className={classes.typo} variant="h4" paragraph>
          {props.val}
        </Typography>
        <Typography className={classes.typo} variant="h4">
          <CountUp end={worldData[props.val.toLowerCase()]} />
        </Typography>
      </Box>
    );
  };
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
        <Tile bgcolor="primary.main" val="Cases" />
        <Tile bgcolor="secondary.main" val="Deaths" />
        <Tile bgcolor="#ff8f00" val="Critical" />
        <Tile bgcolor="#00c853" val="Recovered" />
      </Box>
    </Box>
  );
}
