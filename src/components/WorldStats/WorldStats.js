import React from "react";
import { Box, Typography } from "@material-ui/core";
import { PublicRounded } from "@material-ui/icons";
import { green,amber } from "@material-ui/core/colors";
import CountUp from "react-countup";
import myStyle from "./Style";

export default function WorldStats(props) {
  const classes = myStyle();
  const { worldData } = props;
  return (
    <Box
      mt={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
    >
      <Box display="flex" alignItems="center">
        <PublicRounded
          fontSize="large"
          className={classes.worldIcon}
          color="primary"
        />
        <Typography variant="h4">World stats</Typography>
      </Box>

      <Box
        mt={3}
        display="flex"
        width="100%"
        alignItems="center"
        justifyContent="space-around"
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bgcolor="primary.main"
          width={{ xs: "100%"}}
          height={{xs:'150px',sm:'200px'}}
        >
          <Typography className={classes.typo} variant="h3" paragraph>
            Confirmed
          </Typography>
          <Typography className={classes.typo} variant="h3">
            <CountUp end={worldData.confirmed} />
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          bgcolor="secondary.main"
          width={{ xs: "100%"}}
          height={{xs:'150px',sm:'200px'}}
        >
          <Typography className={classes.typo} variant="h3" paragraph>
            Deaths
          </Typography>
          <Typography className={classes.typo} variant="h3">
            <CountUp end={worldData.deaths} />
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          bgcolor={amber['A700']}
          width={{ xs: "100%"}}
          height={{xs:'150px',sm:'200px'}}
        >
          <Typography className={classes.typo} variant="h3" paragraph>
            Critical
          </Typography>
          <Typography className={classes.typo} variant="h3">
            <CountUp end={worldData.critical} />
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          bgcolor={green["A700"]}
          width={{ xs: "100%"}}
          height={{xs:'150px',sm:'200px'}}
        >
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
