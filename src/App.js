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
import countryNames from "./countries";
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
    };
  }

  componentDidMount() {
    fetch("https://corona.lmao.ninja/v2/all")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          worldData: {
            confirmed: data.cases,
            deaths: data.deaths,
            recovered: data.recovered,
            critical: data.critical,
            active: data.active,
            todayDeaths: data.todayDeaths,
            todayCases: data.todayCases,
          },
        });
      });

    fetch("https://corona.lmao.ninja/v2/countries")
      .then((res) => res.json())
      .then((data) => {
        let countries = data.slice(); // ? fixes sorting bug
        countries = countries.sort((a, b) => {
          if (a.country < b.country) return -1;
          else return 1;
        });

        let tableData = data.slice(); // ? fixes sorting bug
        tableData = tableData.sort((a, b) => {
          return b.cases - a.cases;
        });

        this.setState({
          countries,
          tableData,
        });
      });

    fetch(`https://ipinfo.io/?token=${process.env.REACT_APP_API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        let defaultCountry = countryNames[data.country];
        fetch(`https://corona.lmao.ninja/v2/countries/${data.country}`)
          .then((res) => res.json())
          .then((data) => {
            this.setState({
              country: {
                name: defaultCountry === "USA" ? "US" : defaultCountry,
                confirmed: data.cases,
                deaths: data.deaths,
                recovered: data.recovered,
              },
            });
          });
      });
  }

  render() {
    const { classes } = this.props;
    const { countries, worldData, tableData, country } = this.state;
    if (countries && worldData && tableData && country) {
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
            <CountryStats countries={countries} country={country} />
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
