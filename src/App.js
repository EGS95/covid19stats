import React, { Component } from "react";
import { Box, Typography, CssBaseline } from "@material-ui/core";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
  withStyles,
} from "@material-ui/core/styles";
import { lightBlue } from "@material-ui/core/colors";
import myStyle from "./style";
import "./App.css";
import logo from "./logo.svg";
import WorldStats from "./components/WorldStats/WorldStats";
import CountryStats from "./components/CountryStats/CountryStats";
import TableData from './components/TableData/TableData'

const appTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: lightBlue[600],
      },
      type: "dark",
    },
  })
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      worldData: null,
      countries: null,
    };
  }

  componentDidMount() {
    fetch("https://corona.lmao.ninja/all")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          worldData: {
            confirmed: data.cases,
            deaths: data.deaths,
            recovered: data.recovered,
            critical:data.critical,
            active:data.active,
            todayDeaths:data.todayDeaths,
            todayCases:data.todayCases
          },
        });
      });

    fetch("https://corona.lmao.ninja/countries")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          countries: data,
        });
      });
  }

  render() {
    const { classes } = this.props;
    const { countries, worldData } = this.state;
    if (countries && worldData) {
      return (
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            minHeight="100vh"
            alignItems="center"
            justifyContent="center"
            p={3}
            style={{ overflowX: "hidden" }}
          >
            <Typography className={classes.title} variant="h2" color="primary">
              Covid<span className={classes.number}>19</span>{" "}
              <span className={classes.stats}>stats</span>
            </Typography>
            <img className={classes.logo} src={logo} alt="" />
            <WorldStats worldData={worldData} />
            <CountryStats countries={countries}/>
            <TableData tableData={countries}/>
          </Box>
        </ThemeProvider>
      );
    } else return null;
  }
}

export default withStyles(myStyle)(App);
