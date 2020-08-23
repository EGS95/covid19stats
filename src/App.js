import React, { Component } from "react";
import {
  Box,
  Typography,
  CssBaseline,
  CircularProgress,
} from "@material-ui/core";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
  withStyles,
} from "@material-ui/core/styles";
import { lightBlue } from "@material-ui/core/colors";
import myStyle from "./style";
import logo from "./logo.svg";
import WorldStats from "./components/WorldStats/WorldStats";
import CountryStats from "./components/CountryStats/CountryStats";
import TableData from "./components/TableData/TableData";

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
      tableData: null,
      country: null,
    };
  }

  componentDidMount() {
    fetch("https://covid19globalstats.now.sh/api/data")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let countries = data.countryData.slice(); // ? fixes sorting bug
        countries = countries.sort((a, b) => {
          if (a.country < b.country) return -1;
          else return 1;
        });

        let tableData = data.countryData.slice(); // ? fixes sorting bug
        tableData = tableData.sort((a, b) => {
          return b.cases - a.cases;
        });

        let country = countries.filter(
          (country) => country.countryInfo.iso2 === data.countryCode
        )[0];

        this.setState({
          worldData: data.worldData,
          countries,
          tableData,
          country,
          plotData: data.historicalData,
        });
      });
  }

  render() {
    const { classes } = this.props;
    const { countries, worldData, tableData, country, plotData } = this.state;
    if (countries && worldData && tableData && country && plotData) {
      console.log('Done one')
      return (
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <Box className={classes.container}>
            <Typography className={classes.title} variant="h2" color="primary">
              Covid<span className={classes.number}>19</span>
              <span className={classes.stats}>stats</span>
            </Typography>
            <img className={classes.logo} src={logo} alt="" />
            <WorldStats worldData={worldData} />
            {/* <CountryStats
              countries={countries}
              country={country}
              plotData={plotData}
            /> */}
            <TableData tableData={tableData} />
          </Box>
        </ThemeProvider>
      );
    } else
      return (
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <Box className={classes.container}>
            <CircularProgress size={75} />
          </Box>
        </ThemeProvider>
      );
  }
}

export default withStyles(myStyle)(App);
